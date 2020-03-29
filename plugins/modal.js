Element.prototype.appendAfter = function(el) {
  el.parentNode.insertBefore(this, el.nextSibling);
};

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement("div");
  } else {
    const wrap = document.createElement("div");
    wrap.classList.add("modal-footer");
    buttons.forEach(btn => {
      const $btn = document.createElement("button");
      $btn.textContent = btn.text;
      $btn.classList.add("btn");
      $btn.classList.add(`btn-${btn.type || "secondary"}`);
      $btn.onclick = btn.handler || null;
      //   ----
      wrap.appendChild($btn);
    });

    return wrap;
  }
}
// _ <=указание что это сисмтемная функция кот-я не должна ыть вызвана отдельно (как прив-я )
function _createModal(options) {
  const DEFAULT_WIDTH = 600;
  const modal = document.createElement("div");
  modal.classList.add("vmodal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
  <div class="modal-overlay" data-close="true" >
    <div class="modal-window" style = "width:${options.width || DEFAULT_WIDTH}">
      <div class="modal-header">
        <span class="modal-title"> 
        ${options.title || "Window"}
        </span>
        ${
          options.closable
            ? ` <span class="btn btn-danger modal-close" data-close="true" >&times;</span>`
            : ""
        }
      </div>
      <div class="modal-body" data-content>
       ${options.content || ""}
      </div>
      <div class="modal-footer"> 
        
      </div>
      
    </div>
</div>`
  );
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector("[data-content]"));
  document.body.appendChild(modal);

  return modal;
}

//у обьекта есть функция modal
//через $ иногда обозначаем что это DOM node элемент
$.modal = function(options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  let modal = {
    open() {
      //   if (destroyed) {
      //     return console.log("Modal is destroyed");
      //   }
      !closing && $modal.classList.add("open");
    },
    close() {
      closing = !closing;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(() => {
        $modal.classList.remove("hide");
        closing = !closing;
        if (typeof options.onClose === "function") {
          options.onClose();
        }
      }, ANIMATION_SPEED);
    }
  };

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener("click", listener);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener("click", listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector("[data-content]").innerHTML = html;
      destroyed = true;
    }
  });
};
