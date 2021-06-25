import os

projects = [f.path for f in os.scandir(
    ".") if (f.is_dir() and f.path != "./.git")]

with open('index.html', 'w+') as f:
  f.write("""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Ideas Projects</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="container">\n""")
  for project in projects:
    f.write(f"""    <div class="row">
    <a href="{project}/index.html" target="_blank" class="linkwrap">
      <div class="blocker"></div>
      <iframe width="350" height="350" src="{project}/index.html" frameborder="0" scrolling="no"></iframe>
    </a>
  </div>\n""")
