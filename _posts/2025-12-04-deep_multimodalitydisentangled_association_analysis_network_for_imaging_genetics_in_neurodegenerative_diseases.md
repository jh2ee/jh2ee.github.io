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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNO6KZM2%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDryoa7VuE73QpeX7PRlY1T0D83nfbDdpXMXauc0DIgpgIga9au0Ypgdk3ZmhOW%2BMCbrmSLpe4OJVCJvgIb7pyc4FgqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFicj9P4iwXLUTOiRircA%2FPHZ8VW0JLqXk%2BqvOsQWR%2Bk6a56cWUZBqQ1Ygg4Y3q8AyH0w70zKAt1JiiYLAHkv0cpUBpNlUc9cOhDMikgQYXP9fAitwpr3zVpYlABrvjkF2LFgMIW1w1PDDn3JWcQDtlWTqwJ8fdWJZ2meiG4wqvolVmrI1unqBeK%2BRlZ7lyA8iQXWv3zkwWlVC8oU9HdtybVsJThHBjVFISwpSGsbyQaAbR4i7tt4KdtgkvD6Bl8c4Js3YNVSoO1qkiufG4EvsZzLLjMA1RTDx%2Fo4y7oWojyR%2BQL7yfGZy8DqgFqfolX2F4FI7sG0OHVJ%2Ff%2FodWsi5cInYzm%2FKxO4iQAHabpZaMZMeBPhATvH5zPvbiafyeydlEptrc0Boy01I3zSxADxJMX47qGaLVRlwds8rYRRfqpdvDCWSA4J0mSeDEwOD9LFKgR%2F2h7nT3MNb9soRj%2FOP4MvvJbnCryJy7mVJHx4H8lufwVMhsAByuKrs0Q7IFDHrD7OPAHKTX5cy3moHPSyD%2B4IjJldn0gSp3B8rzOHdtbk%2B0403o4A5uwmScIV%2FnVH0Y4%2BXi2UHzkBJ9JyZMzCbTYqVu9za%2Bh%2FzU5GowG2H9RWbeLUnUKoE%2BdI2%2F37018SCVhyc6qAembv8%2BvMLj9j88GOqUBqsR1EsuMUv%2FPuxyI6cUXe7WVV3w6kuKyBTwLngO2EWZR1s9noFttyO5pc3NKlqXfdqKKn%2FXuUH37lc%2BzvWBJcry4bDVA04CayNuIlbUVDkpTfxwUKvH9r0yV9LqQTWUmNsD5yBc%2B4Zc%2FCToyQY9pJnc2i2WQQID4my1mQez0Ev8Oa35fovlBu072z17bwBHVVvIAKEpBVzm5x9J%2F6sLVLehR9gfx&X-Amz-Signature=52dd0a9015533def9379a1b7d38858efff540d9cd46bd1d7061e0d9cacf89b9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNO6KZM2%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQDryoa7VuE73QpeX7PRlY1T0D83nfbDdpXMXauc0DIgpgIga9au0Ypgdk3ZmhOW%2BMCbrmSLpe4OJVCJvgIb7pyc4FgqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFicj9P4iwXLUTOiRircA%2FPHZ8VW0JLqXk%2BqvOsQWR%2Bk6a56cWUZBqQ1Ygg4Y3q8AyH0w70zKAt1JiiYLAHkv0cpUBpNlUc9cOhDMikgQYXP9fAitwpr3zVpYlABrvjkF2LFgMIW1w1PDDn3JWcQDtlWTqwJ8fdWJZ2meiG4wqvolVmrI1unqBeK%2BRlZ7lyA8iQXWv3zkwWlVC8oU9HdtybVsJThHBjVFISwpSGsbyQaAbR4i7tt4KdtgkvD6Bl8c4Js3YNVSoO1qkiufG4EvsZzLLjMA1RTDx%2Fo4y7oWojyR%2BQL7yfGZy8DqgFqfolX2F4FI7sG0OHVJ%2Ff%2FodWsi5cInYzm%2FKxO4iQAHabpZaMZMeBPhATvH5zPvbiafyeydlEptrc0Boy01I3zSxADxJMX47qGaLVRlwds8rYRRfqpdvDCWSA4J0mSeDEwOD9LFKgR%2F2h7nT3MNb9soRj%2FOP4MvvJbnCryJy7mVJHx4H8lufwVMhsAByuKrs0Q7IFDHrD7OPAHKTX5cy3moHPSyD%2B4IjJldn0gSp3B8rzOHdtbk%2B0403o4A5uwmScIV%2FnVH0Y4%2BXi2UHzkBJ9JyZMzCbTYqVu9za%2Bh%2FzU5GowG2H9RWbeLUnUKoE%2BdI2%2F37018SCVhyc6qAembv8%2BvMLj9j88GOqUBqsR1EsuMUv%2FPuxyI6cUXe7WVV3w6kuKyBTwLngO2EWZR1s9noFttyO5pc3NKlqXfdqKKn%2FXuUH37lc%2BzvWBJcry4bDVA04CayNuIlbUVDkpTfxwUKvH9r0yV9LqQTWUmNsD5yBc%2B4Zc%2FCToyQY9pJnc2i2WQQID4my1mQez0Ev8Oa35fovlBu072z17bwBHVVvIAKEpBVzm5x9J%2F6sLVLehR9gfx&X-Amz-Signature=52dd0a9015533def9379a1b7d38858efff540d9cd46bd1d7061e0d9cacf89b9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNWEPGE7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIHTdXc5DO1CfLjU2mBOV6p0KnuiVh7tVmODlpfP4l0xgAiB4Jqxq1NiE%2BUFyOorYT8MG3q78tzUGbwyrADXFXVOCziqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5cA388CXzicTLDvEKtwDbVLik3hGcJNiMW2Y4DkQ7%2FxBCusS%2F3EzbNikpLjuvBbfQ9Xubgb%2BNKhC9nBPAcSKviMmf72T2qj6TdCp%2FcNHzyPW7x3%2BnLfWx1az5cupd9tHNn%2B27inXBt5cCWdaYC9L18ZoJdhiNeoudaPgF47OZb9z2Bnjg2toA5kJKf6G%2Brd4R9c87RcBXZigoxafGJH6qF6ox4VQo2BGYTVYs6IzhJ4lNR8FTR%2BY8ruzHMb8%2FnQ3CxU3B6YsrO7Jp%2BrPrgOAKj%2FS6GurFZhlae3L3l21Ivn%2F0TW3aSfhR3hS2f8DJ5WEYBKFnMuTpeQKq7yZaMltZmKxhBPEjT0sRIxA0b3DTS16XEMGDkFZdPMpWE1Bzlbpo%2BqO24188sXh4CrRHI4fm2zmVO6X1DWdanSkcizBmb7FOlJqGiUi08Qf0Re0QFV%2B7WrJU7fVmSpYHiP1uxK8qhcZJeFu%2BupiG%2F49WDCj2SsK%2BNbqtSVU93M9HQ8ZiDLCViFL5uDb0vlDTghaCDDq3V1yFaor%2BUuVj%2Bz%2FYjDodPT2IqRzQRUcmPfAIyQqVupEi8wNoqKaAYdUkdqRCJDCHdpR9xh9kW%2BaHjVbxx5j0tUtT3fsYzmJ%2BJnxDh37BKnkfm1EJGj1hBxNCzUwwv2PzwY6pgHWeF%2FfNwuXIlmysLiXZsaiyGFHNMPjZQxnJ%2B98hvTFHhx2JNqD2BY0%2FyffSagzemRZx75FYaAT67SXp22UlPmsdi0neYnq0il0Ic9x9GM5xG6oeM4h3uthHGN53vUy%2BbaoOYsLstV8Wal6LF89GrMDgQ57sn2EZGU807T7YYSHsiQuQ6TIcX7nLnxa43qmxceOFnBGsf8TPHlBQT%2BAuHzxALd3YqKQ&X-Amz-Signature=34b1b3c6ce22c12434a40701a5a2e608076fc0a7cec2ab046f736e18d86de30e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZXCX5O7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIBLy893ABBJmxsFobr%2F6HLi4YY5w8DSGsoZR%2FFfp3%2FYBAiBX7ouIUxdSdazhYR5UFXa0u3pjDQzx0fql4tPJmU%2BGHyqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYdvWgK0JjLPWdg5nKtwDzPovkCEydeo5%2F1hwg5GNbTyB%2B6QoWmW4KGJX7Nx67XhhD3K%2F3mnp27TjboNn5rXYPUS8d%2BkenizztUvsNQ%2Bjl17eHX6LY66eHS8ZisNeTZsMI5E4q1lrYDxicYQbYWCSoCxcFttJjI%2B4irsoeEQW1VrJoHSz43FdMM7pH9ygEHgfCXSBRxd2PR2c7LFJX6SqBvE4CpYs%2BEUZAggcDBCVAWJX4wRp42qUdPcK4HBnQrI3MLwnzAZNNtFSCwPkL4sZlkUIm4GsOSzGa7umMp3wxS0%2FJiGehmYbco0VJPQ%2B876hASNNCVuJcwAde1OZs9JPnRvTnoXphY4bYPKaoXNFPcp3%2BdVACwAo%2BRvnNbXoIGUTwvy%2Fzn5ObFSAEz%2Bn1jIpwgUD9J0hHMlcW1fpkYq6ObUVmtOnoh1kj1kvbQUQI%2FXRtAGg3t0RCl7rgDGvFoFyxtVN3VpbVRTT82qO6cVqyGWeauxl9hBPVr6vzB26TQRMoPOS9SvOBSPQ9G%2F0Lp6MtMQ022dUG6h%2BOk2%2BcI3I4AhuAtzL8ECkpgf9EIWJQlz6akhAMNgaTG5V9JWlgoFOE%2B1jeZb5A7SuVWEaXcI%2B0%2FsJRrwVMikj88tLnHk9lZ0uaC4o6i9p%2Ft8rVoIwrf6PzwY6pgHbStxSgSIjr3Ob%2Fr1Bsl6of2N1Mx0htmdGZ8YQy3%2F%2BartRvflgpHzIHtzv1HVpAGdq6Fglq%2B0P0gOUfq%2BckvEJ1QCQfzQ%2FqO0EIUu64p4oejxpjlxwhCJikRnVUTrNgNeUlq7jk%2FAhmNeepll03Bfzb7V33VMe5UozfJkibEP%2FGXwexZOL0MzdV7ePXL4SCA9ISFFIrH%2BQI8vaLj9V%2FcAhzr3dszMe&X-Amz-Signature=78c1aeda1f32fc0c1039babbb2e16850eb31adc88b5c81f60adadf9ed13d47b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZXCX5O7%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIBLy893ABBJmxsFobr%2F6HLi4YY5w8DSGsoZR%2FFfp3%2FYBAiBX7ouIUxdSdazhYR5UFXa0u3pjDQzx0fql4tPJmU%2BGHyqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYdvWgK0JjLPWdg5nKtwDzPovkCEydeo5%2F1hwg5GNbTyB%2B6QoWmW4KGJX7Nx67XhhD3K%2F3mnp27TjboNn5rXYPUS8d%2BkenizztUvsNQ%2Bjl17eHX6LY66eHS8ZisNeTZsMI5E4q1lrYDxicYQbYWCSoCxcFttJjI%2B4irsoeEQW1VrJoHSz43FdMM7pH9ygEHgfCXSBRxd2PR2c7LFJX6SqBvE4CpYs%2BEUZAggcDBCVAWJX4wRp42qUdPcK4HBnQrI3MLwnzAZNNtFSCwPkL4sZlkUIm4GsOSzGa7umMp3wxS0%2FJiGehmYbco0VJPQ%2B876hASNNCVuJcwAde1OZs9JPnRvTnoXphY4bYPKaoXNFPcp3%2BdVACwAo%2BRvnNbXoIGUTwvy%2Fzn5ObFSAEz%2Bn1jIpwgUD9J0hHMlcW1fpkYq6ObUVmtOnoh1kj1kvbQUQI%2FXRtAGg3t0RCl7rgDGvFoFyxtVN3VpbVRTT82qO6cVqyGWeauxl9hBPVr6vzB26TQRMoPOS9SvOBSPQ9G%2F0Lp6MtMQ022dUG6h%2BOk2%2BcI3I4AhuAtzL8ECkpgf9EIWJQlz6akhAMNgaTG5V9JWlgoFOE%2B1jeZb5A7SuVWEaXcI%2B0%2FsJRrwVMikj88tLnHk9lZ0uaC4o6i9p%2Ft8rVoIwrf6PzwY6pgHbStxSgSIjr3Ob%2Fr1Bsl6of2N1Mx0htmdGZ8YQy3%2F%2BartRvflgpHzIHtzv1HVpAGdq6Fglq%2B0P0gOUfq%2BckvEJ1QCQfzQ%2FqO0EIUu64p4oejxpjlxwhCJikRnVUTrNgNeUlq7jk%2FAhmNeepll03Bfzb7V33VMe5UozfJkibEP%2FGXwexZOL0MzdV7ePXL4SCA9ISFFIrH%2BQI8vaLj9V%2FcAhzr3dszMe&X-Amz-Signature=2dd58dce020fb2a9c2727918f1e3cc368b287c6cea5168a94a9bc720b0edffe9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3CJ6JO2%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIAGUdg5Sn13OCGU3klEUPlGqsbH6ge%2BgdVtGBTp1jlICAiAkqXiVXDHu1wbKqT4Nqt0qwPbtBCGiRyU7J%2BfwDSVNWyqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdbnsJ%2BNVOwblIYR8KtwD3cx8tV%2BJ8CMUFzIQQQ6VQ%2ButhEk2o847yh6jrjm%2BJzaONFoYP1KqRm60auwd55TcHgQOxxtj98baY4TwZwJJ69pKsoGRKYkBqX2gZBCfCUXgvZJbS%2FeVRQOY%2BA58O%2FJRVLXymSuiYsaXPBUFx%2Fh3iTCvOYfB%2FhYftAUMJH4tcHV1YWm0mEiR2pueDyd%2BEInW9M9CXYBzl6G0HZ%2Fgbf61Z5KjL%2Fb%2B8PAXAA6ee1spQp6JD%2BGUCUook%2BPZ7LLeAQL%2FiFn1O4EePpaALD9mhkfErz0NNLTcV1NF1NVBix02oab2uz3OweoaiI8shodw5YghPZBBAq4BJmaofW9hJvK9Os03piSwhADpUyzTKdPr2yKV8iPuYKgwUK5U0PU%2FxzKfNcLxGePGlApJCa3e8pDZqBtj8HA4cKlU2ICBgayrGuU%2FuaOUwuRUxNlOJAJB%2FqKkMhglgHhkUmj5%2BhvRflzfpXEDExJ2q%2FO97pyBvbk0qKxQU93SwBt94Df9SEOVgTGN2POYEGrgnS%2FkBVv8vzwDEpDaVBJ7MwWs28W3n%2BZMoY5gKLeK%2B34BikdxW1cjBHwZi2BAmLTozVWbn4G1MF6pbg6ogLSYgkjY44qlCnaAr15asD2j3nA2aRVN6KIwlP6PzwY6pgG3U4r1CwIXdA6psc5zN9yu9NVXschl7IMCtZm34l7A%2FEBBVoP3oHYqqIuvtmHQACjcPOssUSZaK7tNUmzkKD1b9ZsdJX7PSsv56vNBzD61O298kjuNmw6zEvI20YL6NzwyrdTySiXn9KLYvZMMK4ZSGcHlCPw%2F2MqigZO3aBhOq%2FZ2GebkHmNKNfjT88Hm7d4ZpnlWcCfRlLfIc2WDYOb9C7OfJFB9&X-Amz-Signature=f88395dc125c735668a131858ee1d543193f2d6c8371c26f147d693f6c0dc53b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEDHSC3O%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDYyDky1H22Xfnp03HD6yR9%2BuggFdQb0CDaYI5Y1JGUFAIhANsV6pcbmEcnfvbf1ZZVsfS5ORjDFvuHVhfDtRQQ4trrKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx2dwsf7nJ0cl1bD0gq3ANlaQPa6sJyrbvZJdn9WxreN63fgiMIWgPW8ZqjucmZDtWMAUTeLwozNBeFjFmQLJM0Np96OUuE8ifotLW9L29IssYrPVigSHDhUoG9M4bZ9NbgwVhZiBOZY5L6pGGwfs4OJQE4drS3SQUTjBEi9e91%2FkjhC%2BUf0lRNzPBrI%2Fz3Y807PtG7dXjPcU7mR5Kx8l3%2Fz6kE9G11DedTfYxdB4mXCYurQok9a2EhFswhtbwYfLuKXHueGeTT8s7cX5zgoqw8pKhLuEc8vnAuubkBkqU9CrhyAUX7fnA2RwWCNGuU7%2FLWk8nCXOtHIqCQue%2Fkdwcs3227ZzcrGqW2O%2FZflbURSTpajgdRtwzCZd9XDKRFbrVeBEetmbdzqKz25xZTN3PC5IWt6wSwLr%2FME%2FCZJGeih07uiwgRHbGr%2Fl90QYH3N2n62i%2FfgaSuChpRoCmWHgSDXUM90RT%2BSN5oqZ%2FqpIaq1T7P3VpLVPYCZ%2BWvGeQlkqLMM8GYdRzlZI9PYOgK6C8npeLJiosL4%2FroAc9M%2FEM3HMCKjRST6pYRP0LBSJmhcMPhiGqLDVJT0%2FZv7D913t3TvOmwWMC9WvFN%2Fu4IFbPPCj9irwWiU8Op6B4QreKCgdMutusO%2Fdfk71mEwjCQ%2FY%2FPBjqkAd1czLAcFFeA8AWowHSibRZ%2FpbG1po1ctLWx5V4JAa51WUZcrK8WFHVLEWGVWztFAfP6Y45QOT8AMhbsh1vZcP5oObaCYY2XEjKcWoZGbcLhBLq3BvHlqzMyt4D8d%2BrBVEyr7fIQYXDuv8D09Tshv1MYmZg2Pez9qdoDFHYjH6V%2BoSxNBcW8%2FFk%2FycOHhEg8LNLGtyLNagwy%2B%2FUFfiR2qKW9%2Fycm&X-Amz-Signature=f2e876f85fab04d46c2c1ef86d55f058f32bd2ef1dad63fb8d601013d358cef7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBHQIBE5%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCqCvadpDFn9dFGiEzA5nHfI0TYWXuUn3w6cLsI%2FkFD3QIgBb7b3TF%2Bejp7VBWdK1h8ZCJV76Rlcrb5DABKLH9oYNMqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP2SOI0lU0Iy94aA5yrcA5TjNbmP%2FCCQcAQu1elIvOqqxnN%2Fc7qLrT3pSGXeKTFbnhFv0xSEkeBUVweZ2XogKuCTyl5pykSbeW%2BE279ZlBEy9neA64bBdi1dPZWb%2BV4lT4ZfaNENeUPlrCf7v5mStHCxTjhnjuVgOfLb31MDPdgVuBgeRsH%2Fh6XEckvK9VxqBTqd3jvFueHWxRv%2Bqwz1orLBn6p7JNhlG%2F5%2BYAF7AgSisbofykLLmdITr%2F53lxJ4y%2FtuqxIz5Dk4sJM3im2IwVbHmJYl2TmPC0phXje68z%2FBGC1XXz9z0GA8EO9UP4SaJKSTP7DLY3xV%2FC5HAzyZ5rPZwHi11p2cyqvMUlYAI1ejccMjf0NFDfD5rxbK7BCULniofRwqmkfkelVB136YJI7Ny7OMwdBmg%2B4v1AM4TLvrt4B1tmnqCXWm1C4QwV5cPUFyWvaUjt71bDRInNLxILpTrfyT5WJ40jNealYNIcO4fL5O4cDxNplNKq7rXF1t7SbKekoUgafV9bYQHqGkbXNE2dtAtdytLO8bpHcgDwMZXCqNEMgssRJS4KsPxi7gO01y2cIKybiWnYR1z%2B8GQ6SYdZL2enWvg3Cl%2FodW3NsyjmQ64oGXOdHBjfbORugACfU%2BV8G8ORm0NeHbMKj9j88GOqUBNXXIZRywLvG9kgu61Rgyc%2B4rAdQgf9jItLeFkR%2FzLzXgugon6kkDd%2FotntSuJ29gId5av8SSh2QoaDH1UKKV%2FMK%2F569LBr6SmFSBU1mrOS0xvkwvQRKiZ5d3YcicUypLQZUzsWEir17%2F9udK6qjeuWtOt1SR6MKtuJIepd4hvVNHq18hADLptU%2Bg5QKNDEiqM0D%2BJYMa34XFmTgycVNKbVxOAJo0&X-Amz-Signature=f42ff0e25d51e2d63c77cf56fb65daea69e2411f3038e898725fc3a501c49088&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667GKNUYL%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQC3Dzm0oNT9gxoBubhcejul1ccLzQtlAOTV97VooOQ%2BwgIgXXvuo%2FAUsZmbtkkhBa1r1KNEuGWtDvW3RKXps5k8GLwqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDODd2keUi6zfcUxFEircAxPdPp%2FYCNc%2BvU1Ved8ILiiQS1Uc7msdmB4If65smtKk0UlL0dLPcJlaG0jKFBq66b58eQ4RgBqOCXV%2FU78dzcN9HO6MX7DAaBz55%2BN8Tsp45GZBZS4dpUDioJpC%2B3UDiwGcTaLhGCS3LIrwwzQk7OVcVQIrWNeK0VNxxnCT7zPKye6S4HMCbLzE25NCfK4Iq9mh068qC3xz51x53nF%2Fnnk3xmanERGCqw%2Fe4kX%2ByjY5%2Bpg6eWdPitT8sdVmxr6MnB1iOZD3rSu1oGZQEIAWCIZJ%2Fyp4brG69AMbMbMd4SbkjnyFLbwU%2BOrhEhil2FRo7oQJhcCBVXSZfWoCN8kqJCkFhVW2Q8bP5YXOlR9C1WXAyZpT%2F55aOVKD%2Bwtm5POYQjsSro%2B9LN6Gvz6PljeEmmxgxAWIipuYomKq%2B9%2BK7BKJpfJooxJhZrzV9g%2BQM4UIg6OQ1%2FZN1qUKJ5srO%2FtKPMQrL1jH0gUe2vItRPybG%2B5p6TvoSBNopFmKj8OXG9a9n0of3APGuaiyKc9r2m1JQ6kj40F4%2Bxg8GO%2BBklRHWlsqu6TXaZB9VVRztOmDEp0hnQ3JnW2D14tcIJVJuYestzSQ1X%2FoxNemfL%2FeViSUe3VtHv7QQLOIHbE8MiCKMNX%2Bj88GOqUBhUgcIvRxr%2Ft4uGLvOm9wJR9FfdN9TEwA%2BsmH7qpmSsVHdtAkdu5fDG5j5%2FN2T2jCoWaAfWshKwBcC9MzH68b1kzVApZJ711bkGZD6%2B6SMrwY%2BRLbvYf15yuVZBiWn4LZfSYEVndOLASbVmsCsD0LZ9YGFr93qmqYKLsB1LAzB7UUbGpYkcJ6OQWtP%2BjBLi2l6bDXpsb3wO4L6WfPzx%2BGiLf7mAhC&X-Amz-Signature=90ad1d20d43ea30cc33f0ef9f1a7b60a61030bf8551d8fa0d2d336a6c1c3bfc8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667GKNUYL%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQC3Dzm0oNT9gxoBubhcejul1ccLzQtlAOTV97VooOQ%2BwgIgXXvuo%2FAUsZmbtkkhBa1r1KNEuGWtDvW3RKXps5k8GLwqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDODd2keUi6zfcUxFEircAxPdPp%2FYCNc%2BvU1Ved8ILiiQS1Uc7msdmB4If65smtKk0UlL0dLPcJlaG0jKFBq66b58eQ4RgBqOCXV%2FU78dzcN9HO6MX7DAaBz55%2BN8Tsp45GZBZS4dpUDioJpC%2B3UDiwGcTaLhGCS3LIrwwzQk7OVcVQIrWNeK0VNxxnCT7zPKye6S4HMCbLzE25NCfK4Iq9mh068qC3xz51x53nF%2Fnnk3xmanERGCqw%2Fe4kX%2ByjY5%2Bpg6eWdPitT8sdVmxr6MnB1iOZD3rSu1oGZQEIAWCIZJ%2Fyp4brG69AMbMbMd4SbkjnyFLbwU%2BOrhEhil2FRo7oQJhcCBVXSZfWoCN8kqJCkFhVW2Q8bP5YXOlR9C1WXAyZpT%2F55aOVKD%2Bwtm5POYQjsSro%2B9LN6Gvz6PljeEmmxgxAWIipuYomKq%2B9%2BK7BKJpfJooxJhZrzV9g%2BQM4UIg6OQ1%2FZN1qUKJ5srO%2FtKPMQrL1jH0gUe2vItRPybG%2B5p6TvoSBNopFmKj8OXG9a9n0of3APGuaiyKc9r2m1JQ6kj40F4%2Bxg8GO%2BBklRHWlsqu6TXaZB9VVRztOmDEp0hnQ3JnW2D14tcIJVJuYestzSQ1X%2FoxNemfL%2FeViSUe3VtHv7QQLOIHbE8MiCKMNX%2Bj88GOqUBhUgcIvRxr%2Ft4uGLvOm9wJR9FfdN9TEwA%2BsmH7qpmSsVHdtAkdu5fDG5j5%2FN2T2jCoWaAfWshKwBcC9MzH68b1kzVApZJ711bkGZD6%2B6SMrwY%2BRLbvYf15yuVZBiWn4LZfSYEVndOLASbVmsCsD0LZ9YGFr93qmqYKLsB1LAzB7UUbGpYkcJ6OQWtP%2BjBLi2l6bDXpsb3wO4L6WfPzx%2BGiLf7mAhC&X-Amz-Signature=dc52c9c4fd09a7c21d7e92eeb44032326ee02f5032bcfbee8f1a8a46574138eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663EVMXGXH%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221925Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIB1rMxR2bgqb6TiR3JF0SHIYaWUSIFZrJJnG5nQ1IY9yAiEAoEFh2FvAhN4wINPDd2faNjowz%2F26g49v9oZFPUQVGEsqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFMkOmEIEXYv9LgZRyrcA5R1XyLme1tcaO%2BTmFks8Bx1ZFhqrpk645aGrHFEDogr2VlDUGzeRO3kV90Nn33u9VbT7s16wagJQ06dk05T4MZ%2BRylDOGGEKL5TMGxrlUbIjNwOSMNtxeSdxOo1hyaOKnZ7XXPUumWnt9ystP6rREx%2BHBl6t7%2BYhhJsrXa0Eqm1KuY5VY7oEABQ3z12jp1VzEsNOG1KL6gIXoEYiEVRwEG%2B4IqVWBntlER80vLmcFV2vZEYZKJXkPjTtJ7lrurMoVfaxh7PjFc64b1PjmHFbTjCG3OPYyO6hffj1DwENblu8zGQ7ZxvrjTDhBGSljAskwC1YzK0f0QHg2KZHBH42%2BX1BJLlJkD12rnltS7fWQBfiZ0BokMYtZoK1d4n4suKdtrSTDdKm0pKKdDoqEAaBWjWoYT9JLLHnWb1pffu6ySbchWF1UGw7u3Cy%2FaEcn7Tp5ps6zfT%2BAKwNQknnOlcu6oKxG2bVYHiSII%2BPM9ksjrRukIIMacGtTw13RD0NG0bUMC0stiYoAeEOpLBKP7jl0lHLGqT0GcrCuGadcWhAxEwk3HM6xQxOFTQKu3q7we6Hqtj5GHh%2FEepExkUvwhxjpfO5KH8cswl829CExyPmh05gsHr6v1VaSu5YtLZMPv9j88GOqUB7%2B675nqmmm6YQjN4%2FnhlM2pF9Yfdq2zeEKsGYXVtdDQTxrDHCs4N0dl2yz7bp4UrBP%2Bs4FTbG9CwM6o5YbPcqLRIkTLPPwHz8EEiPTZNFn63lswku7CFB5ZlvegiCt6hBVErainUpzri00%2BV45sTZO0bU%2BVhdfEg1v7jd6CGtmAZH6dTZh06kZWixgyjtpFLrAeVejhw%2FldoYt3Mz0NnsQu6VyNw&X-Amz-Signature=3d5f296b69ed8a1924c44e3282a28d027f5cc23fd31220621cb384bcdf768e00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZW4Z46P%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIDi26x6q8eM%2F8Nt1gr15GMg2k1C7hj%2B0IgpoBBbdLXpDAiEA%2FETOYxpkXQj5hlUnCfXHhdch2H6WcFG7Nho9Xg21a1sqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO2Gef4vitnl1cS1SircA7QotDrUy9EmTJtHNDUA87Cx3kHkE5MJ1OEYgz3kkv%2BDm1RpU%2F%2Fu%2FzursjiKF0C36sEnHbzBjypa3CThBYxHxxL2JRLc2L4y3KtakBlh365pMRMv8XxM%2BPvQtmz80IxFuQKK%2FsExMT6dec0DbdAQ0PFNLD%2Fv5BbZemn1pXtB6FQZ9U8k4xGVA9nq0bSp5bAouBohnuCLzU8jXOMdj%2FnhhRKwFOqGupL2dKo1cO2E90xPIsrgKuyeEWLDFVF8oxcIBrJR9lrsWx2ZIpQ2tlxKxj2NXuBxt47QTq1L4uQ8TTi4pIcYwHXmxrTNZR%2Bkl11o982FTRinM95joLbTg5LCYi3LAiKA%2FOHsZ%2BLAn5WyT8GR5zc60kN50IjP6qXIepzaRytYVP8MJpmzEufcXxHEiBXHqvbYh0bRKWm58piR3p5SKiv84OzXGrXmJKgl6w1pd%2FPYixNetHZXZC9MXasVOpyxiP3%2FzoklDZnJqtrf1XhsoTLSv%2Bbk7%2Ff5LqKEagpkPvAcXs5B5seOvdrSfgUGipY53Lw283lENmq8IIpsFGf89vSC6vOSes9CcOXVtnFVglMOBJ5Rp%2BqqTYRurLbksn3lrsb504V5fHCTEDPcecPuNVL%2BDivysa9iie7PMJyAkM8GOqUBqk4inKuGLVpEJ9mbHKHU%2FEKYMyMNHRxIjQl2TguiMCs%2Bx2oCAwB7iO4CHZeDWw9xB4IkVjDbDXVimr7Bj8x7n8IdZu0MkQNi4FGwjn8v5IK1ReeAzxTUI7XWkypDq36C35xCMZn4LA7l8%2F3hB1fymJoHofjW2h4QEz6G%2FPrHdKTkr3CV07laDPQofG35mO8VRBa4Nz5Ark26HDvD483ZiTUMrjCM&X-Amz-Signature=a01fc8c01ed44dd48b9f8c96bbe28eb84d350737e87427587ffd28b679a51628&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZW4Z46P%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIDi26x6q8eM%2F8Nt1gr15GMg2k1C7hj%2B0IgpoBBbdLXpDAiEA%2FETOYxpkXQj5hlUnCfXHhdch2H6WcFG7Nho9Xg21a1sqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO2Gef4vitnl1cS1SircA7QotDrUy9EmTJtHNDUA87Cx3kHkE5MJ1OEYgz3kkv%2BDm1RpU%2F%2Fu%2FzursjiKF0C36sEnHbzBjypa3CThBYxHxxL2JRLc2L4y3KtakBlh365pMRMv8XxM%2BPvQtmz80IxFuQKK%2FsExMT6dec0DbdAQ0PFNLD%2Fv5BbZemn1pXtB6FQZ9U8k4xGVA9nq0bSp5bAouBohnuCLzU8jXOMdj%2FnhhRKwFOqGupL2dKo1cO2E90xPIsrgKuyeEWLDFVF8oxcIBrJR9lrsWx2ZIpQ2tlxKxj2NXuBxt47QTq1L4uQ8TTi4pIcYwHXmxrTNZR%2Bkl11o982FTRinM95joLbTg5LCYi3LAiKA%2FOHsZ%2BLAn5WyT8GR5zc60kN50IjP6qXIepzaRytYVP8MJpmzEufcXxHEiBXHqvbYh0bRKWm58piR3p5SKiv84OzXGrXmJKgl6w1pd%2FPYixNetHZXZC9MXasVOpyxiP3%2FzoklDZnJqtrf1XhsoTLSv%2Bbk7%2Ff5LqKEagpkPvAcXs5B5seOvdrSfgUGipY53Lw283lENmq8IIpsFGf89vSC6vOSes9CcOXVtnFVglMOBJ5Rp%2BqqTYRurLbksn3lrsb504V5fHCTEDPcecPuNVL%2BDivysa9iie7PMJyAkM8GOqUBqk4inKuGLVpEJ9mbHKHU%2FEKYMyMNHRxIjQl2TguiMCs%2Bx2oCAwB7iO4CHZeDWw9xB4IkVjDbDXVimr7Bj8x7n8IdZu0MkQNi4FGwjn8v5IK1ReeAzxTUI7XWkypDq36C35xCMZn4LA7l8%2F3hB1fymJoHofjW2h4QEz6G%2FPrHdKTkr3CV07laDPQofG35mO8VRBa4Nz5Ark26HDvD483ZiTUMrjCM&X-Amz-Signature=a01fc8c01ed44dd48b9f8c96bbe28eb84d350737e87427587ffd28b679a51628&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO265FRU%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T221933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJGMEQCIBpXs0lilDOb1Q4HNZo5LoC457XZVZFl1FyTdVY%2FlK4wAiAk9jq8LphPQ95fRWz4Xdv2iU3T2JG4GEUm0%2FmLYU52XiqIBAj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIME07lvyyKJZuJCelPKtwDZtigom5oRTZfKHl2CuRaXKwQ0TRRQmLQ3L1TW9eDNmhc9Fbl2Ut2sHrBJRf8QdR3yfw4xOBFT4Bo%2BSc5rVfcJMtX8CfknyyTUFAz2TDilQLiSZaWyaFe32srlj5U6%2FJBTtTti465XF6TUVD5a2wSd7qp%2BiH8rFyWBEffKb12spbYMnotBqXt4kPlDuHz%2Bs4Ows8bGmWWmpnbrTYpmoicRSUJLZ4UBEKr3PV0ZWgdSWc8miCEWJmSXaIBxsjsesl52YAfYF3R%2FLeDKJ1fVNRerI44y5STkZ6ZMVk4RYSfhcfxbO6r82I43McwY%2BV%2BdxcyILoEzkv5%2FxrVNzAS7jyTS9guIRLra6hhDB8O70oBE7bV8DZFDaq81IVTrKIJv7921qFa7ssESiQ8SYfnayEoqT2OfhIYHgN1pRxZXYP0GqgYqBa1FHB1H09zjedJq6%2BItn%2FYMgVT0deNrKIeYDFZTARjOJDJ3nNblqX1E56pOJ0aa1vbzJnHgmDeKcKRMoCgJyz%2FQgjTF%2Bwsz5u%2Br1yhsbaLvJsPf%2Bv6237p0p1Q1%2BsvbzlkaAliL8NX18AvJLmzfoPPlJhXY%2BID5SbL2LDk3OIp1fQlsPZbmGbURzb1CScvade2mVsuFsk4PD8w1P2PzwY6pgFvA6FR%2Br5gPoV0IO60%2FqiIlwaW%2FSwv9oJWMWl%2FZP1NKTbEzs7UMpCGqeZ%2FX986W58SsWkr3vimbbvbJKfZ3qvLmooy4SgVL9nB7mIDQWrbyd18pzcP56SV4vPgGrE5z%2BXGbHqAffhjJKzNkzzSyJnxxc1%2F2oG%2FTSk4TpnoFwqEdF4b4aR8hXSYGJSoGa6ut%2BwrlI2efBA1hgs8dIhKZqWX4OUxqdOO&X-Amz-Signature=5f8d28cc5a5c7132de67fec51f7379e5848771ae134f0e7e3a2f832a726b39a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

