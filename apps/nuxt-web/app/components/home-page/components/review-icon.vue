<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col items-center justify-center mx-4 lg:mx-15">
        <div class="px-4 w-full lg:max-w-[1280px] lg:mx-[48px] xl:mx-15 bg-white rounded-3 mt-20 ">
            <div class="px-4 lg:px-12 pt-20 pb-10 ">
                <div class="flex flex-col justify-center xl:flex-row gap-10 pb-10 border-b border-[#E5E7EB]">
                    <!--  -->
                    <div class=" py-7">
                        <div class="flex flex-col lg:flex-row items-center justify-center xl:justify-start gap-10">
                            <div class="w-[220px] flex flex-col items-center justify-center">
                                <div class="w-[120px] h-[120px]">
                                    <img src="~/assets/images/home-page/review-icon.png" alt="review-icon"
                                        class="w-full h-full">
                                </div>
                                <div class="mt-5">
                                    <h5 class="font-archivo font-weight-700 font-size-[18px]">SOC 2 Type II Compliant
                                    </h5>
                                    <p class="mt-1.5 font-weight-400 font-size-[14px] text-[#575D60]">Enterprise
                                        Security
                                        <br>Compliance
                                    </p>
                                </div>
                            </div>
                            <div class="w-[220px] flex flex-col items-center justify-center">
                                <div class="w-[120px] h-[120px]">
                                    <img src="~/assets/images/home-page/review-icon2.png" alt="review-icon"
                                        class="w-full h-full">
                                </div>
                                <div class="mt-5">
                                    <h5 class="font-archivo font-weight-700 font-size-[18px]">ISO/IEC 27001 Certified
                                    </h5>
                                    <p class="mt-1.5 font-weight-400 font-size-[14px] text-[#575D60]">Globally
                                        Recognized
                                        Security <br>
                                        Framework</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  -->
                    <div class="flex flex-col justify-center text-center xl:text-left">
                        <div class="text-h3 text-[20px] lg:text-[36px] text-center xl:text-left">
                            Trusted & Secure
                            Anti-Detection Browser
                        </div>
                        <div>
                            <ul class="mt-8 flex justify-center flex-wrap xl:flex-nowrap xl:justify-start lg:gap-8 gap-4">
                                <li class="flex flex-col items-center justify-between">
                                    <div class="lg:w-[94px] w-[70px] h-[70px] lg:h-[94px]">
                                        <img src="~/assets/images/home-page/review-icon.png" alt="review-icon"
                                            class="w-full h-full">
                                    </div>
                                    <div class="flex flex-col items-center justify-between mt-3">
                                        <p class="font-weight-400 font-size-[14px] text-[#34393D]">D-U-N-S</p>
                                        <p class="font-weight-400 font-size-[14px] text-[#34393D]">No. <span class="text-[#11A3FD]"> 659149012</span></p>
                                    </div>
                                </li>
                                <li v-for="item in 4" :key="item" class="flex flex-col items-center justify-between">
                                    <div class="lg:w-[94px] w-[70px] h-[70px] lg:h-[94px]">
                                        <img src="~/assets/images/home-page/review-icon2.png" alt="review-icon"
                                            class="w-full h-full">
                                    </div>
                                    <div class="flex flex-col items-center justify-between mt-3">
                                        <p class="font-weight-400 font-size-[14px] text-[#34393D]">GDPR
                                        </p>
                                        <p class="font-weight-400 font-size-[14px] text-[#34393D]"> Compliant</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pb-12 flex flex-col items-center justify-center xl:px-21.5">
                <h3 class="text-h3">Real-time Security Reputation</h3>
                <div class="flex flex-col xl:flex-row w-full items-center mt-6 gap-[32px] lg:gap-[60px]">
                        <div class="flex flex-col md:flex-row w-full items-center gap-5 flex-1">
                        <div
                            class="relative w-25 h-25 rounded-full border-10 border-[#1DC94D] flex flex-col justify-center items-center">
                            <p class="text-[#1DC94D] font-size-[24px] font-weight-600">100</p>
                            <p class="font-size-[13px] font-weight-400">/100</p>
                        </div>
                        <div class="flex flex-col items-center w-full xl:items-start gap-2 flex-1">
                            <div class="">
                                <img src="~/assets/images/home-page/Scamadviser_logo.png" alt="review-icon" />
                            </div>
                            <div class="flex w-full items-center gap-2 bg-[#F1F5F8] px-3 py-2">
                                <div>
                                    <img src="~/assets/images/home-page/check-circle.png" alt="review-icon"
                                        class="w-5 h-5">
                                </div>
                                Verified Safe by Multiple Security Engines
                            </div>
                            <div>
                                https://www.scamadviser.com/
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row w-full  items-center gap-5 flex-1">
                        <div
                            class="relative w-25 h-25 rounded-full border-10 border-[#1DC94D] flex flex-col justify-center items-center">
                            <p class="text-[#1DC94D] font-size-[24px] font-weight-600">100</p>
                            <p class="font-size-[13px] font-weight-400">/100</p>
                        </div>
                        <div class="flex flex-col items-center w-full xl:items-start gap-2 flex-1">
                            <div class="">
                                <img src="~/assets/images/home-page/Scamadviser_logo.png" alt="review-icon" />
                            </div>
                            <div class="flex w-full items-center gap-2 bg-[#F1F5F8] px-3 py-2">
                                <div>
                                    <img src="~/assets/images/home-page/check-circle.png" alt="review-icon"
                                        class="w-5 h-5">
                                </div>
                                Verified Safe by Multiple Security Engines
                            </div>
                            <div>
                                https://www.scamadviser.com/
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>