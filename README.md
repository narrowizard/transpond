# transpond
用于接口测试的http转发服务

## 4partdev
用于分离前后端开发的转发服务  
+ 符合配置中authPath的路由段,请求会转发到remoteAddr:remotePort
+ 其他路由段,请求会转发到localAddr:localPort
