import Swal from 'sweetalert2';

export const confirmDelete = async (title: string = "Are you sure?") => {
  return await Swal.fire({
    title: title,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444', 
    confirmButtonText: 'Yes, delete it!',
    reverseButtons: true,
    cancelButtonText: 'Cancel',
    buttonsStyling: false, 
    customClass: {
      popup: 'rounded-xl shadow-lg',
      confirmButton: 'bg-red-500 text-white px-4 py-2 rounded-lg mx-2 hover:bg-red-600 transition',
      cancelButton: 'bg-transparent text-gray-600 border border-gray-400 px-4 py-2 rounded-lg mx-2 hover:bg-gray-100 transition'
    }
  });
};