import { SetOptions, createClient } from 'redis';
import config from '../config';

const redisClient = createClient({
  url: config.redis.url,
});

const redisPubClient = createClient({
  url: config.redis.url,
});

const redisSubClient = createClient({
  url: config.redis.url,
});

redisClient.on('err', (err) => console.log('redis error', err));
redisClient.on('connect', (err) => console.log('redis connected'));

const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisSubClient.connect();
  await redisPubClient.connect();
};

const set = async (
  key: string,
  value: string,
  option?: SetOptions
): Promise<void> => {
  await redisClient.set(key, value, option);
};

const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};
const del = async (key: string): Promise<void> => {
  await redisClient.del(key);
};

const disConnect = async (): Promise<void> => {
  await redisClient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};

const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token${userId}`;

  await redisClient.set(key, token, { EX: Number(config.redis.expires_in) });
};
const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token${userId}`;

  return await redisClient.get(key);
};

const delAccessToken = async (userId: string): Promise<void> => {
  await redisClient.del(`access-token${userId}`);
};
export const RedisClient = {
  pubClient: redisPubClient.publish.bind(redisPubClient),
  subClient: redisSubClient.subscribe.bind(redisSubClient),
  connect,
  disConnect,
  setAccessToken,
  getAccessToken,
  delAccessToken,
  set,
  get,
  del,
};
