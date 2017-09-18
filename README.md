PhoneGap app using SMK API

# Installing IIPImager Server on Ubuntu 16.04 / Apache 2.4

### 1. See install documentation http://iipimage.sourceforge.net/documentation/server/
### 2. Server config:
  * Check fcgid.conf and fcgid.load in /etc/apache2/mods-enabled 
  * Copy the following conf in /etc/apache2/sites-available and enable it

```bash
# Create a directory for the iipsrv binary
ScriptAlias /iipsrv/ "/usr/lib/iipimage-server/"

# Set the options on that directory

<Directory />
	Require all granted
</Directory>

<Directory "/iipsrv/">
   AllowOverride None
   Options None
   <IfModule mod_version.c>
     <IfVersion < 2.4>
       Order allow,deny
       Allow from all
     </IfVersion>
     <IfVersion >= 2.4>
       Require all granted
     </IfVersion>
   </IfModule>

   # Set the module handler
   AddHandler fcgid-script .fcgi
</Directory>

# Set our environment variables for the IIP server
FcgidInitialEnv VERBOSITY "1"
FcgidInitialEnv LOGFILE "/var/log/iipsrv.log"
FcgidInitialEnv MAX_IMAGE_CACHE_SIZE "10"
FcgidInitialEnv JPEG_QUALITY "90"
FcgidInitialEnv MAX_CVT "5000"
FcgidInitialEnv MEMCACHED_SERVERS "localhost"

# Define the idle timeout as unlimited and the number of
# processes we want
FcgidIdleTimeout 0
FcgidMaxProcessesPerClass 1
```

* copy iipsrv.fcgid in /usr/lib/iipimage-server/ from [here](https://drive.google.com/open?id=0B883aH-sLlrQc1RXZHJxd2ZiM2s)
* restart apache2 and check (yourIP)/iipsrv/iipsrv.fcgi - should read "IIPImage Server - Version 1.0"

### 3. Server config - rewrite
(using .htaccess - consider using directory block instead for?)

* create the following .htaccess file in /var/www/html:
```
RewriteEngine on
RewriteRule ^iiif/(.+) /iipsrv/iipsrv.fcgi?IIIF=$1
```
* add the following lines in /etc/apache2/sites-available/000-default.conf:
```
 <Directory /var/www/html>
      Options Indexes FollowSymLinks MultiViews
      AllowOverride All
      Require all granted
  </Directory>
```
* restart apache and check (yourIP)/iiif/test - it should read "test is neither a file nor part of an image sequence2


# Run the app

## 1. Check that SMK API are running!

```bash
demoapi.smk.dk:8088
```

## 2. Call the app from PhoneGap on the following adresse

```bash
demoapi.smk.dk:8089
```
