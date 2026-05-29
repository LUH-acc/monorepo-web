<template>
    <div>
      <h1>我是父视图</h1>
      <NuxtLink to="/parent/child">Go to parent/child</NuxtLink>
      <NuxtPage :foobar="123" />
    </div>
  </template>
  