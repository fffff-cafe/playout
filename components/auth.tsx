"use client"

import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"
import { User } from "@supabase/supabase-js"
import { Button } from "./form"
import { Dialog } from "./common/dialog"

const Auth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User>()
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false)

  useEffect(() => {
    const check = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) {
        console.error(error)
      }
      setUser(user)
    }
    check()
  }, [])
  const handleSignIn = async () => {
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
      console.error(error.message)
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
          <Button onClick={() => setIsActiveModal(true)} disabled={isLoading}>
            Sign In
          </Button>
          <Dialog open={isActiveModal} onClose={() => setIsActiveModal(false)}>
            <section
              style={{
                alignItems: "center",
                display: "flex",
                flexFlow: "column",
                gap: "1rem",
                padding: "0 1rem",
              }}
            >
              <h2>ログイン・新規登録</h2>
              <div>
                <p>
                  会員の方は、登録時に利用した GitHub
                  アカウントをつかって以下ののボタンから
                  ログインすることができます。 会員登録されてない方は、 GitHub
                  ボタンからお持ちのアカウントで新規登録を行ってください。
                </p>
              </div>
              <Button
                onClick={handleSignIn}
                disabled={isLoading}
                style={{
                  width: "100%",
                }}
              >
                Githubでログインする
              </Button>
            </section>
          </Dialog>
        </>
      )}
    </div>
  )
}

export default Auth
