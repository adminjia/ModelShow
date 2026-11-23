<template>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <h2>欢迎登录</h2>
                <p>请使用您的账号密码</p>
            </div>
            <a-form :model="formState" name="login" :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }"
                @finish="onFinish">
                <a-form-item name="username" :rules="[{ required: true, message: '请输入账号!' }]">
                    <a-input v-model:value="formState.username" size="large" placeholder="账号" allow-clear>
                        <template #prefix>
                            <UserOutlined class="input-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                    <a-input-password v-model:value="formState.password" size="large" placeholder="密码" allow-clear>
                        <template #prefix>
                            <LockOutlined class="input-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 24 }">
                    <a-button type="primary" html-type="submit" size="large" block :loading="loading">
                        登 录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const router = useRouter();

// 固定账号密码
const FIXED_USERNAME = "admin";
const FIXED_PASSWORD = "123456";

const formState = reactive({
    username: "",
    password: ""
});

const loading = ref(false);

// 提交登录
const onFinish = () => {
    loading.value = true;
    const { username, password } = formState;
    // 校验固定账号密码
    if (username === FIXED_USERNAME && password === FIXED_PASSWORD) {
        message.success("加载成功！");
        Cookies.set("login_username", username, { expires: 3650 });
        Cookies.set("login_password", password, { expires: 3650 });
        // 跳转到主页
        router.push({ name: "Main" });
    } else {
        message.error("账号或密码错误！");
    }
    loading.value = false;
};

onMounted(() => {
    const savedUsername = Cookies.get("login_username");
    const savedPassword = Cookies.get("login_password");
    if (savedUsername && savedPassword) {
        formState.username = savedUsername;
        formState.password = savedPassword;
    }
    // 自动登录
    // onFinish()
});
</script>

<style lang="less" scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 16px;
    box-sizing: border-box;
}

.login-card {
    width: 100%;
    max-width: 400px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    padding: 32px 24px 24px;
    box-sizing: border-box;
    transition: transform 0.3s ease;

    @media (max-width: 480px) {
        padding: 24px 16px 16px;
        border-radius: 16px;
    }
}

.login-header {
    text-align: center;
    margin-bottom: 28px;

    h2 {
        font-size: 24px;
        font-weight: 600;
        color: #1f1f1f;
        margin: 0 0 6px 0;
    }

    p {
        font-size: 14px;
        color: #8c8c8c;
        margin: 0;
    }
}

.input-icon {
    color: #bfbfbf;
    font-size: 16px;
}

:deep(.ant-input-affix-wrapper) {
    border-radius: 10px;
    padding: 10px 12px;
}

:deep(.ant-input) {
    font-size: 16px;
}

:deep(.ant-checkbox-wrapper) {
    font-size: 14px;
    color: #595959;
}

:deep(.ant-btn-primary) {
    border-radius: 10px;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #7b8ff0 0%, #8a5fb0 100%);
        box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
}

.login-footer {
    text-align: center;
    margin-top: 16px;

    p {
        font-size: 12px;
        color: #bfbfbf;
        margin: 0;
    }
}

@media (max-width: 480px) {
    :deep(.ant-form-item) {
        margin-bottom: 16px;
    }
}
</style>