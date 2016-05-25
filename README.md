# senso-catbox-example

Simple Catbox example to interact with redis

简单的Redis实施代码

大家应该都知道Redis的作用，在大多数系统中，80%的访问都集中在20%的数据上，所以将这些数据缓存起来，将会大幅提高用户反馈速度，并大大降低服务器端的负担。

已经清楚Redis作用的就跳过这一段吧。比方说服务器上有一个方法A，里面含有比较复杂的运算，每次调用都要花费大约10秒的时间，偏巧这个方法又是多数用户经常访问的，在这种情况下，如果我们在服务器端部署了Redis,那么当第一个用户访问完后10秒（TTL时间，可以自己设置长短，但建议不要设置太长，以防数据有更改），其他用户访问方法A的时候，可以瞬间获得结果。

----------

Pre-request: 
Redis需要被安装并且运行在默认端口：6397

----------
运行demo：

```js

> npm install

> npm start

```

----------
使用：

运行完npm start以后，访问localhost:8080，页面上会出现my example字样，这里的"my example" 假想成那个巨大的反馈结果，当你过2秒钟refresh页面的时候，会发现，页面内容变成了"from cache: my example"。这次的结果就是从redis cache里面读取出来的了。

tips：
当第一次访问8080端口后，可以快速地去redis-cli里面运行 keys * 查看写入的key和cache value.

```js

my-mac apple$ redis-cli
127.0.0.1:6379> keys *
1) "cue:api:get"
127.0.0.1:6379> get cue:api:get
"{\"item\":\"my example\",\"stored\":1464161002181,\"ttl\":30000}"

```
