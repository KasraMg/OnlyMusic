const showSwal = (title, icon, confirmButtonText, callback) => {
    Swal.fire({
        title,
        icon,
        confirmButtonText,
    }).then((result) => callback(result));
};


export { showSwal }