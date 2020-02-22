// Create map and set initial view
var map = L.map('map', { zoomControl: false })
map.setView([50.6, -2.0], 10);

// Add layers
var mapLayer = L.tileLayer('https://api.mapbox.com/styles/v1/ianrenton/ck6weg73u0mvo1ipl5lygf05t/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWFucmVudG9uIiwiYSI6ImNpeGV3andtdzAwNDgyem52NXByNmg5eHIifQ.vP7MkKCkymCJHVbXJzmh5g');
var seamarkLayer = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png');
mapLayer.addTo(map);
seamarkLayer.addTo(map);

// Symbol class definition
var MILSTDIcon = L.Icon.extend({ options: { iconAnchor: [30, 30] } });

// Entity class definition
class Entity {
    constructor(lat, lon, name, symbol, description) {
        this.lat = lat;
        this.lon = lon;
        this.name = name;
        this.symbol = symbol;
        this.description = description;
    }
    position() {
        return [this.lat, this.lon];
    }
    label() {
        return L.divIcon({ className: 'iconLabel', html: this.name.split(' ').join('&nbsp;') });
    }
    icon() {
        return new MILSTDIcon({iconUrl: './symbols/'.concat(this.symbol, '.png') });
    }
}

// Entity list
var entities = [
    new Entity(50.71605, -1.87557, "Home", "SFGPI-----H-", "<h3>Home Loc: Bournemouth</h3><p>Although I have lived in several places around Dorset and Hampshire, I grew up here in Bournemouth, where I now live with my family.</p><img src='./photos/bournemouth.jpg' class='photo'/>"),
    new Entity(50.74845, -1.85871, "Bournemouth School for Boys", "EFFPDB------", "<h3>Secondary Education:<br/>Bournemouth School for Boys</h3><p>I studied at Bournemouth School for Boys from 1995-2002. I achieved A-levels in Maths, Further Maths, Physics and Electronics, alongside 11 GCSEs and a Cambridge Language Certificate in Japanese & Japanese Studies.</p>"),
    new Entity(52.1019579,-2.0666612, "Pershore College", "EFFPDA------", "<h3>BTEC in Management</h3><p>As part of my Year in Industry at QinetiQ, I achieved a BTEC in Management from Pershore College.</p>"),
    new Entity(50.9356, -1.3963, "Southampton University", "EFFPDA------", "<h3>Degree:<br/>BSc (Hons) in Physics</h3><p>I studied Physics at Southampton University from 2003 to 2006, including modules in quantum physics, relativity, optronics, electronics and semiconductor design.</p>"),

    new Entity(50.60154, -2.45008, "QinetiQ", "SFGPIUR---H-", "<h3>Worked at QinetiQ<br/>(2006-2009)</h3><p>During my time at QinetiQ I worked on a number of diverse projects, both military and commercial. You can see more details on many of them by clicking around the map. In addition to my full-time employment, I also did a Year in Industry placement at QinetiQ in 2002-2003, and worked there as a summer student in 2004 & 2005.</p>"),
    new Entity(50.70983, -2.43965, "[Current Employer]", "SFGPIUR---H-", "<h3>Current Employer:<br/>Details Redacted</h3><p>Employer details available on request.</p><p>I have worked at my current employer in the Dorset area since 2009. I have worked on a number of major and minor projects at the company, and currently am employed as a Principal Software Engineer.</p>"),
    new Entity(51.1661,10.4469, "Parent Company (Germany)", "SFGPIUR---H-", "<h3>Parent Company in Germany</h3><p>My employer's parent company is based in Germany. I have liaised with their autonomous vehicles and GUI design teams to improve mutual understanding and cooperation between the UK and German branches of the business.</p>"),
    new Entity(51.5099502,-0.121424, "IET", "SFGPI-----H-", "<h3>Member of the IET</h3><p>I have been a member of the Institution of Engineering and Technology since 2012, and am currently working towards Chartered Engineer status.</p>"),

    new Entity(26.2902,52.3166, "[Middle East Projects]", "SUSP--------", "<h3>Middle East Projects</h3><p>I have worked with Middle East navies on a number of projects, and have spent time in several Gulf states to conduct testing and achieve acceptance of those systems.</p><img src='./photos/mideast.jpg' class='photo'/>"),
    new Entity(29.6,145.0, "[Far East Projects]", "SUSP--------", "<h3>Far East Projects</h3><p>I have worked with customers in the Far East on mine countermeasures programmes.</p>"),
    new Entity(57.40034,-5.93245, "[Unmanned Warrior 2016]", "SFUPWMGX----", "<h3>Unmanned Warrior 2016</h3><p>As part of my employer's trials team, I attended the Navy's Unmanned Warrior 2016 trial and successfully demonstrated an unmanned minehunting system.</p><img src='./photos/skyebridge.jpg' class='photo'/>"),
    new Entity(53.0888813,8.8138321, "[UDT 2017]", "SFGPI-----H-", "<h3>UDT 2017</h3><p>I attended the UDT conference in Bremen, Germany in 2017 as a speaker, presenting a paper entitled 'Approaches to testing of COLREGs-Compliant Collision Avoidance for Unmanned Surface Vessels'.</p>"),
    new Entity(51.3624537,2.9851921, "[Belgium MCM Trials 2017]", "SFUPWMGX----", "<h3>Belgium MCM Trials 2017</h3><p>I was deputy trials officer and main mission planner / remote operator for our company during the Belgian Navy's maritime mine countermeasures trials in the North Sea in 2017. We successfully demonstrated an unmanned surface vessel with towed mine-hunting sonar and on-board remote mine disposal vehicles.</p><img src='./photos/belgium.jpg' class='photo'/>"),
    new Entity(44.6545544,-63.5634948, "[Cold Weather Trials 2020]", "SFSPCUM-----", "<h3>Cold Weather Trials 2020</h3><p>During 2020 I worked with the Royal Navy overseas on a human factors trial, investigating the effects of cold weather on the system and its operators.</p><img src='./photos/halifax.jpg' class='photo'/>"),

    new Entity(50.44, -2.3, "Unmanned Surface Vehicle", "SFSPCUM-----", "<h3>Mine Countermeasures and Multi-role USVs</h3><p>My main domain experience is in unmanned surface vessels, with 10 years working on them in various forms. I am currently the lead software engineer for the company's Autonomy and Command & Control systems, working with internal and external customers to deliver unmanned vehicle systems to meet their needs. I currently provide technical leadership for a small team.</p>"),
    new Entity(50.5837, -2.0483, "Command & Control", "SFGPUUSO--_____", "<h3>Command & Control Systems</h3><p>I lead my company's unmanned vehicle command & control software development, with a team that scales to match the effort needed by ongoing projects. I also have experience of Combat System architecture, and the design of control software for other applications.</p>"),
    new Entity(50.633, -1.8, "Exercise Mine", "SFUPWMGX----", "<h3>Exercise Mine & Range Systems</h3><p>Whilst working for QinetiQ, I developed user interface software used for UK exercise mines and range systems for export.</p>"),
    new Entity(50.419, -1.649, "Submarine", "SFUPSN------", "<h3>Submarine Communications</h3><p>I have designed and developed user interface and embedded software used for secure data communications between submarines.</p><img src='./photos/sub.jpg' class='photo'/>"),
    new Entity(50.471, -1.530, "Submarine", "SFUPSN------", "<h3>Submarine Communications</h3><p>I have designed and developed user interface and embedded software used for secure data communications between submarines.</p><img src='./photos/sub.jpg' class='photo'/>"),
    new Entity(50.4689, -2.1547, "MILCO 3", "SHUPWMG-----", "<h3>Mine Countermeasures</h3><p>I have domain expertise in a variety of MCM techniques, drawn from over a decade working on mine-hunting and mine-sweeping systems, both for unmanned vehicles and larger ships.</p><img src='./photos/mine.jpg' class='photo'/>"),
    new Entity(50.4278, -2.4582, "MILCO 2 [N]", "SHUPWMGD----", "<h3>Mine Countermeasures</h3><p>I have domain expertise in a variety of MCM techniques, drawn from over a decade working on mine-hunting and mine-sweeping systems, both for unmanned vehicles and larger ships.</p><img src='./photos/undex.jpg' class='photo'/>"),
    new Entity(50.3849, -2.7438, "MILCO 1 [N]", "SHUPWMGD----", "<h3>Mine Countermeasures</h3><p>I have domain expertise in a variety of MCM techniques, drawn from over a decade working on mine-hunting and mine-sweeping systems, both for unmanned vehicles and larger ships.</p><img src='./photos/undex.jpg' class='photo'/>"),

    new Entity(82, 7, "", "99rb", "<iframe width='250' src='https://www.youtube.com/embed/hIIVK0NgK38?&autoplay=1' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>")
];

// Add entities to map: icon with popup if set, plus label if set.
var e;
for (e of entities) {
    // Icon
    var icon = L.marker(e.position(), {icon: e.icon()});
    // Clicking on an icon: 1) hides any existing target lock buttons,
    // 2) creates a new button, 3) expands the right-hand details
    // pane with contents, if a description is set
    icon.on('click', (function (e) {
        return function () {
            $(".targetLock").remove();
            $("div#right").hide("slide", { direction: "right" }, 1000);
            L.marker(e.position(), {icon: L.divIcon({ className: 'targetLock', html: '<button class="targetLock">TARGET&nbsp;LOCKED</button>' })}).addTo(map);
            if (e.description) {
                $("div#rightText").html(e.description);
                $("div#right").show("slide", { direction: "right" }, 1000, (function() { $("div#rightText .photo").show("clip", 500) }));
            }
        };
    })(e));
    icon.addTo(map);

    // Label
    if (e.label()) {
        L.marker(e.position(), {icon: e.label()}).addTo(map);
    }
}

// Add polylines for specific things
var arrow = L.polyline([[50.44, -2.3], [50.47, -2.25]], {color: '#84E3FF'}).addTo(map);
var arrowHead = L.polylineDecorator(arrow, {
    patterns: [{offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true, color: '#84E3FF'}})}]
}).addTo(map);

// Add pan event to update lat/lon display at bottom of screen, and run once on startup
function setLatLon() {
    var c = map.getCenter();
    var latHemi = (c.lat >= 0) ? "N" : "S";
    var latDeg = Math.floor(Math.abs(c.lat));
    var latMin = (Math.abs(c.lat) - latDeg) * 60;
    var lngHemi = (c.lng >= 0) ? "E" : "W";
    var lngDeg = Math.floor(Math.abs(c.lng));
    var lngMin = (Math.abs(c.lng) - lngDeg) * 60;
    $("div#bottom").html("".concat("<span class='lllayout'>///&nbsp;&nbsp;&nbsp;</span>LAT: ", latDeg, "&deg;&nbsp;", latHemi, "&nbsp;", latMin.toFixed(3), "'<span class='lllayout'>&nbsp;&nbsp;</span> <span class='lllayout'>&nbsp;&nbsp;</span>LON:&nbsp;", lngDeg, "&deg;&nbsp;", lngHemi, "&nbsp;", lngMin.toFixed(3), "'<span class='lllayout'>&nbsp;&nbsp;&nbsp;///</span>"));
}
map.on("moveend", setLatLon);
setLatLon();

// Left fade panel contents setters
$("button#intro").click(function(){
    $("div#leftFader").show("fade", 500);
    $("div#leftFaderContent").html("<h3>Welcome to Career Explorer</h3><p>My name is Ian Renton. I am an experienced developer of unmanned maritime systems for global Naval forces, and my company’s lead engineer for unmanned vehicle command & control and autonomous navigation systems. I work within the company, with other industry players and with international groups to help define the future of unmanned systems at sea. I have experience of the full engineering lifecycle, from the bid phase through to in-country support, and provide technical leadership to our in-house software development team.</p><p>Click any of the buttons on the left, or pan around the map and click on the symbols that appear, for more information about work I've done and places I've been.</p><p>If you're after a more traditional CV, <a href='https://ianrenton.com/cv/'>click here to read it</a>.</p>");
});
$("div#domains").click(function(){
    $("div#leftFader").show("fade", 500);
    $("div#leftFaderContent").html("<h3>Domain Expertise</h3><p>My domain expertise includes:</p><ul><li>Autonomous/unmanned vehicles</li><li>Maritime navigation</li><li>Naval combat systems</li><li>Mine countermeasures</li><li>RF & sub-sea communications</li><li>GIS applications</li></ul>");
});
$("div#procs").click(function(){
    $("div#leftFader").show("fade", 500);
    $("div#leftFaderContent").html("<h3>Engineering Processes</h3><p>I have worked throughout the full engineering lifecycle, including:</p><ul><li>Technical and costing support to bid teams</li><li>Requirements capture</li><li>System & software design and modelling</li><li>User Interface design</li><li>Usability testing</li><li>Configuration management</li><li>Integration & testing</li><li>Post-sales support</li></ul><p>I have worked in agile, V-model & waterfall lifecycles, and developed systems to IEC 61508 SIL2.</p>");
});
$("div#langs").click(function(){
    $("div#leftFader").show("fade", 500);
    $("div#leftFaderContent").html("<h3>Programming Languages</h3><p>I have experience in the following languages:</p><ul><li>Java</li><li>LabVIEW</li><li>MATLAB</li><li>Ruby</li><li>JavaScript</li><li>Python</li><li>C</li><li>C++</li><li>PHP</li></ul>");
});
$("div#packgs").click(function(){
    $("div#leftFader").show("fade", 500);
    $("div#leftFaderContent").html("<h3>Software Packages</h3><p>I am familiar with the following software packages:</p><ul><li>DOORS 9 & N.G.</li><li>RQM</li><li>Enterprise Architect (UML)</li><li>Eclipse & NetBeans IDEs</li><li>Atlassian JIRA, Bitbucket & Confluence</li><li>Git & Subversion</li><li>Maven & Ant</li><li>Jenkins</li><li>SonarQube</li><li>MySQL & Derby DB</li><li>Microsoft Office</li><li>Microsoft SharePoint</li><li>Apache Web Server</li><li>Microsoft Windows</li><li>Red Hat & Ubuntu Linux</li></ul>");
});

// Hide left fade panel function
$("button#hideLeft").click(function(){
    $("div#leftFader").hide("fade", 500);
});

// Hide right panel function, also hides target lock buttons
$("button#hideRight").click(function(){
    $(".targetLock").remove();
    $("div#right").hide("slide", { direction: "right" }, 1000);
});

// Slide in top/left panels to start
$("div#top").show("slide", { direction: "up" }, 1000);
$("div#left").show("slide", { direction: "left" }, 1000);