import base64
svg='''<svg xmlns=" http://www.w3.org/2000/svg\ viewBox=\0 0 300 80\><rect width=\300\ height=\80\ fill=\#0f2c72\/><text x=\20\ y=\55\ font-family=\Arial\ font-size=\50\ font-weight=\bold\ fill=\#fff\>ANPC</text></svg>'''
print('data:image/svg+xml;base64,' + base64.b64encode(svg.encode('utf-8')).decode())
