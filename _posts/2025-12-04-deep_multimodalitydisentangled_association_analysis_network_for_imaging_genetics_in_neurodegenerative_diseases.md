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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEMBC2CB%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIFXbkBayAwGBYVTl1TFQjuEAzMxeBixTSjdj7oFg2WPDAiA1LY2vJLn4mP3hi052h77ott7eCxUe60K3JlqGGjcX%2Fyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMMI3Li%2FPwgjMGMVApKtwDJyWjul8TAo7WSeIMu2oOjPagu9qydTccIKKCFKtmoO3nGfUx%2FY5y0iMyeZ%2Brs%2Fsw0AWIM8U7XMOQpoZ0mGaX%2Bs%2FlslDxU3kE39zZ03x1AHjHKhFVrPzNJM2IfstSI5%2FkHq%2BOTAZjFMNL1%2FGlqneJf8HJJJf8HsdVkgtQV3IG5M2gWup9bi97Wkx6FYg8DKcM6rgy8Em5Hl%2Baygq57Y08i0mFrLcXdwtu8zxfoEUlFA1JJYx41oYEPTPLjaNkJmq0eJ2p7Z0RNHVEsiY1elIu2wqXLvSFGRYA3S7QD7Z4VS62lSxDylcuTbQgFinc0I8nA0xRoAoAJ%2B%2F18ocA4InAelid2hc33bOjXbDJinrEydYBmCY05pOcKxUAdzBmRxaW9JyJcv0Om1CH62oVmiTq3lntNrHMD4OGZU8DJBQ6AeqxWsJ%2BGSOIhtzt4PSDaZvDfh3qmX5R0Q1ONWauZgT399eu9hNWwT%2BeYB6pC4ooMvypCb63%2Fkw3xFwHQffVNlK9ACyykEjfapLGS3P71EhBDrCP%2F2TznEvTlqLKX6TzSVmJGi2awfx6O%2FUHFZ9Ks1Eg4xCfBnsg6GM1ukc%2FQ4OsXapDL4TvOLYUsb6V7H3zkGBvajyZpV3ggYd5iycw04vjzgY6pgFDnx6SLuYjSCq6vcKrKIHq2ICz18AX8zoW%2FLXGJO4tUUiXK%2Fb0to%2F5tIIp%2BInWgIOdYp3GCmAfgjMiXJojJz9aE3507zXo%2FfFtvdpC83rURD4fkEaYgfA2m%2FMLFYBgtiMQKoltsuncNJDtjQ8dJ%2BR7QnKpHP1DxPQw2wrLnEqN7e4BNqky3HoGYrBAydTMfggCDn2Qf%2BcD%2FzhCCtIfn3fKVRby3AEe&X-Amz-Signature=b763bdaa77f26c55c778a1e84880ff596b0e1ab0e6ce5a8b918dd9da18436c0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEMBC2CB%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIFXbkBayAwGBYVTl1TFQjuEAzMxeBixTSjdj7oFg2WPDAiA1LY2vJLn4mP3hi052h77ott7eCxUe60K3JlqGGjcX%2Fyr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIMMI3Li%2FPwgjMGMVApKtwDJyWjul8TAo7WSeIMu2oOjPagu9qydTccIKKCFKtmoO3nGfUx%2FY5y0iMyeZ%2Brs%2Fsw0AWIM8U7XMOQpoZ0mGaX%2Bs%2FlslDxU3kE39zZ03x1AHjHKhFVrPzNJM2IfstSI5%2FkHq%2BOTAZjFMNL1%2FGlqneJf8HJJJf8HsdVkgtQV3IG5M2gWup9bi97Wkx6FYg8DKcM6rgy8Em5Hl%2Baygq57Y08i0mFrLcXdwtu8zxfoEUlFA1JJYx41oYEPTPLjaNkJmq0eJ2p7Z0RNHVEsiY1elIu2wqXLvSFGRYA3S7QD7Z4VS62lSxDylcuTbQgFinc0I8nA0xRoAoAJ%2B%2F18ocA4InAelid2hc33bOjXbDJinrEydYBmCY05pOcKxUAdzBmRxaW9JyJcv0Om1CH62oVmiTq3lntNrHMD4OGZU8DJBQ6AeqxWsJ%2BGSOIhtzt4PSDaZvDfh3qmX5R0Q1ONWauZgT399eu9hNWwT%2BeYB6pC4ooMvypCb63%2Fkw3xFwHQffVNlK9ACyykEjfapLGS3P71EhBDrCP%2F2TznEvTlqLKX6TzSVmJGi2awfx6O%2FUHFZ9Ks1Eg4xCfBnsg6GM1ukc%2FQ4OsXapDL4TvOLYUsb6V7H3zkGBvajyZpV3ggYd5iycw04vjzgY6pgFDnx6SLuYjSCq6vcKrKIHq2ICz18AX8zoW%2FLXGJO4tUUiXK%2Fb0to%2F5tIIp%2BInWgIOdYp3GCmAfgjMiXJojJz9aE3507zXo%2FfFtvdpC83rURD4fkEaYgfA2m%2FMLFYBgtiMQKoltsuncNJDtjQ8dJ%2BR7QnKpHP1DxPQw2wrLnEqN7e4BNqky3HoGYrBAydTMfggCDn2Qf%2BcD%2FzhCCtIfn3fKVRby3AEe&X-Amz-Signature=b763bdaa77f26c55c778a1e84880ff596b0e1ab0e6ce5a8b918dd9da18436c0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VB7C3ZH7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJGMEQCIBpvtmflpRkpBwS5cYLAT60wD0g3vU9r3Rmbbwzjjf1JAiBVJly35rEldTNmvOdO%2BWQyd7s7Q6Xmyj16rn%2F70JGB%2FCr%2FAwgrEAAaDDYzNzQyMzE4MzgwNSIM7N6lkYBSpSW2dq9vKtwDnfIpSxBg3IGEH%2BTYoW3fKq1jNgfQwltH%2BJEdo3Yhlp%2BQw0w51HyeqSZQJ4MFUi2E4Xr6rYbxIFEgtQVKd7oAMbJuJTqfAeh2ADQpGplohp%2B5JZswgRItElybSXk%2BswdjQu3DsIE%2F5e3ziKIiLYXSdq%2FU3VhUyjohPJOMhbx3Egv95sAZVewzoIjEOG68lEnPmgMf5VKugQul%2Bn35uAKBJMEQ3yk%2By6BiWRvAhSV9yNeqcfM2usnO1lNqNI%2FP3d90sNNF8pKotrjdYqZX5AM0fIEKwezxKBW4vFJmkQ0OJkrFcNOYQWl4DWqET80Dn4B1BXWxmKZEJrakG6pJobBFoVm0NmBLLvWGn1aKRuCAJuxC2YcV%2Fr8FJ5Qk%2B0DznxKrhvpFNUrr29TJ%2FbyJSGAN%2FhtXnJXv6CWGTp%2B%2BaO8OjchsW61JxbY2JUxcbx8yS84j2T3EK9Bp5yUXMH37p5qyBtUZJc6mEeEZBP1mAQ0g4S%2FrP2RzK9KwY6z5HXK2%2Frb49xXPMAWkDIi7fH8QsAWRkDnpuCC3GyLrBgOva%2BaP8qEm7mNDxg4OKSKtKfDQGKXOjDFRrqZukYcx4j55KqqaE74dEks4c7Ry5knv8CeJwg3qWWlwGgqzpxxuE0kwzYzjzgY6pgGGt%2BsfxbA9UXfWoZo9am50aBYxM3flV85aLCnjV65YNYmq5Cq5f5cai4KFrNXMonyxdBERzfMp6YtLdsAt8SFTWyvO%2BhOYohEFIRFqM1R6EEZhA4fLu%2BijalDv4i2LoDrTNGt6235uzj8A%2FshhPxIkduifvFlnIlCJgWFIs%2BxgQhh5u7khhIdMb0bzdM294mDrZXsIreGUN3IIZ8R3dNzb%2FbztfwQd&X-Amz-Signature=dbac948a7132eeea95a9116b0456561f0a60ed1ac6cde0470cdf59eb39b081ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T653EDCC%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQD947fsWVr0WzfWslmlAt0z%2BL4jHob8vMbKqYJyAnPAwgIhAPawbKoR%2BJMgIcEnSYUChQ%2FQzDYIpE7G4LyUKt1tvKL4Kv8DCCsQABoMNjM3NDIzMTgzODA1IgxmQrXUGmTG0Dk%2FpNEq3AOjk9uwLJb%2B6oiiIWmSlCnd4z13v8LDkw6PxUB5P%2FZVU0rO9nwyLn0cuHeFU2JNCfqoX7EhxkuZoYyaCq7agTjNdxt6vPhQqgPxA4mW5h9r9iGRaJzv%2F88SQwBgg2M9ZtTGMKIrdYiv3DUrFauyUwyr7UiRcIPgCYlIAXFiDDe%2BcduxjDsX4iDpgS9RaC2%2BMYB0ehk8v1eJaF%2BfTKG1AG%2BawCuaNipHC%2Fvkr1PNDXveXq8rKjz6KcKfWvXfJ2ip5hwc1%2B99dvPJ2O%2FHJHyATUfcz12CmZfxTaVBPKItthS6s%2FWK0z47wd4o4KTMzoCjQhIW0GqKZa3Jx3Flx0Jl6m8wxK5iiC5hVG%2F%2FoU%2FhzfGHa93ZecJZ22kGwaBxNARe6ZWo1u4g5vkR8EVjRIupn9SSJq9B0e3dmSZ%2BeXhFTpUuz4YefNRGGrAQG%2Blh%2B7%2BAeKB6tzcAxGdL9NqL89U%2BPBdZk%2Bj8GCzk3G1%2Bw%2B3aaAN65lZjg%2FODYyguMcwkP1hpbQi2J%2FESF%2BFiq3uM6OZ6YdWMI9qzzs4TUAsT0IFwi%2FqkxNXZKvh%2BtNLDVRX5H%2B9QmGOV9mQxYxFbIDguxIdGWZsqksPIubwrrWhqehAA4hDuJa%2B1ZUPaFAUBEFjuWjCViuPOBjqkAX9zdGHnoPqa7U3mVaqbk3vG%2F%2FcQ%2FQbrI7mYavb90wEudE8noHEaqtzhmPOI%2Bs6LqZMTXkm155RQDGBvqR0o5THC%2F1AG6aRx9tQSzPMPuGwv1zMVfNOJz2X%2B0uhU9WJyMCHvyDxHtqM%2FgvgaRdH%2Bv0vMiAgza5POkWMchW92sDaFKIwNSVuGWqdheLNMpcHSyBosM0tMLZanLkNr0sLeY2evqp0L&X-Amz-Signature=ec8bf18e63ba0c5a3d5a5ddfcb53b7c974cf88f0fe11b6d60d9113bbec02fda0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T653EDCC%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJIMEYCIQD947fsWVr0WzfWslmlAt0z%2BL4jHob8vMbKqYJyAnPAwgIhAPawbKoR%2BJMgIcEnSYUChQ%2FQzDYIpE7G4LyUKt1tvKL4Kv8DCCsQABoMNjM3NDIzMTgzODA1IgxmQrXUGmTG0Dk%2FpNEq3AOjk9uwLJb%2B6oiiIWmSlCnd4z13v8LDkw6PxUB5P%2FZVU0rO9nwyLn0cuHeFU2JNCfqoX7EhxkuZoYyaCq7agTjNdxt6vPhQqgPxA4mW5h9r9iGRaJzv%2F88SQwBgg2M9ZtTGMKIrdYiv3DUrFauyUwyr7UiRcIPgCYlIAXFiDDe%2BcduxjDsX4iDpgS9RaC2%2BMYB0ehk8v1eJaF%2BfTKG1AG%2BawCuaNipHC%2Fvkr1PNDXveXq8rKjz6KcKfWvXfJ2ip5hwc1%2B99dvPJ2O%2FHJHyATUfcz12CmZfxTaVBPKItthS6s%2FWK0z47wd4o4KTMzoCjQhIW0GqKZa3Jx3Flx0Jl6m8wxK5iiC5hVG%2F%2FoU%2FhzfGHa93ZecJZ22kGwaBxNARe6ZWo1u4g5vkR8EVjRIupn9SSJq9B0e3dmSZ%2BeXhFTpUuz4YefNRGGrAQG%2Blh%2B7%2BAeKB6tzcAxGdL9NqL89U%2BPBdZk%2Bj8GCzk3G1%2Bw%2B3aaAN65lZjg%2FODYyguMcwkP1hpbQi2J%2FESF%2BFiq3uM6OZ6YdWMI9qzzs4TUAsT0IFwi%2FqkxNXZKvh%2BtNLDVRX5H%2B9QmGOV9mQxYxFbIDguxIdGWZsqksPIubwrrWhqehAA4hDuJa%2B1ZUPaFAUBEFjuWjCViuPOBjqkAX9zdGHnoPqa7U3mVaqbk3vG%2F%2FcQ%2FQbrI7mYavb90wEudE8noHEaqtzhmPOI%2Bs6LqZMTXkm155RQDGBvqR0o5THC%2F1AG6aRx9tQSzPMPuGwv1zMVfNOJz2X%2B0uhU9WJyMCHvyDxHtqM%2FgvgaRdH%2Bv0vMiAgza5POkWMchW92sDaFKIwNSVuGWqdheLNMpcHSyBosM0tMLZanLkNr0sLeY2evqp0L&X-Amz-Signature=0edbd7104816e3a4719fc983a1c2d8cbda1c5e4fee555bdb429e531678ff595b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4DLOB25%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJGMEQCIHKpAsN6dJ4YZmAWm86CJ8vJD1QoJZt9OUjdT7kiAT9lAiBoYCgZcPLof9SWpdyeQwmcQGD3%2FBTKv3xOWzbwA%2B2vdSr%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIMNVJzjbkEZgC03%2B28KtwDKcRhwS%2FFFWVNF4kdUesMkULiecdcXdo1Cm05ObGsVkrcNVsBRIeCKNEQsdxF4l9YuatFwo1b%2FlgR7maA%2FD5xcQ1Zxrmo0kj8209zlvHhc1lk09LyTRPf4MavmnJRKp33hRtzLhvt4wkLepOnfmdLn5e%2B9Li4j7xGa0w4Q%2B33DSb9dNUEiGhp9GF60jIyZBINnKqIz3MRvgel2GRBcwvVtWeY0HI%2BF%2BWifqUzxgw7CDJInkHfQSBFeK6qVnklihGVByH%2BFR%2BxI1ZMBwX5PB59QtM42TMgairKdQ1Z1IWLaABAKOXng5P6MpgnQKibTLFOH0bRbu9ohTRXe8vM6QwLR1TGTdL5hxpnpDoABbEfwEH%2B8WGYJdar0Fq%2B5YxrljqTekXq2g6sx52VMbWxMzWGMrb1u%2FgEpQc3ss4%2FVI%2BZo6FvmNUHB%2FcqCOh4uL39S%2BoRJyDgnSO8F6WnCdrzyhRUJmmFvyA5TbS1SshAWUkTYHn2Jr3g1Xfqnm2Tbz9nWfglNjA4%2FAB9LsNYNfHMR8vyXN3RvL%2BIAhaREQZpauYddjVlJdpI4uTy%2FSiGdjWC%2F6TOreRfcPN%2FiRCMmt3veWsPusoVPwAAy6BIzxsFioug3LrQ8KOEA1WXH2XVJMwwucDjzgY6pgEvZZHSQL9v8k9A3E2iglz11IeP3Qc%2FD0eWNYlaZI8umBd0raz3jxrGTDawfs%2FUCKauzoyreVlaqhnXK33w9%2BfJ5ABCHag8x5Pcy0lkGEa6XMhhRwqsGveila91EKQfO4SmYgKg9UbJ3xWYXozx0IPzTj%2BBj5r5icWNlfORDzNb1EJjqvlgEKDgpysYOGiinLikAKOHNpLBu7ZDvshOiUVYgnPeblU2&X-Amz-Signature=0c3788a2bcb525a51d6d276a46cffa039245d49c6ff369d3be1671da1dd06f07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSD4ZFQH%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQDrr2sLjVNImUZX%2Fcyh9HV%2FDqIy2Uk5SajMG3N3dPhNbAIgFR9CIY3LuI4JmtsPO%2Brje2D6k029vNWW8l7y8W20FLQq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDF%2FmXOdiOGcAOqW7vircA%2FtuVRXWrY5kDHR7fj2SR2ST3hZkaBxS1AQS%2F4bbtS%2B%2BDEmOjYK0E59HG4GS55%2FPn2DLkiaB43LBjcngoInol%2FM7ZbWwTTSt%2BQZ5%2FmW0Ca6V28Rz%2FHXKC6EZgPC%2B%2BVx5JP2rA7W9hpIQ1tpBCr4%2Fo5LMuScPGimeIMHtQM3EWHKgKyOnhnX%2F8HtiDYW1LP0WllJGagU%2BhQIeCposu%2BPfKyKlTn5pAxnLYZ5k9Hn0WfE4Gkh6kuecQYLlRWuc8g%2FweuZq6lW5M0OagovGMpmT1r2QZHieQLwhpwIS6GQphoWOSWIVNCbxX0O52KBbzOzO%2BUZsyVEXetxgkE550Ky1vjQKaIXa34sfa1B2gH9%2FaAYel4p%2BuQHFK1dbcA9nVVMZyaWyn5Q77tcLP%2Bx64gr4TtU36i28umy7CMUqu6iXy2OOi9XvD%2FzmbDtQnJkKmLZI7moBElBwO6XWX2bB4bh4J3lZAPJeMBqoed3O7HdGJv7otPHPmh%2F8lfC6MNWbn0xSJGe%2Bdz3wpXsyIAAzZh%2Fygvt45TTViJCQenNuElfhJencJkyaXaQOCPouGoP5yabnd3nvtRCGeBDxJb7cvwM50KKORybU4xrxTYvdpcVVTV7wncUw%2FQoQrQrLZNE6MNzA484GOqUBihTSTW7D1t9ftrXgRPTw%2ByUw5ZdVtONm0vjeA8qzSLQAUQzU36OS8CLwBz8CSXFav1upORzon%2F%2FYSyvYfKeEYddgeEpCuEVpREJQk6E8HnX7xRntd7ZMMMTNyE3OYvaGcugQ1kIaUxoPeCkOth1nGXjrCuaXZQBuEeAge7jm0YGTSVbLk9gLjajZDUE8R%2FZeGwWK1Jn0lmNLD5p38joJFT1JMM5k&X-Amz-Signature=2dff653c11d11052713844e8508e699e81a741f17af913419a2cc0697f029fa9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYGV63AW%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQDohHzBmfx%2B3P8ghLrKUfpA84eQSZPuRzeHzrs3cpP82gIgeT53FkrfTX5DvQ0u1ZGL0pfNp0ufFm5iR6%2BKmeGHHS8q%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDHyiVVgwKmDMtDA6eCrcA3ecwpXgQkkzh2rdlG73RGv2jUIHLQhPdLvAnEoDywZvwRm8t8jhGnbLqw9M0Boyuphf1TQRZWIK3buPQlf34urg4A8JBTTbOPe3644%2FyYlvt462jb9HZzfZekhDuBCvOaOjonuokMQxh1jN93%2F%2BltE%2BTZkdlPM6ioBya9xpDxknDH%2FVeCtCoahsG1kv7ByDzS6LFWRUkWaHzE8wPUFCrWeFdhN3f%2B9%2B2LlXTimHpgnfeDuzM3WniQgaLwlh%2BRBtrN95pRe3kh86or7KY5jT4N2KBy25dyXbTd5aUfdic6%2Fu01DwCPkaQMXWqAog4TZmsQgY0LMktJDSO2fEsgeV%2BYcomst8jMj0K0G1SY1P2r6h%2BoMyedPKId46ppsHGb5fIK8uqnmcu2HM1YeaUIHQZJrAUdah3ScgJ20%2FfKDt98swqTPfocUNIESG6irlGAx%2F9a11uLrLIGeLKSef63ZpZ8FsmigxvwaaZ%2B6QoNq%2BIH1AQUgqKFCxYAlZH1rH0fMcOoSTsObc6o6XZZonlDxUMj6SN8G5M6LZrthuOH4GQUX8HpAQFvaTP6LDGqOns8yozuGekcr6AamTqarBCMq2Nbcv7j9JExGmussJUayZkm2ReJvBS8NloDkEwAteMJDA484GOqUBfDy%2B%2Bej9THeVk7vHUWFcPqI8NYeAybEtcqt%2FWvBUNfUu3VM0xOhjIhKLWAWBxTER0khX0clIShq5C9%2B2tw7045svCPtXMZQVK2aZDygRfEEwgnXlkz%2Bp1tUkB%2BS2HeVnL14X%2BHz8NWKUE6yskQOHhzJ5OzsrCa%2FWA%2FxtQfYBxM%2BeQXnrun7kH7jpLoo5FFBciaXeO2w3D7av%2F6VvPCl%2F%2Bn%2Bm5N0T&X-Amz-Signature=849c62ed54143be6574c84a6580d10fc766ca41d96c4a74e1507db7706833831&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGFRYOJV%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQD4XYdFTN4eW0JBT0%2BGxdYSzui8GqkFgEtBY%2FW%2Fa9GCbgIgK9DmolMbHl5NilMu8UUGacPN7wxNLE0bM%2F67lqFB92oq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDDXVI1f%2FhuspHmqqcCrcA3UJAvVvL5ZDEQxVXN5QjpBTZxEpHddiBXD5B7uOvZ4V6Yyopf41cvvOajjlnbUB2%2B4L1ImZZkJUJxX7uo%2F3rlkK%2FVkboxLjYTWzKDFcFMovB14E5%2FDhkeyoIYlR2IsjTdp8D%2F5RoZThjduO8r%2Bh3H2VCjlE8HIZm1Ei%2FDKqh0qwAqR3aRuCryNp7rKIuOjMdUDW2IxieuCyIMR3cUXisolaxCFU6g7%2Brojm5tc1WTnZYMBhWOTJMRMZR5A6EXoYWp09mI5JWzH7dZMu2JwH7LxpSeXC%2BLz%2B4o%2FQM82jR0EQXOIF%2Bk3SUHZbVJpxJ%2FTrCorI%2FuWau0JwO%2F0EqCUuRTMP4C63PFazslqRnCoAxuq1vj%2FsrD3aicHlZGQT062lQcYaOxjg6QRQBtIZKFSZLu5U1NP8s1pjYLROSJhaz2lwCgLY8eOII7qYFVvj3Un77woGesCPSUpPupdwEyhlWPYk%2FwavAzcOumssHGMJV9O0ZOL8OIDdopNkaOVTplUVoC0wfuJFV256%2BZxYDp60HY64y8Wj6vm784CYNDW4T1HCTyyu747k5423A3xEM2sw%2FoGuj0JVN4b7DPP3CcBeCRrkbWnQ17N%2BKexhv%2FCxvn1ioL29EPP8iZcnNsemMKDB484GOqUByF4jSCO0aKEozRS7jZ8SzctFx%2FWy8bn6MkLUbp8RNEeEU6RQwZsmpeh29OMjsMRtR9YmgbE3TxMjT%2BTrTK%2FIMO31nPS3%2Fa62FO4LpX%2BVQY2iM68ueo4kP%2FFwdXa3YGIbGEE1Q9P5Wxbm%2BUaFuMt0RgDjJHgCpmWiSnCgN7YhPSu7qRpyDtqPy0r1Y3kYKYHkbMl16%2B5eh5tmMiWTsueRP3pl%2Bonw&X-Amz-Signature=2955d1d4b83b25d27afe7e355144b9a2f96bf8ce88d50893ca2090dc71ec05eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGFRYOJV%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIQD4XYdFTN4eW0JBT0%2BGxdYSzui8GqkFgEtBY%2FW%2Fa9GCbgIgK9DmolMbHl5NilMu8UUGacPN7wxNLE0bM%2F67lqFB92oq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDDXVI1f%2FhuspHmqqcCrcA3UJAvVvL5ZDEQxVXN5QjpBTZxEpHddiBXD5B7uOvZ4V6Yyopf41cvvOajjlnbUB2%2B4L1ImZZkJUJxX7uo%2F3rlkK%2FVkboxLjYTWzKDFcFMovB14E5%2FDhkeyoIYlR2IsjTdp8D%2F5RoZThjduO8r%2Bh3H2VCjlE8HIZm1Ei%2FDKqh0qwAqR3aRuCryNp7rKIuOjMdUDW2IxieuCyIMR3cUXisolaxCFU6g7%2Brojm5tc1WTnZYMBhWOTJMRMZR5A6EXoYWp09mI5JWzH7dZMu2JwH7LxpSeXC%2BLz%2B4o%2FQM82jR0EQXOIF%2Bk3SUHZbVJpxJ%2FTrCorI%2FuWau0JwO%2F0EqCUuRTMP4C63PFazslqRnCoAxuq1vj%2FsrD3aicHlZGQT062lQcYaOxjg6QRQBtIZKFSZLu5U1NP8s1pjYLROSJhaz2lwCgLY8eOII7qYFVvj3Un77woGesCPSUpPupdwEyhlWPYk%2FwavAzcOumssHGMJV9O0ZOL8OIDdopNkaOVTplUVoC0wfuJFV256%2BZxYDp60HY64y8Wj6vm784CYNDW4T1HCTyyu747k5423A3xEM2sw%2FoGuj0JVN4b7DPP3CcBeCRrkbWnQ17N%2BKexhv%2FCxvn1ioL29EPP8iZcnNsemMKDB484GOqUByF4jSCO0aKEozRS7jZ8SzctFx%2FWy8bn6MkLUbp8RNEeEU6RQwZsmpeh29OMjsMRtR9YmgbE3TxMjT%2BTrTK%2FIMO31nPS3%2Fa62FO4LpX%2BVQY2iM68ueo4kP%2FFwdXa3YGIbGEE1Q9P5Wxbm%2BUaFuMt0RgDjJHgCpmWiSnCgN7YhPSu7qRpyDtqPy0r1Y3kYKYHkbMl16%2B5eh5tmMiWTsueRP3pl%2Bonw&X-Amz-Signature=5e4489aa07ea40581eb17e2fce69bc7c352be5b5a5ee1bbba808110d031d1987&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647CXXISM%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIF%2BZIdB3jTtZUJfo3EHLZSsgx3%2F9Yxhrz0uzfZS6%2BT1LAiEA0sRvplzykm%2BAD7Tn6%2BIchT0tyek6DfGrLLMdyu1THSwq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDBrXZDYomudrzhmmeircA1SzM3%2Fn2d8UM7JobZxLm4dLEiMJoAZbFSQDV680TPUITGL8Gqglm6HuJ3iLAjLJBbVWq1H0TkLmCOAOFSVsblWW5I3%2Bmy5Z9UKuLbNwIi5IUsVK0D1kbRjHLSc4qCaEn6HTqftZZfxlZ6gouQYobpIkSLu6nToDGyu0xhFub2HW0S7QdTaagw10xOpq%2BYVxKvhyQQY1SW7ccxuf7keGmguIk9%2Fib3Px0k8NWHyCh9IPliAyZp75xz246H%2BlsVuhqNFNzx%2B1Fk6zn1K52A6yGoea%2FhayMzVK6J5ePGFWV5nMlMY4z4f1IfOgxkTgPSCjS83gHyUdPzRwfxqDl2vJXsYP%2FdZ7acBZCAhk45LR375nHBGT8i0Me6bopGqvAZd9aivXsO53rvj4PZA2G7eMIIjTO%2FfCZ%2FUGrp0XZNTxru%2FFLODzqYuv0a0VHD%2F%2FO3jGoKvC3tOLNY4G46W8Q%2FiKo02MlfteiUsjjOWbOGD0PgAgug%2BYoYhSjpWgBOkB%2BdF0ALb3bonpv9Tp4uNDppc2WyaK3neGhZo4YQj4DMBFpYJAN6HWPqxRVj6CoV%2FTEhgeN3AthKm0B39faW9Q7tEp5YFYFVUgWNkDyZhfGTbUSkgloFiyI3e%2FjrO4RsurMJ%2BK484GOqUBh4QBy50El5PwQyH6EQXF6krxNZH7uiEuVB322tyizj82X%2BJ8q01xY8cRpZ9ZINzvzicnEx86pbFk1Q2mAFnGpNfajBl44DPoLrKXv8bLB6JhK8KbwsuSVHxMajM2Q5uhrJuqNAkBdKTc%2BP7LJxgfg7SzJLwVKo4pLz2y%2BVNm0oIwNaBhu0hK0y73aUb7SJjzPnB5%2FLck0WXkN0OCbMzSJQV2UJmZ&X-Amz-Signature=8da25b565c60ed0560351169d4dbe76c0fa956fa34f77e194b5b22be1b956cf6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QS4TPG7E%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCZERId3mJg7b9jPhWr2SA%2FFsJkCKPl4XOHZsoeO%2BX3kgIgL0r2FIsGDhYUi%2FpKpZyld6cJJfSJhyAkbUfRtPEDDhgq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDCFCM19iQQR45T6pWCrcA%2FzCxBvNwh4EePkhTtVazyiUiqqLbuPjL2C2zXeq3FOcBeqj5lP5Ijo99y5BtQwX1at5cB1MWvnRCUthvkvqfoxfduZwKkuCoSmpMz7LMyiCl1KbGxUgo1ORxyZ0bKNwX1Dacm8muXiMhUohXLlsWMxmowJx3EXInh8vuH4%2BmWXfSzvcAbrTEYSZub7GdHxTGzY1z251eLT0XfIFwUZFDQmNg2J2Aknt3gkEgWfqQxjvf0SCBT%2BK22FdCFnTnWxEBS9Yr88zdW7Qy032aJusCgWvMsFH3pS4KrqJJv%2F6M9djhCCsFfH7NzPhrFTm04Ozf7GKWhlHVsllud92eUAQ%2BWRRR7uF38YU%2BcShJE29zCvzI%2Fpj2WSd5QsQ0RAZl1x2Dz4f1vo05wmGmZOZZEFAK3Qb7wxk0h6Y8JbD7nJV11GAQzRM9bSJznB3m9%2FQzMI1%2BKeGuv%2FYg7th%2FAdpX7qf6Iuzazq6TVeVGRE0cC6z2zLff1dKZbYTJ%2FCKdn7fT2vJewbVsLK8eCGm0CDZvEBIwV4E0AJui%2FZKL5ii7TUV%2FraYVLP2Z9pQudtm3pxzlyztN7hFI2PyTjzN27T%2F8O%2BdcY%2FHEYIWVjf9n5K82vzGFopGjSLyk1u%2Be78VTanRMKiK484GOqUB3f4aKAe7Az%2B7zl2uOJMK4ZXuvz687KjmdewFOWtIIkA2%2BfoPuGRp88mJcUqDkhhLtu5S0EVzN38tmE6MPk3vGkQoGNaVE6MpSPASahdS1D3FPlgs45cG%2BtxOizolpEUR3FxGfnLuMtLnN2n3F3Jds0h20Yizk%2FuUb9yTn9sZ7hKO%2B%2F2VwbuatjrEZKhoPGI8eV%2BnFGmI9edBr5ScEkQXfNnK%2FLhb&X-Amz-Signature=5000640a2dec7b39a494ff88710eaa5eb075bc72479c1720f98e73633403fcc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QS4TPG7E%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLXdlc3QtMiJHMEUCIQCZERId3mJg7b9jPhWr2SA%2FFsJkCKPl4XOHZsoeO%2BX3kgIgL0r2FIsGDhYUi%2FpKpZyld6cJJfSJhyAkbUfRtPEDDhgq%2FwMIKxAAGgw2Mzc0MjMxODM4MDUiDCFCM19iQQR45T6pWCrcA%2FzCxBvNwh4EePkhTtVazyiUiqqLbuPjL2C2zXeq3FOcBeqj5lP5Ijo99y5BtQwX1at5cB1MWvnRCUthvkvqfoxfduZwKkuCoSmpMz7LMyiCl1KbGxUgo1ORxyZ0bKNwX1Dacm8muXiMhUohXLlsWMxmowJx3EXInh8vuH4%2BmWXfSzvcAbrTEYSZub7GdHxTGzY1z251eLT0XfIFwUZFDQmNg2J2Aknt3gkEgWfqQxjvf0SCBT%2BK22FdCFnTnWxEBS9Yr88zdW7Qy032aJusCgWvMsFH3pS4KrqJJv%2F6M9djhCCsFfH7NzPhrFTm04Ozf7GKWhlHVsllud92eUAQ%2BWRRR7uF38YU%2BcShJE29zCvzI%2Fpj2WSd5QsQ0RAZl1x2Dz4f1vo05wmGmZOZZEFAK3Qb7wxk0h6Y8JbD7nJV11GAQzRM9bSJznB3m9%2FQzMI1%2BKeGuv%2FYg7th%2FAdpX7qf6Iuzazq6TVeVGRE0cC6z2zLff1dKZbYTJ%2FCKdn7fT2vJewbVsLK8eCGm0CDZvEBIwV4E0AJui%2FZKL5ii7TUV%2FraYVLP2Z9pQudtm3pxzlyztN7hFI2PyTjzN27T%2F8O%2BdcY%2FHEYIWVjf9n5K82vzGFopGjSLyk1u%2Be78VTanRMKiK484GOqUB3f4aKAe7Az%2B7zl2uOJMK4ZXuvz687KjmdewFOWtIIkA2%2BfoPuGRp88mJcUqDkhhLtu5S0EVzN38tmE6MPk3vGkQoGNaVE6MpSPASahdS1D3FPlgs45cG%2BtxOizolpEUR3FxGfnLuMtLnN2n3F3Jds0h20Yizk%2FuUb9yTn9sZ7hKO%2B%2F2VwbuatjrEZKhoPGI8eV%2BnFGmI9edBr5ScEkQXfNnK%2FLhb&X-Amz-Signature=5000640a2dec7b39a494ff88710eaa5eb075bc72479c1720f98e73633403fcc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YAU26NQ4%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T113712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJHMEUCIDPV%2Bi2OuvF%2BMoGwkOeW5HacdKxEIosERfZyFyJ9%2BdiMAiEA%2B9g%2FBYVhXMSfJJxqePl9h2R78vfG1qlu4wTF2ShnWOAq%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDAk5A%2BZoJZA3RKfUvyrcA7VY02SmNfvK7hPZqSPTvYUMkrrxbzoYOgtkmVL2I5TQ%2FnJFrdxZ1M1yxsRGt9a7FB8zqrH%2BSQ6N6cxLTxSIg4E9y1u6QfglHxN9SxmPDZmfj%2FBo3E%2FzLoeQ%2FXyEVGL07UFRa1Kb%2BRiA3XH%2BmSuGGyYZCpgmOX1oiuVurk2K4L74EK2qCmz0kcjpyw%2Be7ElmnDMJPywKylYt8rqSq4zDkLkMIDsD5B7vu8Hp3fn5BTfA8L8%2FtLvEZyNSWOVUqd3uD5z8UNWxtd3Ycs4JscTrvhnnK2NpMWFVcvYnAp3wzpmfxQBNpGpNdaCcjTpoHQr8o%2BPkvIYX1lIJdBCfFcFNhj9LjZutO1HY0wh9HiFipkT3AIvM7g9j089pHZ5IkYzAzp8Y3P80pFCOlxBjiZVqbUSxtp2HiHKdhklmK9HqczGka73jSpIo9yNWGxGI3GrOlepc06as1tYkRqiiz046bpr%2FdD244zxpAd1g2jimLirUI412K82RGoLwwho8e%2B18X0jTXAC6O%2Fl5I1saJ1n6GCOB7xXcjIWKMGyWrG1R9p%2BM2rR%2Fn2ZXvdAj8B7LecDaFTj%2Bwidl4PyyUiRB2l8mtDTc3a2AxJb0%2BTAr9BTrtjiMOyULiRKT4w0IVzaLML3A484GOqUB4Lubt2X2NvgwMonXdQd7Udym1hV1%2BEV9SwVywBi9pA1igFhrv%2B2C4KES1SjnNmNWuDZPuAVAf6CfvpcptFN23WrVtquvBwzVYGDilpjnZ0Es4gK3jPv%2F%2Fc2R5Uxg95Tk%2Ba2%2BaaRN8MuTkk9zY9%2BqTHltCyYP1z5l%2BehyFiYE5mUh1dcNDO7C%2F2ITktaQH1SOZqtva2GkhzWoa65vOFGEHq3BeNpS&X-Amz-Signature=506c74b43050260be7112784fb4b82b67b6e0fac60cee3ddbb42cf20b8958c91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

