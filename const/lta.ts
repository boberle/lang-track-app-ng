type AppConfig = {
    backendURL: string;
    projectId: string;
    authEmulatorURL?: string;
}


const _buildAppConfig = (): AppConfig => {
    const _backendURL: string | undefined = process.env.EXPO_PUBLIC_BACKEND_URL;
    const _authEmulatorURL: string | undefined = process.env.EXPO_PUBLIC_AUTH_EMULATOR_URL;
    const _projectId: string | undefined = process.env.EXPO_PUBLIC_PROJECT_ID;

    if (!_backendURL) {
        throw new Error("Missing EXPO_PUBLIC_BACKEND_URL environment variable");
    }

    if (!_projectId) {
        throw new Error("Missing EXPO_PUBLIC_PROJECT_NAME environment variable");
    }

    return {
        backendURL: _backendURL,
        authEmulatorURL : _authEmulatorURL,
        projectId: _projectId,
    }
}

const appConfig: AppConfig = _buildAppConfig();

export default appConfig;