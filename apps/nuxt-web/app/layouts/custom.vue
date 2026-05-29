<template>
    <div>
        <slot name="header">
            <div>cutom header</div>
        </slot>
        <slot />
        <slot name="footer">
            <div>cutom footer</div>
        </slot>
    </div>
</template>