"use client"

import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"
import { User } from "@supabase/supabase-js"
import { Button } from "./form"

const Auth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const check = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) {
        alert(error)
      }
      setUser(user)
    }
    check()
  }, [])
  const handleSignUp = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      })
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {user ? (
        <>
          <Button onClick={handleSignOut} disabled={isLoading}>
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleSignUp} disabled={isLoading}>
            Sign Up
          </Button>
        </>
      )}
    </div>
  )
}

export default Auth
