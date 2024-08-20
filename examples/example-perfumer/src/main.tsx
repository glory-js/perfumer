import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"

// 1. 引入插件生成的路由配置
import { routeTree } from "./routeTree.gen"

// 2. 创建路由
const router = createRouter({ routeTree })

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)






