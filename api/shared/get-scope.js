module.exports = { getScope }

function getScope(permissionsList, permission) {
  if (!permissionsList) return null
  for (var i = 0; i < permissionsList.length; i++) {
    if (permissionsList[i].resource_name == permission)
      return permissionsList[i].scope_name
  }
  return null
}
