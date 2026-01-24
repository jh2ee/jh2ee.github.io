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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC3PBJFK%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD%2F7YyFztTkJPNYf7I%2Bophx5PBxDHm0J6EHWzGEQNARmQIgYNvgR6L0y9Hpru1bgoxzdvfGmfcfQVybUgclx%2BQBl9gq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDBzotsNKNkOKFVA33ircA%2BbszkLA3Pp%2BFBMUbt%2BbqJD94GDg2%2BsWNxk3Uwyu1KdEjEkqy6m9v4FjrhwbwKP0wMyz1KlMTGvMuITC3y%2Fsv5rfsXxHtvXBT3LA63B8t%2Fz1OwNH05VPPPM%2Flj31xy3stVPg4WuCFrW3%2BU8rDIMz2zriKy2vgDJ5wnhaSVjtC1oTNp0oeMMDYsSeEr75IWEh0O7U%2B5NBGV%2Bwxo77mMs0xyL8Zqe2nbrv9I1%2F%2FWakk6D6ehHRHQIKDKsCvugdVU0lnrjGbuQOQPbZiy1NY%2FlvIco8x5PNc8fU6dOjVdva8c5p7hrPlGn%2BpsItoAG821DNa2cJbNtX8%2FEWFrULMK1%2BfWukIBxrV5G7aAXDk0svHFJ5hbG3CtijjGG9BrsWVZ0xzyI9q7txfLVizgGVfdXkrlItsp021q51QIfEpgvqThGr76VstEguev4Psm7myOcUxrTi6nBcsUzRfmrLRza7sR8n0QroF01ENBLCXVwPoSH2oaZ82xdEQfqXAD%2B0lIEBT%2BljHSiJy1IakTRbrk62pAPTEtuBk32Fz8eiFc34OBWfbuflllaE2hJbQk6HtwtzEuRKRJcsrOztPfDuUdn9VhGnJx9GuGJ7%2Fw%2FQyAddmR2%2Bs4xet%2FX1vRB4oWL5MPay0ssGOqUBtpcVU7%2FTAcMRnohIx083iYbRtD8OX85S%2FECwPze3p1%2BO%2BsgrpiLJ9RU6S86cGe2zN1dY4Tks7RSdiSA6bZX5vISwdORAqoxKw%2F9gBqCsp9nENW4psHZT%2FZeyVvmDApTq1MKWp4T1KPZYudhbz106J%2B16iVzqX%2F0YRuIHuGZX9lktBrtWt0MzR0mrEFYi9CA3q5rYLSmRWLfXd8ue3RcULv9zFLw0&X-Amz-Signature=d7b3dc6f2262d35d2ddb14720beebe6cdd73923df415e0542f0282e86e4c15ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC3PBJFK%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD%2F7YyFztTkJPNYf7I%2Bophx5PBxDHm0J6EHWzGEQNARmQIgYNvgR6L0y9Hpru1bgoxzdvfGmfcfQVybUgclx%2BQBl9gq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDBzotsNKNkOKFVA33ircA%2BbszkLA3Pp%2BFBMUbt%2BbqJD94GDg2%2BsWNxk3Uwyu1KdEjEkqy6m9v4FjrhwbwKP0wMyz1KlMTGvMuITC3y%2Fsv5rfsXxHtvXBT3LA63B8t%2Fz1OwNH05VPPPM%2Flj31xy3stVPg4WuCFrW3%2BU8rDIMz2zriKy2vgDJ5wnhaSVjtC1oTNp0oeMMDYsSeEr75IWEh0O7U%2B5NBGV%2Bwxo77mMs0xyL8Zqe2nbrv9I1%2F%2FWakk6D6ehHRHQIKDKsCvugdVU0lnrjGbuQOQPbZiy1NY%2FlvIco8x5PNc8fU6dOjVdva8c5p7hrPlGn%2BpsItoAG821DNa2cJbNtX8%2FEWFrULMK1%2BfWukIBxrV5G7aAXDk0svHFJ5hbG3CtijjGG9BrsWVZ0xzyI9q7txfLVizgGVfdXkrlItsp021q51QIfEpgvqThGr76VstEguev4Psm7myOcUxrTi6nBcsUzRfmrLRza7sR8n0QroF01ENBLCXVwPoSH2oaZ82xdEQfqXAD%2B0lIEBT%2BljHSiJy1IakTRbrk62pAPTEtuBk32Fz8eiFc34OBWfbuflllaE2hJbQk6HtwtzEuRKRJcsrOztPfDuUdn9VhGnJx9GuGJ7%2Fw%2FQyAddmR2%2Bs4xet%2FX1vRB4oWL5MPay0ssGOqUBtpcVU7%2FTAcMRnohIx083iYbRtD8OX85S%2FECwPze3p1%2BO%2BsgrpiLJ9RU6S86cGe2zN1dY4Tks7RSdiSA6bZX5vISwdORAqoxKw%2F9gBqCsp9nENW4psHZT%2FZeyVvmDApTq1MKWp4T1KPZYudhbz106J%2B16iVzqX%2F0YRuIHuGZX9lktBrtWt0MzR0mrEFYi9CA3q5rYLSmRWLfXd8ue3RcULv9zFLw0&X-Amz-Signature=d7b3dc6f2262d35d2ddb14720beebe6cdd73923df415e0542f0282e86e4c15ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4DICBOL%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIEg6l%2Bun62cKv2%2FgrAXwzQgqGdI2fjtaBwqvFkZCYio2AiAaXDbnEZyarF5JV291hEsAIPcY7E%2Bi3sjnUABnkTpIUSr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMf%2F3%2BtyZ1toOZhsI3KtwDHDXxJMklLCnu%2FFJmH1lg0PyvaJjoY2xaH4QHxklM6vQZrCr6O96FQ9G9RwrLTm1pv%2FP1c1CxuWYcXdtJk4acTwz8sd8ok5zi0WV5RuYWQLdkSZGSUSqfQDM43N%2Fxtb0hJuD%2F80cK1n0kN7dA%2BMeZPpdiZrHQBjGSAvtTG33Jix5cpqy%2FFCUgTo4XcCEKWzcUAis3cV3Eev5N19u%2B34l8UkEqvsaIXACng0T7MRFimR3cM377OcHXcjGvXZrZCGnP2%2F9aPvXpbbQtvFtjJzQmT1IEgL7LugLQbZtlzYtw771BirnArS7p%2BVPY1YD3y1HmoFaDny2l4JH%2BQAQe%2BRw%2BMp9bWipxZWbiiR7u2BQXFLWo6sNiyO3bMbfUS17oQG9O6OnPfxwFwdRa7k3emzZqJSbwlHO%2FP4MU6cezXuJeV0C5IVk8T6a%2BXYqWrRewsmy3pMfdBiXQewDuwSPHBx2fVwxFLNZve4MAzMsDLmAnNd42m2ZjHBExWAhBfF4YejfaJIXKMgo1aNElzIHz60Pg%2FUAO5Olsawc58Pz7VBcVUMEcKVpVBT%2FR%2BRWEemYtw5ka9MeEeyYY5rrRA%2Fa1c93yTPnf5CQOb97fp0Y3xpFoP7PfHKxMV9%2B7iDsJuIowlLHSywY6pgGhSz%2BC6mvgihuuAG8fsG2sUCIhGUDkZShbyTfl5HHNuTWAhC73aKEYaUWi%2BMNE5MZ1EatQF0JOY6sTwLzh%2BXgv1wWjo%2FZxo90JanBcSy80f4yGkz0M8HPx7choDa6r%2F0Dh4FP1UeLaEjkwIQjaPWgPvqlzXFc5HoJcoVdFupQ53DdAlYWSKvmnW6j2CPzsS%2FaDIdSIQd%2F66jsSBNbZOeHIkCBAGK%2F5&X-Amz-Signature=0e5119f26399988421d202f9a81c5eafa45b3636bfacb8dbd98fbd75678b0da0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDNKMO4S%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCQ4GrcRw6xrTD25rQdat%2FZL%2BFsQxUFNo16R7PZGnLNbQIhAJlUv%2F%2FV%2FotqgeX3pHT7%2BzTRmwkxeyRTL4GyKP49alzIKv8DCAsQABoMNjM3NDIzMTgzODA1IgzhGnuyld83nDs1WEsq3AOUuZQqdQ2C8gFjV%2FYAg%2BdhYvi3Zj7zNg8wJ%2F0rgGhZ3kWDdb7grt%2FzpAGfcJ9F3%2BAr6bmpc%2B6d%2BMl7rf%2BZphSoey3dMhCW1ELe%2FykehbEtcMkL%2Fyy9QiAU%2B7ZO6j%2F7DWJ7bVzAMT69dBDIYfTSM%2FUQwhplkqR5a1suGNQuvw1hovscToVcQfGrV9n%2FsfjwK%2Fq8qSttxF5Q5RCRM8ZWcl8KtBLpFR0gvThS2oVkaDCuLGNNANOgLYSwCdSzltEsC3h3VCePrdgPFHXpIp4vGH2y3Khoqb6YxXt9oIlkNQ0dWXFwEtuNn9bWkqyNFEqEB5BY6DJFCiTTml17FX60y49%2FIUFUlKmMNeIB8t7X9NyEU1aA5PcD%2By%2Fb3ZKc%2FtccyZ8KkAmVP5GKM67JMxiUslGo1XnmE5L%2B%2FLVy0rI%2BAs7v%2BNFIPWw7imoyzmkR46UBsk8Qegsq7mi997IZA932DZQXm5oAqHu2fdTq9L4E4j3%2F%2FefRnaiUb0C1InjCj6gsGcDIZawYfWd1fsVIyQYMykC%2Fpbdf4QBytGybx1pAe%2BsrlU5ZBrIct5QwK3eCOKyFMUvv7R9anGAv1z%2BX32HWTftN%2FR0JJ8ShFaY1QssQAP5TLRtDEiSpG0De0boDDjDqsdLLBjqkATeWgtBewwQd4enMmb9UqRZokTVlQ9Lh9mcgTZjTxbrmE8z%2F%2F5uz7Q%2B6SPYQimkJ29AlF7YAe1F3fv%2BGggNDlfKr5a2DOk4BObg%2BbKaEjgcdGU%2F9yimTPBMvYOoUzzQR9BQzqHnRBEXBeW6552h%2F3RrXMWUQgrHHZWvcEk5oB7oaugzBv7WwlCRwjEapV7fwEo5C4xUVCoqGcfl2kZbgxCaxXOse&X-Amz-Signature=be8392295b9d20f4423325e61537c5521af5d157b1cb8c53ffb7300f70fadb98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDNKMO4S%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCQ4GrcRw6xrTD25rQdat%2FZL%2BFsQxUFNo16R7PZGnLNbQIhAJlUv%2F%2FV%2FotqgeX3pHT7%2BzTRmwkxeyRTL4GyKP49alzIKv8DCAsQABoMNjM3NDIzMTgzODA1IgzhGnuyld83nDs1WEsq3AOUuZQqdQ2C8gFjV%2FYAg%2BdhYvi3Zj7zNg8wJ%2F0rgGhZ3kWDdb7grt%2FzpAGfcJ9F3%2BAr6bmpc%2B6d%2BMl7rf%2BZphSoey3dMhCW1ELe%2FykehbEtcMkL%2Fyy9QiAU%2B7ZO6j%2F7DWJ7bVzAMT69dBDIYfTSM%2FUQwhplkqR5a1suGNQuvw1hovscToVcQfGrV9n%2FsfjwK%2Fq8qSttxF5Q5RCRM8ZWcl8KtBLpFR0gvThS2oVkaDCuLGNNANOgLYSwCdSzltEsC3h3VCePrdgPFHXpIp4vGH2y3Khoqb6YxXt9oIlkNQ0dWXFwEtuNn9bWkqyNFEqEB5BY6DJFCiTTml17FX60y49%2FIUFUlKmMNeIB8t7X9NyEU1aA5PcD%2By%2Fb3ZKc%2FtccyZ8KkAmVP5GKM67JMxiUslGo1XnmE5L%2B%2FLVy0rI%2BAs7v%2BNFIPWw7imoyzmkR46UBsk8Qegsq7mi997IZA932DZQXm5oAqHu2fdTq9L4E4j3%2F%2FefRnaiUb0C1InjCj6gsGcDIZawYfWd1fsVIyQYMykC%2Fpbdf4QBytGybx1pAe%2BsrlU5ZBrIct5QwK3eCOKyFMUvv7R9anGAv1z%2BX32HWTftN%2FR0JJ8ShFaY1QssQAP5TLRtDEiSpG0De0boDDjDqsdLLBjqkATeWgtBewwQd4enMmb9UqRZokTVlQ9Lh9mcgTZjTxbrmE8z%2F%2F5uz7Q%2B6SPYQimkJ29AlF7YAe1F3fv%2BGggNDlfKr5a2DOk4BObg%2BbKaEjgcdGU%2F9yimTPBMvYOoUzzQR9BQzqHnRBEXBeW6552h%2F3RrXMWUQgrHHZWvcEk5oB7oaugzBv7WwlCRwjEapV7fwEo5C4xUVCoqGcfl2kZbgxCaxXOse&X-Amz-Signature=ab6e561b5fd58317b69feb0938dbfde292b2283a64b9c45f7ab16ecfa6d060f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFVCM4IF%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCqOAtT8BSUJRZP7mZILvBOrPAwfw7qW3SFkM3O0FlrlwIhANtvUoSocAAUZsobibY1VHezSdrXPS%2FzknNDIE5unJkJKv8DCAsQABoMNjM3NDIzMTgzODA1IgxDPrRnrqlNHbBPIUsq3ANL4PLUgLSE8daAaMPT%2BdkiMKNX%2BpRcI58Z4XtOID7VpzaSNhguvzS9Ce06PFoUAOZvlf0JLu8v2%2B6fKjsRsGzumFFJ54YSS9kOsToUgH%2BQBObBi6I%2BptZNg%2BxqoB6N6v2o1dV1ocl1PAr87E6SBpwP849OZ7YCWTH3QUMcNjE7R%2BbR1DHbEsudRaRsPshdOX%2BZkF%2Fkd%2Bje3Q0NAVEgI7BUzMbVUbbEXJhw5RkQa3%2BPDsoPWdfh1GgpZL%2FsR0bQ95dnzlVtOebCocdPZRtzOoh0Wz1e1tAeHSebdVmU%2BurAAcWGFd7%2Bihfbp2sZ44TWkm5iZkzM0%2F8e4ZdVnG9VqV%2FiaTLbYKePSVtp9DS2MUY0g%2Fu2X2Z%2F2aAvC7bx%2BmClY1yK8vwEuaT5vLaBkdpT2UDFN2h0Cg963X%2FeXUXt5xBdwfLQmpizzpejxq%2BH0X87ZHIbdpigVSu9%2BiNP2YEVivaFOmg86sg4O6d4Bg5vw1GjwRFiX3aXxjLn%2FhU%2BAalvHFWuoMg0S2C4x2mIvJEnIYp88LxQGQoqXUvjmvHQH1lSNa6Z4oy28MHWk2VPK3bUtABLa12RCtriHE0yedQzUmBg%2F0ik0ZKhhaQ6niXEt9OHEpXU96Ht5UY2cB403TDMsdLLBjqkAXbs2suwclBvekZDWRpyGGMbi1y3z4ZgVyyxTy0qK%2BqnziuEHb%2BNIouPDDFzNeoS%2Bxm638nS32%2BZ%2FpTl1B7s4wwL2KPSiB4oMm4%2FvzXBLQLQp17naFiIec0I44yzosyn%2FwNeBi7pxQC6DjjomtVWrUiL%2F524OQWF3GKu5h0IsuN7yxZqFPezJBlLRHcFeTMF%2FaxCu8Tc9yoM5nXqZ6UJcX9WvLn4&X-Amz-Signature=28d85ee841cfa2546afa9d14acb4e951e8b51d8534e48de078695fda466f6dc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VKXOSV7%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQCyspdVzD0UEuJ3M%2B00SYNAURjy73gKmW20E5sybD0LZgIgC8%2FOQJjh%2BP%2FZXLi1KTzh0slbE1aQ%2Bz65HP1%2BygrXRpQq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDAH6pqRl1r%2FmWc7bLSrcA79p6eaIw7IDBo91%2B63fWtawEUxqzEcAAHxOfm8yxZxVTSHvURJeJ9c9xAKQRSiOYNolxKV241imeFjHErLtLOp2gMfcEAfBSCH%2FFyHrrIltxuiazwhUOf%2BoQRq0nJom6q6ODSJXAv%2B7r0Y9x0skcvoIFy%2B8tu37eZAVvFMBe3cxKwtCJmHaGz%2FNSvbiO5DWO7bAiXhmTNWTXXSGeTD89ttVPqxxI1YhcSHbHGSeRcMYvksspiq4i3bOj59H4J1NlKJFc6%2FU%2Flmh4d2Lp34p7rCH68o%2B681U6PzqfhyxJD1WCFU77S2r4C7SaavLZsW7xKecffmfX%2BN7KFfFdGNTVq3QENA13fZuwyFAuzTRx270IVo0alVwSUpPLxEn1lmiraLP5huIR9xDBDa8OfQaAEbJ7P0NWI1Atwz1MKNC9yhHleSY5q4mzmdIqnDKwdgWvK2m%2FCKrF2tcrd22HiU8MUOwMchc90PrXsI98%2Fzo0hWm5KB8Sk%2FgyvSIiO%2BOWTi4LPQuKcrgWSC932G8N8wZHdi9GPNHZM3PLKf6OtMYJ69Uz6faw7jfYkefF62NmhP1ANTIaYzolQhjisyTw3PgAJw8Y97xI80jgcTiBBVGiR8cD2%2Fa5d4nfrrJrZA4MPix0ssGOqUBn9CSda0qOuHF3Wxr4W%2B73JoayQEJlHG8%2BnWMGOG3cLCvbG94wgjIKVG2QBQStdyp7LgOKfbL2IdBOasnkQ1z7KlFHsm1wTZCuvAM4AF2L%2BlqMsQROvcfTCfJ%2F1vQGKWtlD5PbOmDI3tEqHU1EWrPi7%2B4UXTVE6zeHWXnPiaCy%2BzG%2B2NPbXNcyKyuiUVGSM9DBwScCq%2BLhtwSMeMgG7qd60nUNbGM&X-Amz-Signature=9ad4013f7d0ec91b60ef844e8ce7e770520a9eb520d49b15e59471999243dcf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667GVW3CBX%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDb36ejUcqg4EqNHzagXZFM0AqRS5bjtmdtZ7dSV53U9AIgIDpWHkNMf2FxrcEoejxDL8EABBpLwultqnnFHkURrXYq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDO4Vkgco2sHqyMYm6ircA0CgElhqjv8H%2B2w5zDeH6qNnSYHgbizL5yrP0zzIfm6TOXB3MDUQaXP2eqo8jlQ21Nn%2FGSh0U30ycCAkegt8F%2FUphP0tvOfQP87tWRd%2B%2FjHP66rEzIfXI37qzDVBPg7gr64xgNUg%2FkUoINvOQ4gzPa9HFP048KTzgxQhVqgjwL3QTO4RA2YhhGJqyIYoeNjRtEy0dY%2BjXVRzD9%2BgMPVFi%2BmvBGXG1pPcKWqmxp8xPxlTpE4OHksMnmxtPx8NStiK4TwxHQq0vkGp24MlnVPyMR0bYNplKzMwxP9trqBJmtWJTBG4JBq%2Bt89%2Fa3o1X94pe6A22kfGBW59GYV16p%2FC8ERyghmFIqLKmHJUoHIkedvHI6Bg1kjgBTzjYvfOQ7TKQaP67EJyoqz0a7ZjHjlQJw13f3drNdKnont%2Bnn8ejbdYJlP13ZPXcz%2FzeR84TtcH5n%2FL8yuV0W%2FmLjhdq%2BNRWHqhJRDEUQu5Ab5QL4Ka9eVBAEdWO45%2FYnGxCGOnJ7ImaszQPhMt2%2F8xR%2Fm1RL8yz9OHFokdPqXtlMxBbjp7ySKM8WL%2F3l4pbZQnf%2FYRR2irmTNgdB0cY%2FEMkPGxj6IYYKbV6vOM724GBI5Ud8Qv27Lw3TY%2BX0IFEQfJ2f7bMOqw0ssGOqUB8K6hWJt3L9GPKtxRCM%2Bc3jTZg%2FU3K%2B0a1UWkngcEMMHTMQ7yBloap%2F9%2FjaSX09bL0KJOUSKsq9AfGz%2BeG0yXxSENBIIE2%2BsTBglXQDMSjzX1D96HImSv4Mh83TS1Oe6NuVs0NPOF3pmZItEEWOhDzMjofMmGxeIAtgTLMSV6L%2BWO5Ys59BAQh4%2B1DQg9XPIG6DstEXCB0JfsRS4Rfj6LAyLPcNKq&X-Amz-Signature=8bb13b7b661e1255fb91bb474dddd67996c9659eb1f3e3dfbf5efd674ca96980&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDYJW26N%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCICcVOsj780sIXtmCNaw05PWlAjn4FtHGB157irMeN2xpAiEAiCDU%2FGWiIWySOwq9w1f3VrwR7L8LosmEFRX1QJPOzUsq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDA%2B9YX5kEofYfH3agircA4EPqddlr83SkxSZRqjPShezT42tUgttpveXJfDgyJMYkFyyWgVeVqVySa%2Bp5yn%2FtX%2FwZXUxNrkiscBxv8TnSLPWoZTupChJCFn6AfU4vsrA76UHF1459VTWJJhoLmSV9jbaI2KzC%2F9WWOzbMByBzk9uorsN5ryO0Uw%2B1OBf0WyMplWlM2wNqmmHkVNmjWU1WZBtlm9FiYJAdL8cwM2KdoYUTsazG0yUp7XyVHiA6ikV8Qg8mikfHSLy14bPYv5yiaoWVpXRV52yd38UPgDYlvi71z4O12SU4Fj5wbrc4l3gjUF%2FYmbI8iyU6QoYzC6xPngX0e3oyCpQ7alPWxNxdlnHAMtlp%2B8AIvo52duC3t5tQhPWcAOrAFMeVJfJPWqxHSRwErEGKdyjxGVGF7wODCyFUerKXMGggGvy%2FU%2B%2BWt54Zaxyd2GBpBA4gbAeFKmRdujJWTSBXeoU4vuymgHmt0kxz%2FPJnZVXilFEhzPc557kIVZOSUqJJVtoZ8EA7s15o7w%2BsNommK0%2FHmnBslKHF0DE9XlyLMAWRmksYY7yH0mpEl9BSg6fRKJM3I1HZm6mXexv1tZbJpGLs0HJcGmz5HQ5XCgpgIUjesr%2BfewsXR2qJPlQVx6rqgdZ2OIHMKix0ssGOqUB7HNUygx8e%2FWGP%2Fng5LX3tEWFyWoC3Zc7UnhITLFBvBEhnPh51BoCxKUvSqeji4RHaK5EXY6QQIa9eg1mEDrVSc8eTaPaf0Ul%2B%2FeZlOJmnTCTj3UPY7uEDK2M4ooixdUzBdj8mVp2y%2B%2F9OQBcpY1TsQgzB07vOM6lq4Xq0R8tjupHCP5uSsQIDRaExhw8C44Oi3Zd2nZNtqmvACVMGh%2BiXY3JXqUv&X-Amz-Signature=5027c39684d182b0c92858194c94e6d7aa6e1a9de9aa7d7d265a2608bd90d697&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDYJW26N%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCICcVOsj780sIXtmCNaw05PWlAjn4FtHGB157irMeN2xpAiEAiCDU%2FGWiIWySOwq9w1f3VrwR7L8LosmEFRX1QJPOzUsq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDA%2B9YX5kEofYfH3agircA4EPqddlr83SkxSZRqjPShezT42tUgttpveXJfDgyJMYkFyyWgVeVqVySa%2Bp5yn%2FtX%2FwZXUxNrkiscBxv8TnSLPWoZTupChJCFn6AfU4vsrA76UHF1459VTWJJhoLmSV9jbaI2KzC%2F9WWOzbMByBzk9uorsN5ryO0Uw%2B1OBf0WyMplWlM2wNqmmHkVNmjWU1WZBtlm9FiYJAdL8cwM2KdoYUTsazG0yUp7XyVHiA6ikV8Qg8mikfHSLy14bPYv5yiaoWVpXRV52yd38UPgDYlvi71z4O12SU4Fj5wbrc4l3gjUF%2FYmbI8iyU6QoYzC6xPngX0e3oyCpQ7alPWxNxdlnHAMtlp%2B8AIvo52duC3t5tQhPWcAOrAFMeVJfJPWqxHSRwErEGKdyjxGVGF7wODCyFUerKXMGggGvy%2FU%2B%2BWt54Zaxyd2GBpBA4gbAeFKmRdujJWTSBXeoU4vuymgHmt0kxz%2FPJnZVXilFEhzPc557kIVZOSUqJJVtoZ8EA7s15o7w%2BsNommK0%2FHmnBslKHF0DE9XlyLMAWRmksYY7yH0mpEl9BSg6fRKJM3I1HZm6mXexv1tZbJpGLs0HJcGmz5HQ5XCgpgIUjesr%2BfewsXR2qJPlQVx6rqgdZ2OIHMKix0ssGOqUB7HNUygx8e%2FWGP%2Fng5LX3tEWFyWoC3Zc7UnhITLFBvBEhnPh51BoCxKUvSqeji4RHaK5EXY6QQIa9eg1mEDrVSc8eTaPaf0Ul%2B%2FeZlOJmnTCTj3UPY7uEDK2M4ooixdUzBdj8mVp2y%2B%2F9OQBcpY1TsQgzB07vOM6lq4Xq0R8tjupHCP5uSsQIDRaExhw8C44Oi3Zd2nZNtqmvACVMGh%2BiXY3JXqUv&X-Amz-Signature=71aa1db4549c82ecd1fdbce9e2747bfa20f764e1cea39dffa9199919578ccb49&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TKIXLH6%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIBD8m8DTTDx7ZDIQ7BejSINDS4vAx83lNyy4J%2F6kBnmjAiAqqNk6lT9duiOU22u8C6hZeTj%2FfxUr5iX3hZXVKZxg3Sr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIM1t5kZTC%2FQk5or8xeKtwDWztN%2FxGFNdk%2FI9xRX95YRkis3reV1c%2F3KLWz%2FzRXLQrU7hNLJpCALpx8IWn2tin86jsfY%2F%2FsVLMqOeiFn2Ao1SRvvfiQFhk3YIWYIftKSM6ySwuMbllEPXCQYKUNm%2Bacr64aMQLuB%2B4j2xSnNSp6yjA7BBgr%2ByuTbUShSqH9%2FYsoFP%2BhioygMXqXDxn5jQ%2Faq%2BOdOXCZ64Dl7uLjc5v%2F1%2Fc0biRwqJH8nA11FfQuFexAwihs2uIFwMgTS%2FL%2BZMovBOQxfJNQJg1V9JxZWM6G0TDmmub5q1jOBWWEIDD6hqzIPmcWIEb%2FFfrzrprLecM4lD9AogX96FcLzIsp2VXZuS59SM6VIPvuagU48u5T7UqcAElh3uqfQFw9jAspLMEJqQhM4nJC5g%2ByNmEfRAoAvSjPLfLA0GksbeUKZWeR5n7AWhY1kw9lW4kc12Paxb%2Fhs%2Fjm37JHdWXcDHGQaXWJ4g6u1jdAwnjsPhXEPaZOHdbNDsJ1qulNI4C3qAILPOQvtsvyanXtl639YczPP9DCj9cTo8tL9P%2Bqs82QpW7PVfemnuM7gO4PHqZYGW3dBFSPplkfTsVytnnmE484vA8Ar3jNJZbClBh7xG8X%2FF7lTuinfHg4tGKIKFGn%2BoQw%2BbHSywY6pgGPSyDoe88yOvUGDgj7Gf7LBkpkzhY7ZllaOwUtEMn%2Bj24Q3d83gUfTY0Gfsmg1iM5Qz%2FZbhL5cyvbdkyVXf7Guzhmk6b5UUA7a6JQ8khXgFopdGrCjdD1v%2F29rAtIyb%2FQzgWQSR4XcSVE%2BGS%2FuPUqaaV4SwqZqgteXsgVUkkJcN9IKC6IV5NwIrrbVMDeS2%2FifPXM%2Bnwab82GC1Y5OIBlCACYIDGf2&X-Amz-Signature=32a7c76d83bbfce410cba4510c7322a90ab46b42d45ca2c4b055d6ae5a58b5f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GLTAS6T%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDNC0SATy%2BnMkZwAr6gH%2B7ODQCDfw2CLDaeMEFA9suc1QIhAJyxgC26pdV%2FEvg21vLpylPe4Zka5E%2BYeYT4blcX0Fs3Kv8DCAsQABoMNjM3NDIzMTgzODA1IgzxtkQhggqDBYnbjAsq3AMFePi6CecDyaxmCXAEN3RRqL3ND4mNE4mh%2FlDJVhcAmTgxyZcYRHO2Xo6y53wijVL9xonn8XSuUthULyfiOkI0T0YhhPYm5MkVjqphzPF2mFjITYKbIINA6sraVe%2B1RO0DR4xImxOXYHY9RemOIEaZyzNsfNkLfdgKjY28lObhaDxt2UtHpxD9obQw7UA7ZODnlsg7DoiGE%2Bpx2lk1DNRIzawKRcdx6rHkzMNbMZE1h5OBpETL4eml3hFkf%2F%2BP2reNmzSX%2Bpcz9Chf%2B1F9EdxX3qNywcfO1bfdDaUwJyoxdBN6Q0CA12%2BKGoXgd%2B2oJpJWq0M%2FRYBIe2KqUruqhf2V33HSepNecC7oKunrgNWhw5dIQq6%2FlCuiI%2B%2B84NzJkKvy18Ga8Fh1KHi6c4FaYCPY8styMGOZB9T8%2BV3eBXf17Gbh1H7hHGWkRSyE4hLvR9jYgUwrGljjrtZR8jcbuRsjc6Z%2B25bCsNzfkvjyy%2BxE596DifcKOvMVcRF3agPABnlySgi%2B2ibvvY3znSQTOEghxXr2MRAiRClnv9chKQdE6EHisS8DdwvujleQgV9DFOW%2BETdcucjVcpBeVmXpS9y3mmbKXpMnarTjg7wT1MqEUkKQbwzWUeev0JzfdjDisdLLBjqkAREV0nRQp2SUkP9nJ4Iv65vOc36QNhRY3zHAoO9ZUHgo83QDLxtnRdoLMAxX2wa5KQEmhzDbXF8TGDI%2Fh2bPN8t1i%2BTGXsFgatfC%2FKyGKONiJsGhzutNp9z%2FlYHcMZIjiCOyCl0V7mvrRBO8aiZSm87UVAkPcGxoUuPgXoJeeQHSwkOrRMKu2U2SoMo2SUgvOLKHgfUkhGh%2FGYYvpx5kxPHr4txr&X-Amz-Signature=12847fe6d018a692207198d077ff677f45f7486eede26b5d61747ebc932dc73a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GLTAS6T%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDNC0SATy%2BnMkZwAr6gH%2B7ODQCDfw2CLDaeMEFA9suc1QIhAJyxgC26pdV%2FEvg21vLpylPe4Zka5E%2BYeYT4blcX0Fs3Kv8DCAsQABoMNjM3NDIzMTgzODA1IgzxtkQhggqDBYnbjAsq3AMFePi6CecDyaxmCXAEN3RRqL3ND4mNE4mh%2FlDJVhcAmTgxyZcYRHO2Xo6y53wijVL9xonn8XSuUthULyfiOkI0T0YhhPYm5MkVjqphzPF2mFjITYKbIINA6sraVe%2B1RO0DR4xImxOXYHY9RemOIEaZyzNsfNkLfdgKjY28lObhaDxt2UtHpxD9obQw7UA7ZODnlsg7DoiGE%2Bpx2lk1DNRIzawKRcdx6rHkzMNbMZE1h5OBpETL4eml3hFkf%2F%2BP2reNmzSX%2Bpcz9Chf%2B1F9EdxX3qNywcfO1bfdDaUwJyoxdBN6Q0CA12%2BKGoXgd%2B2oJpJWq0M%2FRYBIe2KqUruqhf2V33HSepNecC7oKunrgNWhw5dIQq6%2FlCuiI%2B%2B84NzJkKvy18Ga8Fh1KHi6c4FaYCPY8styMGOZB9T8%2BV3eBXf17Gbh1H7hHGWkRSyE4hLvR9jYgUwrGljjrtZR8jcbuRsjc6Z%2B25bCsNzfkvjyy%2BxE596DifcKOvMVcRF3agPABnlySgi%2B2ibvvY3znSQTOEghxXr2MRAiRClnv9chKQdE6EHisS8DdwvujleQgV9DFOW%2BETdcucjVcpBeVmXpS9y3mmbKXpMnarTjg7wT1MqEUkKQbwzWUeev0JzfdjDisdLLBjqkAREV0nRQp2SUkP9nJ4Iv65vOc36QNhRY3zHAoO9ZUHgo83QDLxtnRdoLMAxX2wa5KQEmhzDbXF8TGDI%2Fh2bPN8t1i%2BTGXsFgatfC%2FKyGKONiJsGhzutNp9z%2FlYHcMZIjiCOyCl0V7mvrRBO8aiZSm87UVAkPcGxoUuPgXoJeeQHSwkOrRMKu2U2SoMo2SUgvOLKHgfUkhGh%2FGYYvpx5kxPHr4txr&X-Amz-Signature=12847fe6d018a692207198d077ff677f45f7486eede26b5d61747ebc932dc73a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UNJCR4R%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T110109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIBv1Mg4ma1eKnFRHpavfsYkm52Cz4hZxCIoIS5XUiAD5AiEAjFMX2n2wdAVZ%2FBZLiJU3jr1du36QHt3rMNvr6p%2FZOE0q%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDCljActRoZlFEJy3rircA%2BWRCu5R0FnbpkLEhsM6NCPZFd6wHZdJXbJ1eEwDHmDO36qTOGnv0pCp2cm1z63e5b65EUJkiaCFRcbp43DfHG8Fh0bYb08XB7kt1fVoKmtCrGvl9rRj5H950A0a3pvUjA2qI6XTSac96Leg4Ab6yF81bI%2BagjYpZUITxXZQNRO8cuniCZB4u3vMbqM2HnrJ%2FyryC4Jg6fAQ0lnjdJGyX%2FrqtRp9x1XU4On9z2ETG%2FwbhD%2FUA%2BFhmrY%2Fd7ROkOH4eiRIgH43PEnp%2BeA3e0%2BccHkDiA%2F2UGNAeF0SsdbVFDwNNAmotqc7wlOJQx73laGWK9W3YmfqHZkfJcRCAWt81gkroKs3Tq995yl46nweSWoQ0qKtbp0TlvLt1FicoSkfQypwqR0l1h%2BW2gWh3lN%2FjjVepFjriMhVtHPDd9hqGV3tmgLpK1Q7u03nTaVerQ%2F%2B1%2FNqf3QGBh%2BEVO1pUhATjMzKhPp7DTQ6iVQLQ6oq%2BICpWXiW3KqNHNB4GfgF118GrwIK0myl%2F1jMpAvOWEtkLT9eUrc%2BuipHY490sDAWzOR5AgYlfOso1SPY%2BvT4RbMorIfGlAOF%2Bfb01fcvtqSsfJDSvN5VmS9sv3pNOlEjrLFeRt4eoK893XvNAK%2FlMNOx0ssGOqUBQP0QDs%2FHU3mxtQFZQAXoEbRNVEkOpekq6Lgaam%2FnjRn6kOa10sAWy%2BGbwE6kuZc%2FChNKrob19w%2B3%2FuWqxDPK3qKzUS%2Fo1NPAKpPahvGeqAKRocZmhjlcWqfRFnIHSfNe2WCJJW7B30rG0%2FGNwMojyr9gdUUty6xuVzWRbgiMSK%2FOpCo3iNqQQwqRauOWEJFvqoiuB1bXqEtf03shEAgrj1RgvRu3&X-Amz-Signature=d8736fcbae9c100e99d0874001e399bc55cc2971796fe40f38500f9fbf8d4ac4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

