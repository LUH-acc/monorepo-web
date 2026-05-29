<template>
    <div>
        <slot name="header">
            <div>cutom2 header</div>
        </slot>
        <slot />
        <slot name="footer">
            <div>cutom2 footer</div>
        </slot>
    </div>
</template>