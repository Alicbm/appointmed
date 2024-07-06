export const useUserCanModify = (
  userId: string | undefined, 
  userRole: string | undefined, 
  requestId: string | number,
  setCanEdit: (arg: boolean) => void,
  setCanDelete: (arg: boolean) => void,
) => {

  const userCanEditRequest = () => {
    if (userId == requestId || userRole == "admin") {
      setCanEdit(true);
    } else {
      alert(
        "Para poder editar esta consulta debes haberla creado o ser administrador, de lo contrario no puedes editar consultas de otros usuarios"
      );
    }
  };

  const userCanDeleteRequest = () => {
    if (userId == requestId || userRole == "admin") {
      setCanDelete(true)
    } else {
      alert(
        "Para poder eliminar esta consulta debes haberla creado o ser administrador, de lo contrario no puedes eliminar consultas de otros usuarios"
      );
    }
  }

  return { userCanEditRequest, userCanDeleteRequest }
}