"use client"

import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"
import { Button } from "./form"
import { Dialog } from "./common/dialog"
import Image from "next/image"
import { useAtom } from "jotai"
import { accountAtom } from "../store"

const Auth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [account, setAccount] = useAtom(accountAtom)
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false)
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false)

  useEffect(() => {
    const check = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) {
        console.error(error)
      }
      const {
        data: {
          session: { access_token },
        },
      } = await supabase.auth.getSession()
      setAccount(user)
    }
    check()
    const handleClickOutside = (event) => {
      if (event.target.closest("#userMenu") === null) {
        setIsActiveMenu(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setAccount(undefined)
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {account ? (
        <>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: ".5rem",
              position: "relative",
            }}
            onClick={() => setIsActiveMenu(true)}
            id="userMenu"
          >
            <Image
              src={account.user_metadata["avatar_url"]}
              alt={account.user_metadata["name"]}
              style={{
                borderRadius: "50%",
                height: "2rem",
                width: "2rem",
              }}
              height={32}
              width={32}
            />
            <p>{account.user_metadata["name"]}</p>
            {isActiveMenu && (
              <menu
                style={{
                  backgroundColor: "rgb(39 146 195 / 0.9)",
                  borderRadius: ".5rem",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                  minWidth: "10rem",
                  padding: "1rem",
                  position: "absolute",
                  right: "0",
                  top: "3.5rem",
                  width: "100%",
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  <li>
                    <a onClick={handleSignOut}>Sign out</a>
                  </li>
                </ul>
              </menu>
            )}
          </div>
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
                padding: "1rem",
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
              <a
                onClick={() => setIsActiveModal(false)}
                style={{
                  cursor: "pointer",
                  display: "block",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                キャンセル
              </a>
            </section>
          </Dialog>
        </>
      )}
    </div>
  )
}

export default Auth
