---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SEKY3TY%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIEJXzMiGaCZeEec6pV5tkJMau40taqaYVTbTxYhBFsobAiEAivh%2BIQRxwkZlXzvnHLYzBKt7YotYCWYhGiB%2BMRJKn8Mq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDCW8%2BBgIDRcO8LcO%2FSrcA3DpKwyiQBZwQTv%2BpJ3D8OMXh%2F9f3%2Bzhi98VOHPrt33RZ7ePaMnKHijo%2B48hEghTgCe3jh%2BwQt3IpezLy8%2F15tRCIygWuq58ZrhjXqV1J73pILfL8oe0iK2CJrtbBmAof9zFqoU97pBX2Hp%2BsrMlQvbvtpzLYuHU6yaPMKU6QHRYE7A8FvvYUDPctce%2B16DQVbTyJZStjk3gjchWGLDMugGny%2BRFf7JwdruakSVz5k54UGCY1PDiTFASKuXdVJSdv1RYQJ9861u8UvUczaiNR1YbRdx3g3buQRV31z9dwRQs8gagwjcRHqDMPeib6NSQWwB0LqA%2BEJtpBKyIEz1UVNVVlY4%2FbHBVBbjyFNVb6S9Dl29ekqN9S1ug9ZWWBpYYGsCK3Xc1lXUTfOaYFwZqIYj4s6MoZKPsHPRvwdBaOtRwve7XF%2BjwAKS2yNlgTQZgZ%2BUyQjQR%2FfG2t%2FCYL%2Ft0a1hf9oJ0%2FKRzTlxhUxxeygMJPncBHGhFtl2sglvkSQOLR3dy1DZBOIIzfhfrvt0JCBahIIyTmCwrT1Jpo4M%2BK6E0W0xfdZQact2KS3XMX7XtmC0dZm%2F8n3z1SV6Q7a5gy1mWGqina9ssdAMSUeOsQ0IyoPnk5P1WnmZzCQJdMIb4rs4GOqUBDef1iyfgPAYhe8lop13iD8FRvGeTDd79My9iz%2BU4Ku3n9Q0iuDKZXEmHn32gUz77%2Bggit73767sEy8Tyxy4Co7lMbILan8djSUYB3gBfTA16zqvAZTc3ykgRcVyonFi%2BUlzhQ%2B1tli4xAj8l9QqklpB7kKPzcDZP0f4n%2BacjhqeiRPiUUhR3dXAXW%2BlVdHA7%2B9kyEc6jeOg%2FBRaQyB6X0g2omzpV&X-Amz-Signature=dd5339ed9a75def42f79c4b543ce0232669266319666e6f35af2721a849e9245&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SEKY3TY%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIEJXzMiGaCZeEec6pV5tkJMau40taqaYVTbTxYhBFsobAiEAivh%2BIQRxwkZlXzvnHLYzBKt7YotYCWYhGiB%2BMRJKn8Mq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDCW8%2BBgIDRcO8LcO%2FSrcA3DpKwyiQBZwQTv%2BpJ3D8OMXh%2F9f3%2Bzhi98VOHPrt33RZ7ePaMnKHijo%2B48hEghTgCe3jh%2BwQt3IpezLy8%2F15tRCIygWuq58ZrhjXqV1J73pILfL8oe0iK2CJrtbBmAof9zFqoU97pBX2Hp%2BsrMlQvbvtpzLYuHU6yaPMKU6QHRYE7A8FvvYUDPctce%2B16DQVbTyJZStjk3gjchWGLDMugGny%2BRFf7JwdruakSVz5k54UGCY1PDiTFASKuXdVJSdv1RYQJ9861u8UvUczaiNR1YbRdx3g3buQRV31z9dwRQs8gagwjcRHqDMPeib6NSQWwB0LqA%2BEJtpBKyIEz1UVNVVlY4%2FbHBVBbjyFNVb6S9Dl29ekqN9S1ug9ZWWBpYYGsCK3Xc1lXUTfOaYFwZqIYj4s6MoZKPsHPRvwdBaOtRwve7XF%2BjwAKS2yNlgTQZgZ%2BUyQjQR%2FfG2t%2FCYL%2Ft0a1hf9oJ0%2FKRzTlxhUxxeygMJPncBHGhFtl2sglvkSQOLR3dy1DZBOIIzfhfrvt0JCBahIIyTmCwrT1Jpo4M%2BK6E0W0xfdZQact2KS3XMX7XtmC0dZm%2F8n3z1SV6Q7a5gy1mWGqina9ssdAMSUeOsQ0IyoPnk5P1WnmZzCQJdMIb4rs4GOqUBDef1iyfgPAYhe8lop13iD8FRvGeTDd79My9iz%2BU4Ku3n9Q0iuDKZXEmHn32gUz77%2Bggit73767sEy8Tyxy4Co7lMbILan8djSUYB3gBfTA16zqvAZTc3ykgRcVyonFi%2BUlzhQ%2B1tli4xAj8l9QqklpB7kKPzcDZP0f4n%2BacjhqeiRPiUUhR3dXAXW%2BlVdHA7%2B9kyEc6jeOg%2FBRaQyB6X0g2omzpV&X-Amz-Signature=dd5339ed9a75def42f79c4b543ce0232669266319666e6f35af2721a849e9245&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7PFEJKP%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIHnzO8ipL8mvUlI66MzHPGoDhizzCnkrWToXK46YnkXPAiEA8tFO8E%2BP5qQJB1v%2B5cMGxz3GtdcGyYykAvr3sIwnHRwq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDJ%2Belf5iFNRDsT0l%2FyrcA%2Ff4X%2BXCCvdlqZouOMbOzBfffwY%2FiDhLKHNozEDnCmlj1alPc0cUu3uSl2P9mFB5f46VrFvRMRI6GhtJBVzNKvgGC%2FFfjoE6SjZxiYhHJbFkJoODd4NN246qYwEG45Z5bVW7lYYOhldx8UhSGq3qm%2FELxZCP6R8HVaYS3l5AAqSLfdJYCkIWWx3%2BuKztOVQLaGljNWv71alE3j4ND4bVq3UJempelM3WFxrn4Tv6IcxQpkTFyRa%2F7sQBXRNYXbKYKXRQYQXKJgL888%2BnpzTgYhPHBjVCb78BVlDuTEeazDXLcWXghNnFD8rJHRR%2B5bLab7sbk4BnJki3fktC2qZNZOA1Kt2ofvxK0yuw00%2FDlElPKOVHZLFt7nvH7AgoMlGPBVmKi4Ah%2Bhy63rNLB%2BRfbjPy0DpPdmJxa25cj1unGMINk%2BY8ImAY0skcMOjwRDx%2FoW9DJcjKfsMK6bniRFVRrp8Wu9Drv3b9KlPhSLRfUIVQ3%2FjcDKGFhVx65t7OucPSnEhFIW8VgXWyl7Ev05NIQ%2BRKLbMD8CixuW4aIctKwStCc6SIZSFAMi1jP5kixL6cKD5FOVezzDRwLtdREY9TUhdyxp1mf0cA2cVggvrC4ygLbtF9zKuEopyCVZJiMNrvrs4GOqUBQuftK%2FOR1ZyejteIdMmARZ9vFaA8C2FeaEaUFdoEAi8uH0mbmVX1c%2F%2FMgbSqvxwqkiUeWAb8h1kmZigw%2FXkL4zIdEgCjE1DqTU3ccwAIgWQ2c335Zi2Et2C977s13zV3merQPwiZfcukbhGrJCO40u8du2KJhqHXQr79c7TzeDNo%2Fyglav7%2FsWgZ1GjV2pzjvg5q%2F6NgTJxQsDsomRw%2FlnPbatyf&X-Amz-Signature=e0af5c53530ac481eaf8ac50b96ce3ba335929a19b266733d085df03fed4d80e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPMXZLML%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDTqqLTDxZuX0wIfiWfRt5skH77YO4iM0llKRkSY1ylGAIgPWr6X%2FaLKkPnPg2V40o%2Br1aCIvnOc%2Fhv721dT%2F2qLVIq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDHG7NP2FQEO3JMGC3SrcAwQtoCfHjMS6zaNPTyqVV0p57l4Bx5qydhXxbyaEU7BnFqEWsM77QrKSi0Y4PnR3iwpEueXpDrWcft4GjgVwImPA1YKEPDGc%2BBrlQ8Efd8kCUgBUSkfyUtWjmgAKM2tTLmu2OsKp5gSCcixmgjqUgliD2q%2FmjKGQ2AhlO8j7ExcHKgdBc12fE7iqFvoqau%2F1Pw0up8pHb03I%2FgnCp2qiCBGhBytu6Gvxxki0z5TUwKSLuxoAxg94NzSJKmBzv0YMe9rxuVL4yZ59HRORd%2BOEu556Xj1Ydl4SRiM56Ak1yiocst7cXbpIv3YkKm9K2HTShnnu1s1nfxHqhwJ5gginJApZAV871QtW0vAJUaUU3wJGZlPpkIOMEOl0t49zQ2iVNJgE7ebSb0xHtM6wsvHRYB8ClPNCjhP7HYLYCpymBPeBgzITE6gNPqa38TVRDXMdIzgyQyan8r5PqWkrgBu%2F8ofXGS5tcZtYUGrL%2B07ar9FQqen7jnH96KWDuO5b964E64sVwe53rmYpADlMv5ofn4m5fTCfggzSRCgZxZbb0u1x%2FCzk2dR7cwQn5TCzAld%2BQmpwMCM%2FjPpigfDoqp%2FshH%2BzKoHnf3zlHFR3fWhMyjqiX3wlpNUSrqsv3cCCMIvwrs4GOqUBlQoLS1K60hRHOQvdDHRXRGDtLqBq7051wbnAr%2F60uXNnB5AK8A1R6YqtFjyAl3X91eL%2F5embVdHyR39bFI6AhvNAJuvD17yrsY6KvosNmwQpSZoNqaA1QV5gMZ6u19bv06jqo8%2FQLQKBOdXdg9tuyWKGnBtyMMmv7ZD%2Fnr%2Fabjff0akjSJSVzJsUXLKt6sRywUwCpF8Q5fzo2YXAsXPWaR%2FV5Tzz&X-Amz-Signature=f58845980ca1a1c1f25a003435622d1e7d7f827df30ae1c817d5e01365c77d69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UPMXZLML%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDTqqLTDxZuX0wIfiWfRt5skH77YO4iM0llKRkSY1ylGAIgPWr6X%2FaLKkPnPg2V40o%2Br1aCIvnOc%2Fhv721dT%2F2qLVIq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDHG7NP2FQEO3JMGC3SrcAwQtoCfHjMS6zaNPTyqVV0p57l4Bx5qydhXxbyaEU7BnFqEWsM77QrKSi0Y4PnR3iwpEueXpDrWcft4GjgVwImPA1YKEPDGc%2BBrlQ8Efd8kCUgBUSkfyUtWjmgAKM2tTLmu2OsKp5gSCcixmgjqUgliD2q%2FmjKGQ2AhlO8j7ExcHKgdBc12fE7iqFvoqau%2F1Pw0up8pHb03I%2FgnCp2qiCBGhBytu6Gvxxki0z5TUwKSLuxoAxg94NzSJKmBzv0YMe9rxuVL4yZ59HRORd%2BOEu556Xj1Ydl4SRiM56Ak1yiocst7cXbpIv3YkKm9K2HTShnnu1s1nfxHqhwJ5gginJApZAV871QtW0vAJUaUU3wJGZlPpkIOMEOl0t49zQ2iVNJgE7ebSb0xHtM6wsvHRYB8ClPNCjhP7HYLYCpymBPeBgzITE6gNPqa38TVRDXMdIzgyQyan8r5PqWkrgBu%2F8ofXGS5tcZtYUGrL%2B07ar9FQqen7jnH96KWDuO5b964E64sVwe53rmYpADlMv5ofn4m5fTCfggzSRCgZxZbb0u1x%2FCzk2dR7cwQn5TCzAld%2BQmpwMCM%2FjPpigfDoqp%2FshH%2BzKoHnf3zlHFR3fWhMyjqiX3wlpNUSrqsv3cCCMIvwrs4GOqUBlQoLS1K60hRHOQvdDHRXRGDtLqBq7051wbnAr%2F60uXNnB5AK8A1R6YqtFjyAl3X91eL%2F5embVdHyR39bFI6AhvNAJuvD17yrsY6KvosNmwQpSZoNqaA1QV5gMZ6u19bv06jqo8%2FQLQKBOdXdg9tuyWKGnBtyMMmv7ZD%2Fnr%2Fabjff0akjSJSVzJsUXLKt6sRywUwCpF8Q5fzo2YXAsXPWaR%2FV5Tzz&X-Amz-Signature=ff1b379babed2c597939e8bf58f83c73e3297b8a82b4d30e58fa48e078b45b53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VWRBQ7L%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIA%2FRRM1TZGUNKwI1eppBJoFr4m6bASupM7Q8KfKh4BceAiBZozPGV9WdiEssh3BFBIgNstx7ITZ8ckCdJCTGo6iuECr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMWzjia%2FAZ04NHDw89KtwDL9myexgLkmqZ5NGAV%2BVPYjWetBVYdb8LwcIHbM3sFDJN4Rp7yG8jPdEYerGMfACNqWcMdSl%2BGNsayF3owapBzAknP9f5nW5urFEhIoOqL0o9EkJn8%2B5juobAQoq2XK0AMrFH%2FIWeUK39JxJFeED0CpRwVBlNkY%2BefC6Bb92uIbfS1hKuBa3TSyGeJ66BG2lhHXly7dXmeGeOpP980wH14clAwgZogIjISZOXOIDVHELeejPHKGKOrnLG1Tj%2BF%2FIdsldSXTxRVhg2zdGCr3438GxeJsEWbVx9X6i83aNsTKRbzCFLxZCUtFtfPiqiMT6JFGDlhCdgio8m2Y2EwKm5kDOIv6FutlcP1OB8jf55z4L7Cy2hxjRvzPpBL3W8TtxdcR9DGJl150Gj5h7G5Cbrg8MNAjhUKFTkGZkd%2B%2BkbiL4jOD8tcVgPZO4p5qP3O1XDl238vA4FlXaqsaaC6g3z70QWmt6Av82a%2F9YqHw0KyjFADZ9NgxTso4s9fUNAHJ7AXB%2FaC3XuezRuQDnwgtkgogOuttsJtmWL%2B0jgHqL6fhROsFjkPB0l5XUs0rRYH0rlFjLMQnfe9SDOMZIMs%2FLdnvU4pX%2F3C%2B%2FKcGRBJ5%2BhSJKd8FHyUpe09qAwnkMw%2F%2B%2BuzgY6pgFSRXt24XvTZpXFcPI9ye3z4IsKE0thT6%2F6H6IyEEpYn%2B9kSpCDJIobs%2B6pMBCugD%2BYf5JBRX0Nj9UyZCM88fst8WEHHkkU8G71%2Fh9OsKYhHz1nWlWOB8HEXitcmPf4qgOZ4oe5bPkkRrFsAq07gZc6bu3PFrk6Jsd4sspKDwEDkNvJOp2ox4gi52H2hNKOgDX%2BcJBtih%2B1LuMzmOTNLL%2FlvUjWHGJF&X-Amz-Signature=8f62912dac45d0e46e6d1eb53624e3a880fdfdedfad51eea31d63e5d2e238a0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAVRC44X%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIE1ck7%2BQV0YW1Vza2RebV%2FWliBivshjLwA%2FmvpILNiqXAiEAilpEZunquZgsn2KW4nvReU9urWai%2Bmp0AbW6QPEi2nMq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDDE0R%2BiWlW0AlL%2Bp4yrcAxP7uslelrmWhS66RePGMur3IPTRMUBDPfeM%2FXgSuRfqlEtpkbiLdxYEZOBsCcftA5kx4I2SnY2yHkgfgve5fGVFCoyFHCcBOfms%2Fthz7Aih1x1EpDtOyf%2BgHc5Dg6nl0xxO4PPwyDa3oiNhdz7RdP2oYlicCuli2MDZtaWwAaivMFdtojNj00kSwTNBadN7RBuI%2BkDdiMK3spt%2Ftv0IWakIEAqk8SM6NMjVJ18YjcCSJ5sXVuazOZIYWo5%2FfYjIl2Gl5D7NicyqWFZwdguGnhl5LFpggFHwf3YWOGzctRsMbyfUcla4VpxLsKULwUQxszsGi9cucaEE6EqOQUrRLp%2B4N5%2FMwKy5hz0jtGDlIVfYiHalQcEqUXEv%2FDGgcjoctuK9pzH2x7ZO2dzMcySfLAkTOqyZc%2FxvxUtCmu6hvgDZcI0gD6AHraKGovOd5bjiQa%2FqOVcM3Nk4JgdxAUYV9frd2dtPVfhCETenTIdWHQgYbjAqrik1B4FEyA2LpzO8DXjiCPJ8MXjaE6RzL8Wjsqn6Tldk4rct%2B9VJLF8tSo0P%2B6TUueBzPUnnlN7QaE9rTucei1YziMrCBJLofIY3AMssmndzN%2BOGS9jHjhiLKzHa5oxuor38hpmJAeY4MLHwrs4GOqUBjrxuQFTBDq6yM7KxJH63NifCAZn2hkeM2cYtB9Lc8frLs31pJq7y80A0Ioee8Y8ZGUX6p7pbxI9Fc0RAGdg%2BHgT6mEoXVj0VEr%2BQS2rwwoXET9TvYt2DYS2eR53RZR9BgNYkH8XwYgbzUqHoOvw35k%2Bw5tyQG3U32SdMjVoMzL1nRyYQAmKAyOjjBUQ7x1o6QjxM3wNcIPO27XGznvZ7dyIyotuz&X-Amz-Signature=197a1bc71261d93ade935c02ccc5cb585b656d91e480aaf824711121baafba30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQ4TG2AJ%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIGHzyAZRRfVL0iV087vuaxsFJFAuq6YpMZpjJTNFF%2B7%2BAiBHBsfB1ZWc46XM1oSAt0tLbFzPqI%2BEiD7ObYifzpbDzyr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMysjEGRE2EMWOd64OKtwDzbVIbyGcZP46GIhwvZ47OgNAhJ8X0qJCLhjcaXJ7yWqt20KWoUtk8oabrgXfSaPdHzqPpphvyMreGGNpE6cw3Zd2gAbqPjaPv%2BRBsvWHYtOIIGyQSQ5E3L%2BuGJ8fG0FtnKf4I4hGOphDukY2CHzF%2BF8OUqWCS3C4clWESXpt9urfysv2meonsvac7MEqfl2%2Bu3MDe2rnF2scSHPSeResg%2F6GTxJSTSZzVdyGKiQ%2Fwym5ioQkeVzQeIAeiZYTBlkM1uwMgC1zOTfZtK6QB9JnCHg2IVKPMDGj1BvsK5whHrrCWm%2F99JITcRiZDIGaz%2Fk%2Fx3AaDdAAuptMGDxC%2B7gwreQOy3OkTo2iPEsFXmYL4gSsFSUB6lVqv0cMheHxP4xb%2BX8l9t4LMrFGoBBZu88uk%2FJjtWHZMTSqfbwmVNHw6pXNQkaHONdFsfBDC7aPPfwlsUqPdmeGjwe36zte3sYVFgemsDADfQBZm9wIrLvPVS4Bb8W2HNG9qlTiMEOhzxOQhcmGbqNFJhtyAl3oL7uZ5rHBc%2FcDAG18m9J5l01FFq%2B9BJ3acPXDiI3vUq6ja%2F0G2wCf4aPTHME0CXE46gZCCKkJJvfOngJiKGA7U1dZdObk%2FRnvbzugMkF896Yw8vCuzgY6pgG0GEYg11%2BsvOjpmhLVZuFh1GRllgycIX1jhGzmT4SpkwnDyVJ4f06oXMt%2Byh527J7BM%2BhNu76h3EeknKQHhWUGlXAK9Upx6rDN8YApwtebkCYiAiNdTxlKio7RPVzxSLxfW1bb2LKOTH5HJJTOMNp1zv79K9Z8P7d2Ksr%2BumfVOcOb40zzzMS4c0B1%2Bw0jA2rGjWypGh3%2FyYWhRkTB8uU527FmpGpZ&X-Amz-Signature=54094c752dded5f2bb5afb0e696ff0ed99ef7c6a9a6d137c84cab5176f453f89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDVP3F5F%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDGKX%2FNKsy%2FmTU9eMNjwc1GjDsqzz%2FNiYHBvSEuv3rsgQIhAOjlG3JGCskae6pLpakt%2Fpld%2BskDJae%2FYlGBmxqEh28yKv8DCD0QABoMNjM3NDIzMTgzODA1IgzpOdFvRRRGMim1ZRUq3ANK0JrDRJuPfrx%2B4ykhnQqSxNGXtgNvOiJGfRZ2BPvq6mevbhA%2FG86u9b%2BXwD1RlgQ%2BRj%2BxAz68X6SPkU7ZNcMT9NKUPE6x2R0EUONlmztCpzn1k87G4sAdwON7mJKKvZ40GQxFObzLoYETLH34wl52T2L5bwSPLXQZnb94oOPvmDVi1Lvilhg94T26tlcHM0nGEmnkl%2Fcce6ORH94s%2F3ckcD9ZkTEXPh%2Fvjzx93jcwjgFoy4cN6LbmTIjpUFaUrzkLEwF72cps8NbLvvsDvVACiQGiBzzlPlBrjD0Kd1%2B7WOUaaMz1BzmtxQQxbbhZ6QBKgtnU5s9d5Xl6pjz5OzN8LKdcoxq7CTKHT3ZgTAmRiKYH8j49J5yvg7H8vCya0YId5pvlwH0q7Bb%2Bx39HEX0mYJvSmXBOMgmeXJvvhH24g556J41TBlZ1%2FY2pJP8o4oCFSDdec9v534htahODdA8ZDM7KhM8k9GpNtSA2oMKIdAxp65kGvxhUoyAoqJ3sGHjurkrAzfSd%2BGC0SHU57WkJyurPGwncu%2FJXl9DdgBU5p%2FDUlGCfvGFhc58MZ%2B%2FvLmAGQkDtG%2FJz%2BSZyqFof%2BhyK%2FhtC1MKoJwr3WKlVbb9iVnPaNlRlHeKL0PCHzjC78a7OBjqkAWB0UbaisXTUNmxN4wd%2Fbvjv0nJytRKiWQTn%2BGKb3PdeT8Bv0tAoh6X60Jj0sHPQ%2B%2FxygxSKGNOOpIocSPub4s1H5O8vPs1ObLFpxudVef0vSrJglL8QTOXY9g3dpcaR9wNifqCl8Z75yUEHSvo757hz1c%2Fn6oeIJ6GK5M%2FJN%2F4SaOJ7FIkW8dm5y31RQDVl7mgXICXmqQnlBnxMlXeJJ1YtRhwJ&X-Amz-Signature=d9cb6a3f37b129a5187635c93dffdc259319b0b3893def5d6b03c7e3314a91af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDVP3F5F%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDGKX%2FNKsy%2FmTU9eMNjwc1GjDsqzz%2FNiYHBvSEuv3rsgQIhAOjlG3JGCskae6pLpakt%2Fpld%2BskDJae%2FYlGBmxqEh28yKv8DCD0QABoMNjM3NDIzMTgzODA1IgzpOdFvRRRGMim1ZRUq3ANK0JrDRJuPfrx%2B4ykhnQqSxNGXtgNvOiJGfRZ2BPvq6mevbhA%2FG86u9b%2BXwD1RlgQ%2BRj%2BxAz68X6SPkU7ZNcMT9NKUPE6x2R0EUONlmztCpzn1k87G4sAdwON7mJKKvZ40GQxFObzLoYETLH34wl52T2L5bwSPLXQZnb94oOPvmDVi1Lvilhg94T26tlcHM0nGEmnkl%2Fcce6ORH94s%2F3ckcD9ZkTEXPh%2Fvjzx93jcwjgFoy4cN6LbmTIjpUFaUrzkLEwF72cps8NbLvvsDvVACiQGiBzzlPlBrjD0Kd1%2B7WOUaaMz1BzmtxQQxbbhZ6QBKgtnU5s9d5Xl6pjz5OzN8LKdcoxq7CTKHT3ZgTAmRiKYH8j49J5yvg7H8vCya0YId5pvlwH0q7Bb%2Bx39HEX0mYJvSmXBOMgmeXJvvhH24g556J41TBlZ1%2FY2pJP8o4oCFSDdec9v534htahODdA8ZDM7KhM8k9GpNtSA2oMKIdAxp65kGvxhUoyAoqJ3sGHjurkrAzfSd%2BGC0SHU57WkJyurPGwncu%2FJXl9DdgBU5p%2FDUlGCfvGFhc58MZ%2B%2FvLmAGQkDtG%2FJz%2BSZyqFof%2BhyK%2FhtC1MKoJwr3WKlVbb9iVnPaNlRlHeKL0PCHzjC78a7OBjqkAWB0UbaisXTUNmxN4wd%2Fbvjv0nJytRKiWQTn%2BGKb3PdeT8Bv0tAoh6X60Jj0sHPQ%2B%2FxygxSKGNOOpIocSPub4s1H5O8vPs1ObLFpxudVef0vSrJglL8QTOXY9g3dpcaR9wNifqCl8Z75yUEHSvo757hz1c%2Fn6oeIJ6GK5M%2FJN%2F4SaOJ7FIkW8dm5y31RQDVl7mgXICXmqQnlBnxMlXeJJ1YtRhwJ&X-Amz-Signature=1857109be4fd8cc715b55ad854a0dbab9d7a6763c8f6a463158c3c1007b099b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZH7XLNPL%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIGJkj%2BQrddIDnvatWVShjz8lSt%2FRN41%2FzPKWUAQlivFHAiB6iGdJ%2FwwaDN7KxqOvFx8vsHNpn6913bWVfaxkO0HUHCr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMxy9LvuTOcGClSPmEKtwDF93GCup58QzeL%2BGlIgWaZIAXXaxdkgbr1evVwye%2BsqvqBJR%2BVshKcBMKksST%2FS4ClYNP96C46MIXGG6wLD2PRiT2yxuEBbhEqvwgZxgDxutfZ2LpzOJ1o%2Fwa1PkBGDF%2FJfT5qcmfXWEFKEdUsFjmLWb1V3fN7Q3tNPWngfzCosjoKkyQ9kmArmh3qA8GZQ114JWULas3cwS06JdHRiPIheiwQBQFoZaY7z2vUcO2qO0Zu1hwu3tJB68VE2ROJiZA%2FN9QMZLhLWWMLZPOrzMX9madDPAcES%2BybagrkfZQnAiLqLBQENFi1l1KZVNM7fPT4GH9Jg1XYuqcI981OmOw%2B99TNwldkgdY%2BT5Emg%2FSckactn66Y8kxA4Hq3VD%2Br3pRkWdu4fxG3Jf%2Fpo9EnPUoOHHjCbO3vRsEmGp2hdHeWabnjWC%2FpMzr0QQP84vhhSh%2FrpVof%2Bc1t573gDFCxsMBaa0W6wsfp8m9pioBgq0xLbsi2adJA4Q0t3jVrRbbr1BSMxe0bua9lzpRUmrdHFAnyuHRaytHNMbo4jlPUeDUUv2QqmhFb1bWHV1FXxULizWih9V1YdLsg6zcq69maZ5ElGo%2Flw9j8mZO5VmfjN1OlmYKpMp81X9C03i1eS8wx%2B%2BuzgY6pgHh%2FDAtRwiEOPudJaU9xtoFCM7XnsXzqKAYSQwqKQEdy69U9dbgU0k%2FXwVlum3BFzNc5ZveMa3Ngz%2Bs1JZzBjlAFA0khRa%2Bd4ClI3b9gjUbPxxkQuJ5BZUq9nQBtN6Nim3GcU6pGzMbkJ8ChL3%2BZ3%2BD7X4lvTnSpTTG2KF76CSTgoYeTPC0qbl%2FMFZAzNiexFqmbY%2FDbq8WMfAEU9WyOtwPk%2BIQRmq2&X-Amz-Signature=4802184b5bf8058420e89904b2440ca89a3df55b939cd7b9742159af8783e799&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYKQ5Y7A%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFluKyvkhWfvycG4ixC7eU%2FO%2BPWgSmpNkgS8MTj%2B6SovAiBr9d1asCzB3WUGJsQtSys2%2BRVc0RTMP8YJ9FGLcJIakyr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMl68LVKAo0OW6OIBzKtwDi84JQFQvCjzIWP6keraoZdAXmeZ8QcrxPBz1tVHR0QSbIgTs%2FYKwP0oS2AAj7i9ALrDcXjLgxBO5%2FsY%2B%2FJ2VhA2TeIPnM3gFsgubeKKHMY8raVVVO7kviz42yeAqCKrOvAFqhlh7mPzb9xAUzyW65PSwwLlzwtZGD6TN5szfiCcTJ%2FV5G7ger8S1o%2FG5L4EpFRDdP7BMU2AD%2F9vzIHGL03W3vWEqM13RJwb09TVdiAeaBedDmbIsSLsMKa7NI%2F%2BLd3zyPCW4k1Zuby%2FVzPlgGbmTQPrFLyGwwsBYw%2BxZ3IZsZrKwGdWFwSKxoTCQNJSL4qVyMtX1jV4Gp8OVnFSBVtXMXOpAxmtVQfTDBmLrzQt3xc78Y7GGY3FjtjE7TJaBil5Kjy9WpyQ9g5T5r%2F5A0kKRGxWy7%2FCnsNoIrIn8KAp45nm9w%2BVZLXPZnW09nghbAmZn2a1MkRzBJZaRgua9xswGl6t2lNiXKlAKh45mOeaIYA8Y%2F%2BdegaKVH4BnENAOZU1QB1nPIxH9xEaAGSOG%2BfpU3hhW9KFbeO7UWDbPxYWLedZLNvOafvldftS%2Bi%2FkgxW6VETGGfdPl2pJRErv%2FHbONKzKpKwWHzvjlRkjNJ1PokyeBtqy3WlMAup4ww%2FCuzgY6pgEndlZd9WfDeBp3ZpUZzKcac3E8KSgaEXdHNhpaHUSUC8gwNHWyvZm835ZK6hVL%2BRc%2Bi2rYRNj0okYd86A4B%2FcGLT1m3XaMmiHrzMprGE0edLgCiWOvPvBWrdTh5WlKiT%2BDXfpq93wYHMWvECsEZ%2BarfHu6DFFMW2I8NCsnNOPMSS6zMHqr8%2B8TOqzD6nZOTEAk4xWo86MyKy%2FsOQkvHE3xM%2FPtcR59&X-Amz-Signature=f7886585ec1f66a73d80259650167e4982d4052e8de32c5791232e44f47503b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYKQ5Y7A%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIFluKyvkhWfvycG4ixC7eU%2FO%2BPWgSmpNkgS8MTj%2B6SovAiBr9d1asCzB3WUGJsQtSys2%2BRVc0RTMP8YJ9FGLcJIakyr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMl68LVKAo0OW6OIBzKtwDi84JQFQvCjzIWP6keraoZdAXmeZ8QcrxPBz1tVHR0QSbIgTs%2FYKwP0oS2AAj7i9ALrDcXjLgxBO5%2FsY%2B%2FJ2VhA2TeIPnM3gFsgubeKKHMY8raVVVO7kviz42yeAqCKrOvAFqhlh7mPzb9xAUzyW65PSwwLlzwtZGD6TN5szfiCcTJ%2FV5G7ger8S1o%2FG5L4EpFRDdP7BMU2AD%2F9vzIHGL03W3vWEqM13RJwb09TVdiAeaBedDmbIsSLsMKa7NI%2F%2BLd3zyPCW4k1Zuby%2FVzPlgGbmTQPrFLyGwwsBYw%2BxZ3IZsZrKwGdWFwSKxoTCQNJSL4qVyMtX1jV4Gp8OVnFSBVtXMXOpAxmtVQfTDBmLrzQt3xc78Y7GGY3FjtjE7TJaBil5Kjy9WpyQ9g5T5r%2F5A0kKRGxWy7%2FCnsNoIrIn8KAp45nm9w%2BVZLXPZnW09nghbAmZn2a1MkRzBJZaRgua9xswGl6t2lNiXKlAKh45mOeaIYA8Y%2F%2BdegaKVH4BnENAOZU1QB1nPIxH9xEaAGSOG%2BfpU3hhW9KFbeO7UWDbPxYWLedZLNvOafvldftS%2Bi%2FkgxW6VETGGfdPl2pJRErv%2FHbONKzKpKwWHzvjlRkjNJ1PokyeBtqy3WlMAup4ww%2FCuzgY6pgEndlZd9WfDeBp3ZpUZzKcac3E8KSgaEXdHNhpaHUSUC8gwNHWyvZm835ZK6hVL%2BRc%2Bi2rYRNj0okYd86A4B%2FcGLT1m3XaMmiHrzMprGE0edLgCiWOvPvBWrdTh5WlKiT%2BDXfpq93wYHMWvECsEZ%2BarfHu6DFFMW2I8NCsnNOPMSS6zMHqr8%2B8TOqzD6nZOTEAk4xWo86MyKy%2FsOQkvHE3xM%2FPtcR59&X-Amz-Signature=f7886585ec1f66a73d80259650167e4982d4052e8de32c5791232e44f47503b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LPMKXMI%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T124251Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCICkeA27pxtM1QqI5A9Q4ZYzK1EUrlsNhK6Yg00%2B60FVEAiEAsO0tPrtBkGi56OqNqTlIvfVGAhPnIPjjvy4%2BV73DtTEq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDAuf4e5%2F5XM5vkX9SSrcA21Q24uG%2BP3E4ThFVG2xw7W504JDbpYFy7BfKeArcx%2BbeV%2BocymOThMMGuGLH6MoKm64vVu0rNPAqvlgCG9zKMKVOpAthy7zh8YvaiRrd3NKqcTUmysdMYK2Kpc1nmS%2Ba%2BrfkGr6Z8h5U0249YRj5kOy%2BgObYPs0IHD30TmnhzMLC%2B45P%2Fz%2FiWvhPlAFfMwo5BK0lAmSP%2FjHwzr3s8HwEbFyafEqy%2FYXSic%2BmViArGuzpHXCCsCgOJr3HRX8ahnJ0GTPPajM6RziylUcTdZkUHPiUYbL3nQv0Gw5Xk1%2Fu0o9kopcR2O3a9ct3HpT02wWLyQAtgtMeCUkLAWuyQZVL1IuNhBpFZU3VQMmM9uUpbyvWyesGLa%2BPWDVndbevINpq2jhwVFK6xxO%2B7jjIfqa%2B6FfEUWaNqSVTbRvs1ryS1SE1vnvJ9Wab%2FjyhWbO7biPqvhuiwAHynyK2aRLk4xyrZH%2FWE%2Fc3%2Ba%2FeU9Mklw9QoF9B9oC2V9A3ukrw51jT9DkgMyEL4qLYzKYhhpVs1%2FNIs8b0mK5pcnsDBCcz7anIz6s4bThKGoIKQXboFB%2BC34c5rV1Pvyn3oLdelXAookwnVrJ9q5nHxZHuwVheKfk7JPOKgUNYuBWHkV5UXDsMM%2Fvrs4GOqUBIUnfN9u53idjkd5DRRoIIv2By2KiCYyXcBGsv8JtcLC5UJkBLZ4HTFuQXd7UHs7qw0GMlNFZLXf4B%2B%2FfAPDrqzcD8XCCcQ8i%2BeiSHkxHgtml7N4VN8fusLMNv8nByKyMLU5BZX0VSvVXMYtUssJcSRBBuwgpYAGSA55S7QfJinoM0miKcZIfp4GzIB4MyPEWDfw4ruSp%2FpO9JY1is36YZuguXFxX&X-Amz-Signature=00bdd9e0b36e547516f95d107fd7da510665c61143166638cc869c47f9281601&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

