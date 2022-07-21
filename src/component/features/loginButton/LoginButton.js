import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function LoginButton() {

  const loggedIn = useSelector((state) => state.loggedIn.value)

  return (
    <div>
        <Button href={ loggedIn ? 'logout' : 'login' } className="bg-clair text-sombre border-0 px-4 py-2 me-3">{ loggedIn ? 'DECONNEXION' : 'CONNEXION' }</Button>
    </div>
  )
}

export default LoginButton