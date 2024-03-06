<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import useCurrentInstance from '@/hooks/userCurrentInstance';
import { loadSlim } from 'tsparticles-slim';
// @ts-ignore
import type { FormInstance, FormRules } from 'element-plus';
import { ElNotification } from 'element-plus';
import { User, Lock, Eleme } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import options from './particlesOptions';
import type { userInfo } from '@/apis/user/type';
import { getTime } from '@/utils/time';

const router = useRouter();
const useStore = useUserStore();

/** 表单数据字段 */
const FormData = reactive({
  /** 用户名 */
  userName: '',
  /** 密码 */
  password: '',
});

/** 表单控制实例 */
// @ts-ignore
const ruleFormRef = ref<FormInstance>();

/** 用户名校验 */
const validateUserName = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the username'));
  } else if (FormData.userName !== '') {
    callback();
  }
};

/** 密码校验 */
const validatePassWord = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'));
  } else if (FormData.password !== '') {
    callback();
  }
};

/** 表单规则校验 */
// @ts-ignore
const rules = reactive<FormRules<typeof FormData>>({
  name: [{ validator: validateUserName, trigger: 'blur' }],
  password: [{ validator: validatePassWord, trigger: 'blur' }],
});

/** 登录发起函数 */
// @ts-ignore
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: any) => {
    if (valid) {
      try {
        const userData: userInfo | any = await useStore.userLogin(FormData);
        router.push({
          name: 'Layout',
          params: { ...userData },
        });
        ElNotification({
          message: `${userData.userName} 登录成功`,
          title: `Hi, ${getTime()}好!`,
          duration: 3 * 1000,
          type: 'success',
        });
      } catch (error) {
        ElNotification({
          message: error,
          duration: 3 * 1000,
          type: 'error',
        });
      }
    } else {
      return false;
    }
  });
};

/** 登录表单的重置 */
// @ts-ignore
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 处理登录注册的动画切换
onMounted(() => {
  const { pageInstanceAllRefs } = useCurrentInstance();
  const { loginInBtn, registerBtn, container } = pageInstanceAllRefs;
  (loginInBtn as HTMLButtonElement).addEventListener('click', () => {
    (container as HTMLDivElement).classList.remove('right-panel-active');
  });
  (registerBtn as HTMLButtonElement).addEventListener('click', () => {
    (container as HTMLDivElement).classList.add('right-panel-active');
  });
});

/** 粒子图初始化启动函数 */
const particlesInit = async (engine: any) => {
  await loadSlim(engine);
};

/** 粒子图加载完成反馈的响应函数 */
const particlesLoaded = async (container: any) => {
  container.smooth = false;
};
</script>

<template>
  <div>
    <div
      class="container"
      ref="container"
    >
      <!-- 注册 -->
      <div class="container__form container--signup">
        <form
          action="#"
          class="form"
          ref="form1"
        >
          <h2 class="form__title">Register</h2>
          <input
            type="text"
            placeholder="User"
            class="input"
          />
          <input
            type="email"
            placeholder="Email"
            class="input"
          />
          <input
            type="password"
            placeholder="Password"
            class="input"
          />
          <input
            type="password"
            placeholder="Password"
            class="input"
          />
          <button :disabled="true" class="btn">Register</button>
        </form>
      </div>

      <!-- 登录 -->
      <div class="container__form container--signin">
        <el-form
          ref="ruleFormRef"
          :model="FormData"
          status-icon
          class="form"
          :rules="rules"
        >
          <h2 class="form__title">Login In</h2>
          <el-form-item prop="username">
            <el-input
              v-model="FormData.userName"
              placeholder="Please input username(default:root)"
              autocomplete="on"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="FormData.password"
              type="password"
              placeholder="Please input password(default:123456)"
              show-password
              autocomplete="on"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn-group">
              <el-button
                :loading-icon="Eleme"
                :loading="useStore.loginBtnLoading"
                type="primary"
                @click="submitForm(ruleFormRef)"
              >
                Submit
              </el-button>
              <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <!-- 覆盖层 -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button
              class="btn"
              ref="loginInBtn"
            >
              Log In
            </button>
          </div>
          <div class="overlay__panel overlay--right">
            <button
              class="btn"
              ref="registerBtn"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
    <vue-particles
      class="tsparticles"
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="options"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  position: absolute;
  z-index: 1;
  width: 100%;
  max-width: 890px;
  height: 420px;
  background-color: rgba(255, 255, 255, 0.13);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
  overflow: hidden;
}

.form__title {
  font-weight: 500;
  margin: 0;
  color: #fff;
  font-size: 20px;
  margin-bottom: 2.25rem;
}

.link {
  color: #333;
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background: url('../../assets/images/login_bgc.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  /* background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%); */
  background-color: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 20px;
  border: 2px solid #d5d5d5a1;
  color: #e9e9e9;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.8rem 3rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  background-color: #434343;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  height: 100%;
  text-align: center;
}

.form > .btn {
  margin-top: 1.5rem;
}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.btn-group {
  width: 100%;
  margin-bottom: -8rem;
}

:deep(.el-form-item) {
  width: 100%;
}

:deep(.el-input) {
  height: 42px;
}

:depp(.el-form-item) {
  margin-bottom: 26px;
}

:deep(.el-button) {
  text-transform: uppercase;
  padding: 20px;
  font-size: 16px;
  border-radius: 21px;
  transition: transform 80ms ease-in;
}

:deep(.el-button):active {
  transform: scale(0.95);
}
</style>
