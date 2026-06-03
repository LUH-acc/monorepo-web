<script setup lang="ts">
const systemList = [
    {
        value: 'windows',
        label: 'Windows',
    },
    {
        value: 'macos',
        label: 'macOS',
    },
    {
        value: 'linux',
        label: 'Linux',
    }]
const selectedSystem = ref('windows')
const kernelList = [
    {
        value: 'windows',
        label: 'Windows',
    },
]
const selectedKernel = ref('windows')
const browserList = [
    {
        value: 'windows',
        label: 'Windows',
    },
]
const selectedBrowser = ref('windows')
</script>

<template>
    <div class="py-15 px-4 lg:px-15 ">
        <div class="mx-auto text-center">
            <h1 class="text-h3 text-[24px] lg:text-[48px] text-[#111213]">Discover the ultimate browsing interaction
            </h1>
            <p class="mt-5 font-weight-400 text-[#111213]">Free yourself from the hassle of complex interactions.</p>
        </div>

        <div class="mt-10">
            <div class="web-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
                <div class="row-span-1 lg:row-span-2 col-span-1 rounded-4 p-8 xl:pb-20 discover-bg flex flex-col justify-between">
                    <div class="flex flex-col ">
                        <div class="font-weight-500 font-size-[16px] text-left">System & kernel</div>
                        <div class="mt-3">
                            <div class="flex flex-col gap-3">
                                <div
                                    class="h-[48px] font-archivo font-weight-700 text-left border-1 border-white bg-white rounded-[12px] px-5 py-3">
                                    Windows</div>
                                <div
                                    class="h-[48px] font-archivo font-weight-700 text-left border-1 border-white bg-white rounded-[12px] px-5 py-3">
                                    Roxychrome 136</div>
                                <div
                                    class="h-[48px] font-archivo font-weight-700 text-left border-1 border-white bg-white rounded-[12px] px-5 py-3">
                                    Select Proxy</div>
                            </div>
                            <div class="mt-5.5 text-center">
                                <button class="bg-[#11A3FD] w-[240px] text-white h-[50px] rounded-md">Create
                                    Profile</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3 text-left pt-10 md:pt-0">
                        <div class="hidden xl:block w-10 h-10">
                            <img src="~/assets/images/home-page/discover-template.png" alt="discover-1"
                                class="w-full h-full">
                        </div>
                        <h2 class="font-archivo font-size-[26px] font-700">Profile Template</h2>
                        <div class="w-full lg:w-[310px] font-400 text-left font-size-[18px] text-[#7D8387]">Create tailored browsing
                            profiles
                            instantly with pre-set templates for perfect consistency.</div>
                    </div>
                </div>

                <!-- Proxy panel -->
                <div class="row-span-1 col-span-1 lg:col-span-2">
                    <div class="flex flex-col-reverse lg:flex-row lg:justify-between justify-center items-center lg:items-start text-white bg1 rounded-4 p-4">
                        <div class="w-full lg:w-1/2 p-8">
                            <div class="w-10 h-10">
                                <img src="~/assets/images/home-page/Proxy-Panel.png" alt="discover-1"
                                    class="w-full h-full">
                            </div>
                            <h3 class="mt-2.5 font-archivo font-size-[26px] font-700">Proxy Panel</h3>
                            <p class="font-400 mt-2.5 font-size-[18px]">Manage proxies effortlessly to maintain anonymity and
                                overcome
                                restrictions.</p>
                            <div class="hidden xl:block w-[48px] h-[30px] mt-18">
                                <img src="~/assets/images/home-page/discover-1.png" alt="discover-1"
                                    class="w-full h-full">
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2  pb-5 xl:pb-0 pt-5 px-6 bg2 rounded-3">
                            <label>Proxy Type</label>
                            <div class="mt-2 flex gap-2">
                                <button class="w-[120px] bg-white text-black p-2.5 pl-3 rounded-md">IPv4</button>
                                <button class="w-[120px] bg-white text-black p-2.5 pl-3 rounded-md">IPv6</button>
                            </div>
                            <div class="mt-4">
                                <label>Proxy Info</label>
                                <div class="flex flex-col gap-3 mt-1">
                                    <div
                                        class="h-[48px] text-black font-archivo font-weight-700 text-left border-1 border-white bg-white rounded-[12px] px-5 py-3">
                                        Socks5
                                    </div>
                                    <div
                                        class="h-[48px] text-black font-archivo font-weight-700 text-left border-1 border-white bg-white rounded-[12px] px-5 py-3">
                                        Windows
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- Account hub -->
                <div class="row-span-1 col-span-1 lg:col-span-2">
                    <div class="flex h-full flex-col-reverse lg:flex-row lg:justify-between justify-center items-center lg:items-start bg-[#F8FAFB] rounded-4">
                        <div class="w-full lg:w-[350px] p-8">
                            <div class="hidden xl:block w-10 h-10">
                                <img src="~/assets/images/home-page/discover-template.png" alt="discover-1"
                                    class="w-full h-full">
                            </div>
                            <h3 class="mt-2.5 font-archivo font-size-[26px] font-700">Account Hub</h3>
                            <p class="font-400 font-size-[18px] mt-2.5 text-[#7D8387]">Control multiple accounts in isolated,
                                authentic environments with ease.</p>
                            <div class="hidden xl:block w-[48px] h-[30px] mt-18">
                                <img src="~/assets/images/home-page/discover-2.png" alt="discover-1"
                                    class="w-full h-full">
                            </div>
                        </div>
                        <div class="w-full lg:w-[389px] m-4 lg:m-12 pt-5 pb-5 xl:pb-0 px-6 rounded-3">
                            <div class="flex flex-col gap-3">
                                <div
                                    class="h-[48px] text-black font-archivo font-weight-700 text-left border-1 border-[#E5E7EB] bg-white rounded-[12px] px-5 py-3">
                                    https://www.facebook.com/</div>
                                <div>
                                    <input type="text" placeholder="Please enter account"
                                        class="h-[48px] w-full text-[#7D8387] font-archivo font-weight-700 text-left outline-none border-1 border-[#E5E7EB] bg-white rounded-[12px] px-5 py-3" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Please enter password"
                                        class="h-[48px] w-full text-[#7D8387] font-archivo font-weight-700 text-left outline-none border-1 border-[#E5E7EB] bg-white rounded-[12px] px-5 py-3" />
                                </div>
                                <div class="relative">
                                    <input type="text" placeholder="Please enter 2FA code"
                                        class="h-[48px] w-full text-[#7D8387] font-archivo font-weight-700 text-left outline-none border-1 border-[#E5E7EB] bg-white rounded-[12px] px-5 py-3" />
                                    <span
                                        class="w-[24px] h-[16px] absolute right-3 top-1/2 text-center -translate-y-1/2 font-size-[12px] font-weight-700 text-white bg-[#11A3FD] rounded-[2px]">2FA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Proxy panel -->
                <div class="row-span-1 col-span-1 lg:col-span-2">
                    <div class="flex flex-col-reverse lg:flex-row lg:justify-between justify-center items-center lg:items-start p-4 lg:p-0 text-white bg4 rounded-4">
                        <div class="w-full lg:w-[350px] p-8">
                            <div class="hidden xl:block w-10 h-10">
                                <img src="~/assets/images/home-page/Proxy-Panel.png" alt="discover-1"
                                    class="w-full h-full">
                            </div>
                            <h3 class="mt-2.5 font-archivo font-size-[26px] font-700">Proxy Panel</h3>
                            <p class="font-400 font-size-[18px] mt-2.5">Manage proxies effortlessly to maintain anonymity and
                                overcome
                                restrictions.</p>
                            <div class="hidden xl:block w-[48px] h-[30px] mt-18">
                                <img src="~/assets/images/home-page/discover-1.png" alt="discover-1"
                                    class="w-full h-full">
                            </div>
                        </div>
                        <div class="w-full lg:w-[389px] m-4 lg:m-12 pb-5 xl:pb-0 pt-5 px-6 bg2 rounded-3">
                            <img src="~/assets/images/home-page/Window-Sync.png" alt="discover-1" class="w-full h-full">
                        </div>
                    </div>
                </div>
                <!-- Account hub  -->
                <div class="row-span-1 col-span-1 lg:col-span-2">
                    <div class="flex h-full flex-col-reverse lg:flex-row justify-between lg:justify-center items-center lg:items-start p-4 lg:p-0 bg-[#F8FAFB] rounded-4">
                        <div class="w-full lg:w-[350px] p-8">
                            <div class="hidden xl:block w-10 h-10">
                                <img src="~/assets/images/home-page/discover-template.png" alt="discover-1"
                                    class="w-full h-full">
                            </div>
                            <h3 class="mt-2.5 font-archivo font-size-[26px] font-700">Account Hub</h3>
                            <p class="font-400 font-size-[18px] mt-2.5 text-[#7D8387]">Control multiple accounts in isolated,
                                authentic environments with ease.</p>
                            <div class="hidden xl:block w-[48px] h-[30px] mt-18">
                                <img src="~/assets/images/home-page/discover-2.png" alt="discover-1"
                                    class="w-full h-full">
                            </div>
                        </div>
                        <div class="w-[389px] m-12 pb-5 xl:pb-0 pt-5 px-6 rounded-3">
                            <div class="flex flex-col">
                                <div>
                                    <label for="account">Mail address：</label>
                                    <input id="account" type="text" placeholder="Please enter mail address"
                                        class="h-[48px] mt-2 w-full text-[#7D8387] font-archivo font-weight-700 text-left outline-none border-1 border-[#E5E7EB] bg-white rounded-[12px] px-5 py-3" />
                                </div>
                                <div class="mt-3">
                                    <label for="password">Invite to Project:</label>
                                    <input id="password" type="text" placeholder="Please enter password"
                                        class="h-[48px] mt-2 w-full text-[#7D8387] font-archivo font-weight-700 text-left outline-none border-1 border-[#E5E7EB] bg-white rounded-[12px] px-5 py-3" />
                                </div>
                                <div class="mx-auto mt-6">
                                    <button
                                        class="bg-[#11A3FD] w-[240px] text-white h-[50px] rounded-md">Invite</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Profile Template -->
                <div
                    class="row-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-3 lg:row-span-2 ">
                    <div class="rounded-4  discover-bg h-full">
                        <div class="flex flex-col p-6 pr-0 ">
                            <div class="font-weight-500 font-size-[16px] text-left">
                                <img src="~/assets/images/home-page/discover-code.png" alt="discover-1"
                                    class="w-full h-full">
                            </div>
                        </div>
                        <div class="flex flex-col gap-3 text-left p-8">
                            <div class="hidden xl:block w-10 h-10">
                                <img src="~/assets/images/home-page/discover-template.png" alt="discover-1"
                                    class="w-full h-full">
                            </div>
                            <h2 class="font-archivo font-size-[26px] font-700 text-[#111213]">Profile Template
                            </h2>
                            <div class="w-[310px] font-400 font-size-[18px] text-left text-[#7D8387]">Create tailored browsing
                                profiles
                                instantly with pre-set templates for perfect consistency.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.discover-bg {
    background: linear-gradient(180deg, #DCF0FF, #FFFFFF 50%);
}

.bg1 {
    background: linear-gradient(90deg, #357BF5, #52B8F8);
}

.bg2 {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), transparent 100%);
}

.bg3 {
    background: linear-gradient(180deg, rgba(220, 240, 255, 0.5) 0%, rgba(220, 240, 255, 0) 65%), #fff;
}

.bg4 {
    background: linear-gradient(90deg, #373749, #2C2C3F 100%);
}
</style>