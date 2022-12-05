<template>
    <div class="navbar">
        <div class="navbaritem_left"><slot name="left"></slot></div>
        <div class="navbaritem_center">
            <slot name="center">default</slot>
        </div>
        <div class="navbaritem_right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name: "Navbar",
};
</script>

<style>
.navbar {
    height: 2.6875rem;
    display: flex;
}

.navbaritem_left {
    width: 60px;
}
.navbaritem_right {
    width: 60px;
}
.navbaritem_center {
    flex: 1;
}
.navbar div {
    text-align: center;
    margin: auto;
}
</style>