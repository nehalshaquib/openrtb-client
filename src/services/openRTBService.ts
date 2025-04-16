import axios from 'axios';

// Types for OpenRTB bid request
export interface OpenRTBRequest {
  id: string;
  site: {
    id: string;
    name: string;
    domain: string;
    page: string;
    publisher: {
      id: string;
      name: string;
    };
  };
  device: {
    ua: string;
    ip: string;
    language: string;
    os: string;
    osv: string;
    devicetype: number;
    dnt: number;
  };
  user: {
    id: string;
  };
  imp: Array<{
    id: string;
    tagid: string;
    banner: {
      w: number;
      h: number;
      pos: number;
      format: Array<{
        w: number;
        h: number;
      }>;
    };
    bidfloor: number;
    bidfloorcur: string;
  }>;
  at: number;
  tmax: number;
  regs: {
    coppa: number;
  };
  ext: {
    prebid: {
      channel: {
        name: string;
        version: string;
      };
    };
  };
}

// Function to get user's IP address (mock for demo)
const getUserIP = async (): Promise<string> => {
  try {
    // In a real application, you might use a service like ipify
    // For demo purposes, we'll return a placeholder
    return '192.168.1.1';
  } catch (error) {
    console.error('Error getting IP:', error);
    return '127.0.0.1';
  }
};

// Create and send OpenRTB bid request
export const sendOpenRTBRequest = async (): Promise<any> => {
  try {
    // Use our proxy to avoid CORS issues
    const endpoint = 'http://endpoint.bc-sys.com/agilitydigitalmedia?token=3AEBEneJTlGjU9KSAikT';
    
    // Get real-time values
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const ip = await getUserIP();
    
    // Detect OS and version
    let os = 'Unknown';
    let osv = '';
    
    if (userAgent.indexOf('Windows') !== -1) {
      os = 'Windows';
      const matches = userAgent.match(/Windows NT (\d+\.\d+)/);
      osv = matches ? matches[1] : '';
      if (osv === '10.0') osv = '10';
      else if (osv === '6.3') osv = '8.1';
      else if (osv === '6.2') osv = '8';
      else if (osv === '6.1') osv = '7';
    } else if (userAgent.indexOf('Mac') !== -1) {
      os = 'Mac OS';
      const matches = userAgent.match(/Mac OS X (\d+[._]\d+)/);
      osv = matches ? matches[1].replace('_', '.') : '';
    } else if (userAgent.indexOf('Android') !== -1) {
      os = 'Android';
      const matches = userAgent.match(/Android (\d+\.\d+)/);
      osv = matches ? matches[1] : '';
    } else if (userAgent.indexOf('iOS') !== -1 || userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) {
      os = 'iOS';
      const matches = userAgent.match(/OS (\d+_\d+)/);
      osv = matches ? matches[1].replace('_', '.') : '';
    } else if (userAgent.indexOf('Linux') !== -1) {
      os = 'Linux';
      osv = '';
    }
    
    // Create bid request with real-time values
    const bidRequest: OpenRTBRequest = {
      id: `req-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      site: {
        id: 'site-001',
        name: 'Example Site',
        domain: 'example.com',
        page: 'https://example.com/article123',
        publisher: {
          id: 'pub-123',
          name: 'Example Publisher'
        }
      },
      device: {
        ua: userAgent,
        ip: ip,
        language: language,
        os: os,
        osv: osv,
        devicetype: /Mobi|Android|iPhone|iPad/i.test(userAgent) ? 1 : 2, // 1 for mobile, 2 for desktop
        dnt: navigator.doNotTrack === '1' ? 1 : 0
      },
      user: {
        id: `user-${Math.floor(Math.random() * 1000000)}`
      },
      imp: [
        {
          id: 'imp-1',
          tagid: 'placement-123',
          banner: {
            w: 300,
            h: 250,
            pos: 5,
            format: [
              {
                w: 300,
                h: 250
              },
              {
                w: 320,
                h: 50
              }
            ]
          },
          bidfloor: 0.1,
          bidfloorcur: 'USD'
        }
      ],
      at: 2,
      tmax: 500,
      regs: {
        coppa: 0
      },
      ext: {
        prebid: {
          channel: {
            name: 'web',
            version: '1.0'
          }
        }
      }
    };

    console.log('OpenRTB Request:', bidRequest);
    
    // Send the bid request
    const response = await axios.post(endpoint, bidRequest, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('OpenRTB Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending OpenRTB request:', error);
    return null;
  }
}; 