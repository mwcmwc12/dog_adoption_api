const mockDogs = [
    {
        name: "Dog1_UserA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog2_UserA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog3_UserA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog4_UserA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog5_UserA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog6_UserA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog1_UserB",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog2_UserB",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog3_UserB",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog4_UserB",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog5_UserB",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    },
    {
        name: "Dog6_UserB",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    }, 
    {
        name: "Dog7_UserB",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum molestie ligula in semper. Aliquam sed dapibus augue. Nunc nec diam neque. Nam eros neque, tincidunt sit amet condimentum sed, imperdiet nec turpis. Donec risus turpis, mollis eu nisi eu, tempor dignissim risus. Nunc pharetra pulvinar ex, vel dictum libero iaculis non. Sed euismod lacus ante, sit amet sollicitudin est pharetra vel. Donec porttitor arcu maximus tortor laoreet, vitae sodales tortor vestibulum. Suspendisse non finibus tortor, nec vulputate nisi. Nam dignissim convallis imperdiet. Nam ac ante eget elit tincidunt dapibus a eu sapien. Maecenas scelerisque felis in purus consequat dictum."
    }, 
]

module.exports = mockDogs