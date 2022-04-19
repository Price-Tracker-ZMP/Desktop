let toast;
const toastDuration = 2000;
let timeout;

module.exports = {
    setToastObject: (t) => {
        toast = t;
    },

    ToastSuccess: (message) => {
        toastReset();

        toast.innerHTML = message;
        toast.classList.add("bg-success");
        
        Toast();
    },

    ToastFailure: (message) => {
        toastReset();
        
        toast.innerHTML = message;
        toast.classList.add("bg-danger");
        
        Toast();
    }
}

function Toast() {
    toastShow();
    timeout = setTimeout(toastHide, toastDuration);
}

function toastReset() {
    toast.classList.remove("toastHide");    
    toast.classList.remove("toastShow");
    toast.offsetWidth;

    toast.classList.remove("bg-success");
    toast.classList.remove("bg-danger");
    
    clearTimeout(timeout);
}

function toastShow() {
    toast.classList.add("toastShow");
}

function toastHide() {
    toast.classList.add("toastHide");
}
