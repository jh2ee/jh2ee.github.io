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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657LWKRW4%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFTd3Wt91yKlA%2FRXD1CahRUQCRztnvOT%2BuQBfl1%2F0CmhAiEA8c8bUhKm%2BODqls1QZR72XNNvngZv%2FORFRLd%2BBgdgHQMq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDKcnBdtdWal9ka3%2FmyrcA3qyF7rkrpdgg%2BkbfQ0x4BPBXIn3texrlvQ8OO3LRrpQfmFoeWIcOaP7lmB0ruj9bUT7j8gFB3N%2BN%2FswyznFdMmW0Rv2QovHgTKIzOnZibxaWTsal4Ft8YyGVf4d7HLHgSmhf58flSlExKfZJZ2He7viqobz0B6dCEWLamC2DVHtrUkhVSen3NCPFfVUe%2B%2BtM8OB2zF7mN6JVnwJRFCl2lmomrWqBiNZlcrINTH06Wn8tqqagqJCycCYBlsBcxYx7C1qe2OXij4D%2B%2FQH%2FwSQwBsZrx3dD5HFXG219A4zgkUef28jIOQ7NFo%2FiZl4wV2wHN9X0qqVy%2FFQGHEdZ2Dvwsc34IFg6mQ16Lachrlb1JC0HXdMi1g1UZvGWOcOHd1PEsmoLt6XWx67GKEZM9SR0xFQqiLCYNiiZLY%2FeVWXbTiccRWjDm5DC6cGOKwXFxBkr3STRcgLblinS320GaFrQJ2UO9o0lFvkvTt0Z7Z66VrPpSUYDvC59Hr2ecphrjpIo8WlkSeqNcQr7h9bRYRYMHGwwxitjhZKf4uZHmir34nKqRnu0TKVRD29vGhcj8l%2BeXbKF5KPZnPxBwMcI%2BwtmOzzyE90YgvAFfpNQ7EZGDiseAxaQQ1u6rq6m4cnMJXdq8sGOqUB0NAmxFofY2LuaLS%2BCjPU5n1TMzfa2YHP6pmiNYI4SJS%2B39PvGD6FA7fhgdFUojbF1%2BrmNpjBMKGjQqoTeu%2FSrEVSI80cnSQCRIv4V7RhUd619aWBl3e2b6EoZexohNJ5rnrOJJwgZ%2BuzC35Yui2HbsibHu9JVtQWHc4qPL%2BSq%2BdEdePjHamPArrDUW1KGn%2FM%2BfeuDU3kGwm2B3zw4RALs2THfFTW&X-Amz-Signature=3f99874fd28f606a27606f3aa8808d363854fd2e2dcc885b0900b84d88be68c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657LWKRW4%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFTd3Wt91yKlA%2FRXD1CahRUQCRztnvOT%2BuQBfl1%2F0CmhAiEA8c8bUhKm%2BODqls1QZR72XNNvngZv%2FORFRLd%2BBgdgHQMq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDKcnBdtdWal9ka3%2FmyrcA3qyF7rkrpdgg%2BkbfQ0x4BPBXIn3texrlvQ8OO3LRrpQfmFoeWIcOaP7lmB0ruj9bUT7j8gFB3N%2BN%2FswyznFdMmW0Rv2QovHgTKIzOnZibxaWTsal4Ft8YyGVf4d7HLHgSmhf58flSlExKfZJZ2He7viqobz0B6dCEWLamC2DVHtrUkhVSen3NCPFfVUe%2B%2BtM8OB2zF7mN6JVnwJRFCl2lmomrWqBiNZlcrINTH06Wn8tqqagqJCycCYBlsBcxYx7C1qe2OXij4D%2B%2FQH%2FwSQwBsZrx3dD5HFXG219A4zgkUef28jIOQ7NFo%2FiZl4wV2wHN9X0qqVy%2FFQGHEdZ2Dvwsc34IFg6mQ16Lachrlb1JC0HXdMi1g1UZvGWOcOHd1PEsmoLt6XWx67GKEZM9SR0xFQqiLCYNiiZLY%2FeVWXbTiccRWjDm5DC6cGOKwXFxBkr3STRcgLblinS320GaFrQJ2UO9o0lFvkvTt0Z7Z66VrPpSUYDvC59Hr2ecphrjpIo8WlkSeqNcQr7h9bRYRYMHGwwxitjhZKf4uZHmir34nKqRnu0TKVRD29vGhcj8l%2BeXbKF5KPZnPxBwMcI%2BwtmOzzyE90YgvAFfpNQ7EZGDiseAxaQQ1u6rq6m4cnMJXdq8sGOqUB0NAmxFofY2LuaLS%2BCjPU5n1TMzfa2YHP6pmiNYI4SJS%2B39PvGD6FA7fhgdFUojbF1%2BrmNpjBMKGjQqoTeu%2FSrEVSI80cnSQCRIv4V7RhUd619aWBl3e2b6EoZexohNJ5rnrOJJwgZ%2BuzC35Yui2HbsibHu9JVtQWHc4qPL%2BSq%2BdEdePjHamPArrDUW1KGn%2FM%2BfeuDU3kGwm2B3zw4RALs2THfFTW&X-Amz-Signature=3f99874fd28f606a27606f3aa8808d363854fd2e2dcc885b0900b84d88be68c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FXYFIK3%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB5LKsSHc%2B4X4PIZRHwGSrh%2Fy0IZ8QGhA1c0RLAbpOBBAiEAjTdwcix8ZDYGGHUOJ8PL3ZOO%2FWbirUs9SOZJd7cHVv0q%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDJg0TW7GJiPh930qJyrcA9oxUHrK5Bdt1pK38nZ8fdGpoBJERqMCJ34I5QU38SXkLmUShlgpV6BVAoNtCy1k0Cy5ALxGa8Muw7cUNWhWywAchQfDeGxjKUtKd79rsN1N68xFJXwL%2BXgRZRq1BrDX57mChqDLEC%2BG2Vsq0dRTk4nwItgWFiT3%2Ft5LAQUB7dtSIPFJgx7ry4f0SXClB7iSK1hncrtovEBna3i90fUfSizInQrlqQUoafjh2oUieMC1b%2F26AtSljFN3MzJhJQpHcLh6jHBS4m%2BOEvMiS7YhsX9uYpbpmeWC7ws3Z8cCclfwEFoZ%2BuuhLyNZqnHxHTe4dBGT8bG3AP3syo3bx%2Br3NmK8MCEFs7%2BNrKdAnQDrln9I%2BTEG5o8lb%2BTQ%2F2VCrPnXXpbDVh8R6dpAdy3qWCW2SzAWjDKapcjGhksIXCNZidyq1Nob%2BhuMJyol4CuYnPCNJxlpJDQ1KGSW%2BUYECqvxZqco7pgokstPbiA3RhDpha%2FWO9XXEkHCwLkU0b%2Bezz90weJ3KNORCl4xS7QT0Os%2FzF9rKpiqaZnJurvmyqdDigzH6LRxOdHwO31h4LidUnDRGdqp3GzPcQjcA%2BpkIYLk8djrN6aDtlMFtokwhmKYmVsiQo%2F9gWhpDBP8S1beMNbcq8sGOqUByVm12SQ6PNRKuTw%2FskFUKIBAxW9vdtjT7CoDJS0ReBzmYKgmzVR3TDBePy9jvRSMj8ae6T%2BQvLpx3elAlSAoQ84%2FhgvGkZcZBlaGCprb%2BySdLMBNd0otQTqbMrNAUaqcwZMGM8aduntAEiOhUYq4soda%2BoqMOPIQFV6T8Ir%2F47TG4%2FPHI1kRWHmQVNkpXmo9lH3wKRUpjBQSP3bePjhWlA%2BCOvCz&X-Amz-Signature=dde9284ad24de70639a729711c8d673e9f959fce17381f2c19aa827b029b8297&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EDSENFN%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB2FRIu8ANa5W7S07loCmInsMYKaanqiL3vfReOG8U9sAiAmTYhvd5Or1u5%2BRTAu5SNM4ia7DureiqPLiic9%2FWmi3ir%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMEKDmYEF6S5fi%2F2zbKtwDplFaRBieODlufnJj6IJ%2F8EOWGeEQdIltrfozTBWz3ijuwR6qF8uInC8KTjPQosliemWoWNwkox0TydGpB3mRZWiNlmKKDW%2FmdQAmJnlZcWjwYKnWL3FCrsccc293hwxeikIZ0VdC%2BOkfJkP38CMiwMGLujSckzArJNzXHB4AKCdsvI0vWwblQzzy2tAFtPmnnBcIVMXsrkpzPbNfpRBmGKkfkVJvnT%2BOvX9QNnnxTXIFTMWKAwGaBCYjTu%2FjzwuzgFge%2FSEdIEbhX6xc9AgBY6elou3gvAw%2BdtMi5J2ufNW%2BYd5qJtY8vDIpksvJaruAoB7N8gDYyboabpkSIti7SxDaJWlOkJArV5E41h9Yo37veLcrdMq0Uk8ULk2LaGu%2Fr9UCHoktlqf1GtB%2BIw3bx7JtrLpTk330Eof%2BD21IPdgMrjI1OF6aA3RakHhiJPCFST3KUS4oREm%2BYSPBA%2BmlhzXqoA8KP1b0%2BmMp4E83RVO4yY5YgdgiDjG5IN2mJf%2BBJ2dqCERKKVHLIfNWh6u3%2FUtYx61Qrx6FOCu1P14cSvN6tuUsZuMbvUQTC7RAeTDwOqiSqPsB1dhEbdZWngmXovLjFyLVrD5%2F693itRElDVSy4Fk01%2ByPJ4MKIZEw1dyrywY6pgEJwOLn25mbuuA%2F8WAeBc7xmEvrUMaCe%2FtNnl8h34XdiifUSS7UTUOXM7BMuuMJDQxMJC3XTt5o0lRg4f%2BauxE8a36bDNBMCiPYh91pcqdJOoed81f8k2Daax5KImbatikH6xt2jSsa6XrMi23dk0donrUznr%2FVNSeMBG8TKYAl0VrKavkg6Psh%2FU0YvWsek0CaKbNXKQHFzwXUw2fIC0kha9Ycwu43&X-Amz-Signature=55649d9609034b25acfae8052f8653da26ebe477b52d63d1b8c6104997869019&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EDSENFN%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB2FRIu8ANa5W7S07loCmInsMYKaanqiL3vfReOG8U9sAiAmTYhvd5Or1u5%2BRTAu5SNM4ia7DureiqPLiic9%2FWmi3ir%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMEKDmYEF6S5fi%2F2zbKtwDplFaRBieODlufnJj6IJ%2F8EOWGeEQdIltrfozTBWz3ijuwR6qF8uInC8KTjPQosliemWoWNwkox0TydGpB3mRZWiNlmKKDW%2FmdQAmJnlZcWjwYKnWL3FCrsccc293hwxeikIZ0VdC%2BOkfJkP38CMiwMGLujSckzArJNzXHB4AKCdsvI0vWwblQzzy2tAFtPmnnBcIVMXsrkpzPbNfpRBmGKkfkVJvnT%2BOvX9QNnnxTXIFTMWKAwGaBCYjTu%2FjzwuzgFge%2FSEdIEbhX6xc9AgBY6elou3gvAw%2BdtMi5J2ufNW%2BYd5qJtY8vDIpksvJaruAoB7N8gDYyboabpkSIti7SxDaJWlOkJArV5E41h9Yo37veLcrdMq0Uk8ULk2LaGu%2Fr9UCHoktlqf1GtB%2BIw3bx7JtrLpTk330Eof%2BD21IPdgMrjI1OF6aA3RakHhiJPCFST3KUS4oREm%2BYSPBA%2BmlhzXqoA8KP1b0%2BmMp4E83RVO4yY5YgdgiDjG5IN2mJf%2BBJ2dqCERKKVHLIfNWh6u3%2FUtYx61Qrx6FOCu1P14cSvN6tuUsZuMbvUQTC7RAeTDwOqiSqPsB1dhEbdZWngmXovLjFyLVrD5%2F693itRElDVSy4Fk01%2ByPJ4MKIZEw1dyrywY6pgEJwOLn25mbuuA%2F8WAeBc7xmEvrUMaCe%2FtNnl8h34XdiifUSS7UTUOXM7BMuuMJDQxMJC3XTt5o0lRg4f%2BauxE8a36bDNBMCiPYh91pcqdJOoed81f8k2Daax5KImbatikH6xt2jSsa6XrMi23dk0donrUznr%2FVNSeMBG8TKYAl0VrKavkg6Psh%2FU0YvWsek0CaKbNXKQHFzwXUw2fIC0kha9Ycwu43&X-Amz-Signature=e8aaf24623365409df0c537fca4db0370dd862d0db0c88ecc7bd716d976c1547&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662767QJ6U%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDfGESKY%2FihXMlpjBELondEKRXnDFlQ3rjLIPXwQZ3rCQIgQ2QBYI23MdKFuCJhmXbTltU9h4I08Fs4W72a%2FHRyEWQq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDHW%2BItcTYjLmUSGesyrcA2%2Fx7U6iKLqLjqroDuMGHVC%2BOrVz3d9qDnEeDiwtOu%2BFyGJuJvLYxN38Bbz7Tcj%2Bk27q%2B4p%2B0fB3cjFFhgOHD%2BK86QEJ28UbKD%2BUOv2ivb5pCIrw1vVoSbO8y1Db5p80wwHp8AJasgD2LMe8ZQn8t9dSWzAhaT9HyHBKREnwudiLp91IYXSYz%2BW5YYGGYWumGL3u6X0wo%2FaPT4hrOxonST6m%2BkIX8Bw4sHa%2FnFzyPpfCKwjL4zYJ2k7wRELzGB5g3qTAj4c23gfQ7P04pI6es%2B47yS0zF11dh0lX13aPPm0TDoZSANcoejrc4UdwiF%2Fv4pHzcrfVPVm109j6AHQ3n%2Fc0QQaXm25tWZ10fGTgz85JEsBuzOawT8y50nrbdCNU5a779SM%2F7Ndk5vQln2cpxCFoS7cV8LwAtSBMyELcbH4wcMkewlIBB2Y7s%2B%2BJFkICs81mT7iSs83h%2B1983NXerxC9PpDhxy4A755UiXqwJSD8p3p%2BVf8IEN34MQ3p2UlzfFHbTEknma05ZJo0xE5aRXhBYiLFn%2FHQ2QLdLeziZIabGo1WoEc9SqT4DypknA7nfmKYc2JqaQQEGoW5MKXDMZnvPuxA4dR546IFPDkMJYR4H0UJcm85McmU91k2MNHcq8sGOqUBuxkgFrA6piAzc3lC8Cy3I0La2Yv7jSrTRKVpArPc8WQzQDy9JGhxa1a2sF4eWTaHI2u0yxnJxg%2BcKx1jVAxKZT7QChAVwJ2SYqlozug0J0%2F%2FNouKpi53ayAWC6sZIe3sywDg2rVJGXK73lvPhDeYM0gsLB37UxckAuD2yFSQpEWIcnUdAOv2F2FfZofwKFtFY5cjupV0J3uKILT0sgKuPcgTm%2BwZ&X-Amz-Signature=187e16c1f01a4593b5a91842904c42e234c9fb81e30b07d903007f57b82ed90d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KLLA7G6%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF7ogFbxDkcFTw6%2FlNGDfHO%2BAXHINWzsTUdWGoj6p4uwAiAiHcXaDXZQ5Irb2F3vpbr5MEyx%2FHX8vtIfEnmdAlq%2FwSr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMEA2y0X1nhyR48JTfKtwDRIGgurvF1Oz0CJ6WhxvOiaLMCZNX0U5ovxETTwh2NMj%2F3j2xePV16Tap7FIqNUJsLfIscxeHogOv5CMLC0qkSnkXnNM4h4rc%2Bb2wizPjSCml5r%2BWKCZ%2FIUa4sj4YmvD6UwLN4Lg5eyPIMa3q%2FCPJeJU8SKccHcger1RL8qw7dsN74gs9gGqjtNVZZTI9htaMoBGf5XtjZGHjwGgyGorAahRwbXN7jeZdL0mRV8tm14fOUfD0eFXzYhAjGKf9Sc4orbDMRj%2F4UvxrcULiec2hdRXTI2d1mD%2F1o2RHSHBCZj%2FZYTAk9iQE43hZbHuG1akuE7a4Nz3qO9iVlEQtKbYeB5NKHZ%2FE7dz2ej1h2ZlUna2pxfsYo1oqTICD%2Fdoitad%2B2qLweA4N1nCNjAqzWhIuNvocgtI7R%2BfJHSkQyGcxdH5tgzVGMsPrnNjvw8VMorRNiyCvrSy8TyUFYS5tv0%2BgE4Oee7j5Q%2BOrUVeL0dobtXdPE8VsHDR8AiZnglFsPZlitLCian86h5WeSdbeXNfQAOoJ7NtkCMgsmhONhzT47Yd31As2cdGvncrE6Pj6Q357RedB5FMigge1kk5FeAe%2B7fSY97M4HFlbOXIBEvB%2F%2F%2Bc5OaRPcHk%2BCxf11skwhd2rywY6pgEgRng1OKnGAEorCvPodJGxSpVvMj9qHxnlEkpIkFXedGWZQMzlB%2BvDwVZhN%2FKwxszNt%2F7BpheS7bHw5j3xq%2BMcvUEbfHzXD4SVCyUtfdXPvtRuVGhGMNuDczoUcTKkwugybhWdrQyholRi42YX9pbfxL%2F9tNAJgyGs9FTE5sWulLi7ZfyakdgWSTs5okhlPrSNpERhU%2BdgbOb6Jb3Ykn8l0cBNlCC4&X-Amz-Signature=d710c0f0513ba1789b1a998d1e77d9324635dd24d8e825baf7b9ea3fa4d919da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZC2GDK4%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEU%2FBvgZzBqQHt9neLjvtdS%2FCfttgCyis%2FUPTN1YMDG4AiBocd8v0uWGvcuNoWPsM0PjAOPdc2D8le3YhuH9Mh4kFCr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMF90NOeBov%2Bod6NwnKtwDMX0MiT9JIf4jfuDol7pUVx4MPU%2F9ZyMl7ARbxH940t%2Bxikw86J2xkbrGbjSEuD67NrQc7Wn6PHS0d8opokRGSlnDpms9pTvvDm7l4V9qFUVYyAJN4BlMgFrgfbc0GhjiigbK%2FDx3%2B00TToz3hTGMrxyhrL0qCUMMes8NHkVE15gG91rcfGbYvfzFBxBbOwz%2BIe4ao58csQJ4QiB%2Fp7x3WDzpIQeyc%2F%2BPAQrZRDCqk1CzYJOHL7Nl2uobc4nF5qt8F0urFEidnSpozRegzSC7devHt4toG0oBomEnhz0DNCnwIht9Y62cXjq%2FVImj06DD%2F2cE6OTE4dB1erTL%2FKzXbdaItPF5Wy%2F4VvNeiz1yCD1NS8QVm4T5EXiGvBWZgB2ZxkS36eqvnMtM18j9Oz9qWUNHCbqsnL3w9Lfo52RtWG%2FeLl0ivG4Ec92P6nOuJTLadTTVfNw8EvUtmT1snbJRmRn3svcON4fBXs0PG0Q0%2Fd3hQI8RIXedqCJDEopK6JLh4hKWYQVq1g%2BD3vMyKMTKhontAky7mN8URPu9bRfKvDaTj3sjISu%2FzhuTkNG7RvI3ygMKMHiMYiTG5iIv%2BxB0ak4VCRASZ9gNkRNo5IuhiYcHgK8RV0haoEG6lGMwhd2rywY6pgEVMvYAY8eqIzJCZsb0zyNkbbuckU%2FPc5bznV8mAoJTRsolHM0oW6QlKPg7P%2Fk%2BWz2aFQnsHjukCh26MIV%2F2mc7%2BRZ2P9eaDzJgxW9I1Fu7QY3i9pDJ1F1KKy9m3RygeKh%2FdQ950q2B661sMXiyQpV2%2FZ6GWyAPbuCNZ%2B%2FURnN7pPrmXBNBABhxeF8Fvc4X49kF4eEEWu3B2HyBJjMrczbN8%2BNXmDek&X-Amz-Signature=b0b16347e0490fc81261f21f97acabb0dc30e78600f581b64936ce1edc893b13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EAWWEPX%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB7KdxDo%2FtsOJsVRihVw3dJsqOrv%2Fh06%2B2tTUHLeapYQAiA9P5L4Dkm6HwDWsdNgdjYDSdT365jA09QOM1Wc%2BaWXTir%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIM60gjBgcSsOPgd%2B%2FbKtwD45vk02f1bY6MEss9LFobLQcRmAfOrmgGt6bGRG0vBTsABU7fGRBS6u2VVMKRatQfYOeMbJntyeiuKBFJdj26hILDP7GN8DOHXoWVkFuLhKaNBue3kzaQUGEFuIhftYcnFnD8WAmwusL%2FFlzXQNIWIlE2OCfg79sI%2BeOgRv65hxmD%2FJcXu0LhVHtXmOnDUZgozBvBFrlJ%2FhJmfpDN8cM%2F7%2FxfhAghEoIPP%2B46dzVlHehEtvkANe%2B4c%2FfO9gXpLDDMsTihgF9r%2Bnr5ABCUf3iWYr4bGrEKOncOVNWSJONg2ItpawdAQmCkYKDrSr%2F7cERRt7gHwjrgOHzhlgS4CazUyUN0zmn0aqLTqjU4WDoz8sGR9sI1zTnn5EjVBNI6OKnBRGj036gxVPvtSlFcSNEh4ZqgwTeoTFQYGooyGIQ8U21hitxX7xRAfxp9wklIpEltYxXDDRoR2AoetzIsdo04v1%2FO5Zl5Kg1S8q9x%2BCK%2BwLn6bpelyjoTg4DzwHGy0M6KliU3IZKtDy9zkVPCVExcNvTiymvt3bfWTXmrm9MDFG1V39%2FtGThR%2FDy4Bslyh0DARef2BcIrY0lHCLN4XELShRnRHV2z%2FGGlg301tp2wZGBg16cfoGWDwv7nW8MwsNyrywY6pgFUM8v0IhGdXLbqn0yugqXReiitSO%2B28F%2BGT8lxAeCjeWabxg7BrzQNE8PyykVTgsx0%2BHuS6b1uvTTQfjkERY7dUvMAjWCHYlcSXtZk0DObdHz1gas2nDmxIkzX3smYvKl83GlWxpWW8c2Z%2BVM6TSOa67QoTiNyKriQPtH3cFfygROOR1iu11X4b2WsKetQx967oDYbL8mCkgftf9hT4v%2FJWr9dFqEG&X-Amz-Signature=6f15bb799cfb169dec8f21a30bf32da5de4027d304b0691fb85e1c2684cab988&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EAWWEPX%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB7KdxDo%2FtsOJsVRihVw3dJsqOrv%2Fh06%2B2tTUHLeapYQAiA9P5L4Dkm6HwDWsdNgdjYDSdT365jA09QOM1Wc%2BaWXTir%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIM60gjBgcSsOPgd%2B%2FbKtwD45vk02f1bY6MEss9LFobLQcRmAfOrmgGt6bGRG0vBTsABU7fGRBS6u2VVMKRatQfYOeMbJntyeiuKBFJdj26hILDP7GN8DOHXoWVkFuLhKaNBue3kzaQUGEFuIhftYcnFnD8WAmwusL%2FFlzXQNIWIlE2OCfg79sI%2BeOgRv65hxmD%2FJcXu0LhVHtXmOnDUZgozBvBFrlJ%2FhJmfpDN8cM%2F7%2FxfhAghEoIPP%2B46dzVlHehEtvkANe%2B4c%2FfO9gXpLDDMsTihgF9r%2Bnr5ABCUf3iWYr4bGrEKOncOVNWSJONg2ItpawdAQmCkYKDrSr%2F7cERRt7gHwjrgOHzhlgS4CazUyUN0zmn0aqLTqjU4WDoz8sGR9sI1zTnn5EjVBNI6OKnBRGj036gxVPvtSlFcSNEh4ZqgwTeoTFQYGooyGIQ8U21hitxX7xRAfxp9wklIpEltYxXDDRoR2AoetzIsdo04v1%2FO5Zl5Kg1S8q9x%2BCK%2BwLn6bpelyjoTg4DzwHGy0M6KliU3IZKtDy9zkVPCVExcNvTiymvt3bfWTXmrm9MDFG1V39%2FtGThR%2FDy4Bslyh0DARef2BcIrY0lHCLN4XELShRnRHV2z%2FGGlg301tp2wZGBg16cfoGWDwv7nW8MwsNyrywY6pgFUM8v0IhGdXLbqn0yugqXReiitSO%2B28F%2BGT8lxAeCjeWabxg7BrzQNE8PyykVTgsx0%2BHuS6b1uvTTQfjkERY7dUvMAjWCHYlcSXtZk0DObdHz1gas2nDmxIkzX3smYvKl83GlWxpWW8c2Z%2BVM6TSOa67QoTiNyKriQPtH3cFfygROOR1iu11X4b2WsKetQx967oDYbL8mCkgftf9hT4v%2FJWr9dFqEG&X-Amz-Signature=2e035b3017b7add87d51b30d075fec34c9f4f045a764bfd71730cdb8e62f19e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ROKFSTHK%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024257Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4A2MZ8259MCZczXPeWTdT1GmvY5SPrsE2kTPXReeLngIgQsqGKj%2FNXqM0PDzhQTjoHwEPvd9r6rHxOSVcndCbug8q%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDA5k9MqOW%2BBEsLKJyCrcA%2BoKOcngbg2J0mohl0iLgINWIWKSgEahBL7e%2B2wkvbcaT9LbxtidiIzY%2B4ZmpFY9qodA2jH3MNX48RDkLuPl1SsplIiSWLK5RdKAKt49H66xeVBcwonKSA2CF9RDfBwhekUYW3YseOGzJ%2FZgMbnsDJ3aActbe5v0skNiPkmvc9tJC2NXc9PfqPRNyrIcwu5vwMiu1plYWpVh3Mo4Eq1sQddNP7qoG4Rt6viRRQr7WGybfx4MlrwOEoSt4TDY0qLCqgpqJiRKrakpYxE3kP2MBOhNkWYXMuZqVeFgr4Ayzsm5K%2BG7%2FRbKSLhrf5dn8twuxnFVH2DGdaBp4TSJPvs3N%2Ft%2Fyk5IoPbeS84d%2B1OulaORR4UleLsHfukfg0YCVeWTrYMrIjhXsK%2BMJ8T3SAmpOOnAVdJQokdXiLcdp2TwztT1tZPya4BcIV%2FdL6upHL9Fxs0%2B81IF61KuRSqmW4ClW7%2B3vyVE6h7paNyz3yDbLgn2Bq1BDTN8l%2FCXz2R5SU6DnXisKimWFG%2Bfb5mjiA1PcP%2BlR9zdbrKkMAu71XZiWaK2PgaR71dNraz1Y%2FMMUYM02wQh%2BNcEuZt8feY4mn9DbM3XH225MqNErsSCgj9GiHW402poMncfi3bNYRNKMNDcq8sGOqUBnd0UtBvSAJ1kAu%2F9x471I7%2BXA6XeWR2SM6lFOpLxBZ5Cp5nYPlykycGxOaXJw7%2FztgnVoSHWFEqyXe1Pg7auqIsbpEdwKSuI09pCktxXs%2FQCviO75KHQRKwPkzZA9btd0osqgCFEcRlhmpYFJ%2FHqOB55jxN0jdunArIun22suxkeHnYYCBppUE1Y%2Fnwt4aZ8YiHp%2Fp%2FtZbsuZJ70Nizj4hU4PT%2BI&X-Amz-Signature=d63ad97b23eba0351026034db11747804714d840079932b6ca12037c43122acd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KUQ2BVI%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwtY2kRMWrorMEe6aGMjeAmJ6xpoXMGPSlPyNUeUHKIgIgD%2FddRaqhlNhmNukAl0iJtTWoG0ulz2qSKOtcz035ckMq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDNbEOC6217DTj%2BZ%2BMyrcA7PLlUbI3Q5rgvky%2FXPhAFO96jZmV4Mly6hqy5Wal%2Fbna2lT3qrEKDCitUbzMlZUjqNKhTJLvnFCJj%2B%2F7s6vWZ%2Fb6UXJxay4lx8U5dxSZeGP%2FDPs6IXOw0anxMGV2RSjyL40Pbz0o3uAVjtneNrQzUrZ%2BR2vUyfbiUNILaqhf6CpTDkQpv5BDaAyziXS9a0gF0qi3bhUpVGcNbBvGF%2BOj%2Fuu7yHZOwE5tQJhHvudPmDw584fmKR1VveK73XNEXdqoiEgtCHNAXUP6dmRLAZ0gb3OIktjQeWYWv%2BlsZqei8dNNHstb73cT%2BndAhwzDfMgsw4N8f6p0jF1spD2D%2FgrFy%2BWNCNeiF1gYIgeg283o3hlK6Q04pqjbI3SwKZgGqlNKXNPG76OYDtGXz2urvRS4NMjIJ45Aeu%2B55mAmIgxgqWOBpU6on3%2Fu2tpF0gC%2BaYZXZfD0fvMzQbSuhzxwcERqDynaJTghQwDlHo5hBgJ%2Fgo5OoLgyGy%2FSvS1QfaYfjBB9hT2PsX096QEssVKLlJ%2FJXeHewxj20upkCDNkesIeLvaxJXMDnxq85VzdMQQdyxUptyHUXxHz9CQyJqiKLf55bUgdVnsWdBZLpLWL2RRNx65K4T%2FrPfLiO4uxc11MOPcq8sGOqUBD0cjZwvsYzdMUvG%2Bg3Hy08plzNoIm1wdCfxlkYERmVvQMVikZTCy%2B%2BbbPP%2FnanTUHZIdDm7pZyAu3JGPSHxkSBmpNZZvxOqpcJ%2BZXTFKcBEkwiVN1Gso4y%2BPkbw2V1aPG%2BGfD5RzayAv3RUIqrgztGKA%2FnnJ8PK26XDDZsvUXb1xJl2WMVeuWCNGlLQwPow6VFs1hdDoaawYGTfarPTCB%2FRRTjBn&X-Amz-Signature=f05f4b87e6c8285b6a0e63c9e79a6f43a52c121d143f9c4edd6e10052d0d2521&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KUQ2BVI%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwtY2kRMWrorMEe6aGMjeAmJ6xpoXMGPSlPyNUeUHKIgIgD%2FddRaqhlNhmNukAl0iJtTWoG0ulz2qSKOtcz035ckMq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDNbEOC6217DTj%2BZ%2BMyrcA7PLlUbI3Q5rgvky%2FXPhAFO96jZmV4Mly6hqy5Wal%2Fbna2lT3qrEKDCitUbzMlZUjqNKhTJLvnFCJj%2B%2F7s6vWZ%2Fb6UXJxay4lx8U5dxSZeGP%2FDPs6IXOw0anxMGV2RSjyL40Pbz0o3uAVjtneNrQzUrZ%2BR2vUyfbiUNILaqhf6CpTDkQpv5BDaAyziXS9a0gF0qi3bhUpVGcNbBvGF%2BOj%2Fuu7yHZOwE5tQJhHvudPmDw584fmKR1VveK73XNEXdqoiEgtCHNAXUP6dmRLAZ0gb3OIktjQeWYWv%2BlsZqei8dNNHstb73cT%2BndAhwzDfMgsw4N8f6p0jF1spD2D%2FgrFy%2BWNCNeiF1gYIgeg283o3hlK6Q04pqjbI3SwKZgGqlNKXNPG76OYDtGXz2urvRS4NMjIJ45Aeu%2B55mAmIgxgqWOBpU6on3%2Fu2tpF0gC%2BaYZXZfD0fvMzQbSuhzxwcERqDynaJTghQwDlHo5hBgJ%2Fgo5OoLgyGy%2FSvS1QfaYfjBB9hT2PsX096QEssVKLlJ%2FJXeHewxj20upkCDNkesIeLvaxJXMDnxq85VzdMQQdyxUptyHUXxHz9CQyJqiKLf55bUgdVnsWdBZLpLWL2RRNx65K4T%2FrPfLiO4uxc11MOPcq8sGOqUBD0cjZwvsYzdMUvG%2Bg3Hy08plzNoIm1wdCfxlkYERmVvQMVikZTCy%2B%2BbbPP%2FnanTUHZIdDm7pZyAu3JGPSHxkSBmpNZZvxOqpcJ%2BZXTFKcBEkwiVN1Gso4y%2BPkbw2V1aPG%2BGfD5RzayAv3RUIqrgztGKA%2FnnJ8PK26XDDZsvUXb1xJl2WMVeuWCNGlLQwPow6VFs1hdDoaawYGTfarPTCB%2FRRTjBn&X-Amz-Signature=f05f4b87e6c8285b6a0e63c9e79a6f43a52c121d143f9c4edd6e10052d0d2521&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466636IIGBC%2F20260117%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260117T024305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCX%2Fzp1%2FCxsR9%2Bm90oVhKBnzxBlfjDGvmezpxZyonEgnAIgPY%2B%2B5AW7MC9KCoQ1bMI0rcMjX7k%2BC2bz09m6EGyg9gEq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDJSUB%2FQ85JLVBaEkWyrcAzq83VmVCvbkQA%2F7APV8rdcMhwVK7viRZIKDTmsyzS5ghSzaRcnLukUJ%2BIuHZ3v9021EHKsvVN244jxXBV%2FgcA3hHUZMQ6Iugds%2FG6wd7h%2BiRO5MOb%2ByE%2Fw%2FSpwzfOe5vAXgB5PtWGDw2o0pjGTPFwsLWA4ophAMmx0PAju%2BeQFFOnZDg3d9M1aX3y2MGrtzwObj61%2BrAWEqgG4AoOkcaoqYzE3lXMEwDs%2By8inPsPD9ebt1I9DnA6hNvvKvl8Z4iRaNBsN5%2FA38IxC4Oi%2FI3b8HiODLunTxTT7N6q65kkOi47pbhgHGgAQUpf%2BBDkDwJHMtHkE%2BQf7rxdy%2FXfJrVMWGHGunf3RY%2B%2FZv0Zb%2Bn0F61pESBKjafCdJLD2K28aoFK8E8Xl5DjJnsAlWRQVASQDH%2Bn%2Ft9ngxq1opli%2B3lGUWA9ohgX%2Bvd%2F1fELsYDutUcEClnQanHRwtj6dbjXCnXuhVl5eGbUYnZJRXV%2BciMrAKiPWUsyPXVrHq9IiutqN%2ByXBtnVduaSX18cS0hyaV593JSDPwsSfLXWuo0UP122XRYMo5NPl1RrXn4In5f6CrvMKO2uNxeqOHE7z%2B04sbt1bUXDHrKENwTHkojYUETLHk49vGIHEhafs9aNQ%2FMIXdq8sGOqUBYn%2BAdmNhMf3lSBqW9kYxJoHuvR%2Fe8wsokz47nU6OUDdIAz8%2B9%2BfRvCbe73hnscwd3f4x%2F0JwPc01FrneLJnIRBeKlicrzpgY0%2BOc7aQ8yDerhg9XoMZfTorSWrc4tQpnUwdPxuxFExvsiqZcWal2LHfu269CreRpFZG177rYMUn%2BR3jAVHlG%2BMuSbEpkF2e43USJ72%2FhnCKS2ftB27c%2BXxBsQ6W%2F&X-Amz-Signature=7c9e458aea8e73043281792fd8fdafd77dddf97a7c4c3b95b6f2e2b7ea93e95e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

