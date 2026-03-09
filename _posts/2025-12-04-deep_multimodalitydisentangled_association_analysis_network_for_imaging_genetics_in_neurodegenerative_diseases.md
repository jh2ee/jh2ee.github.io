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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBPNM7DQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCSQ2OSExV%2Fc%2B7G5Zvh2SCqPcYT7Z2KF7anjLPkhxMkdgIhAO2GobOowLK%2Bu3PpfejxLPn%2FerFiJbBjcJ8evinJm0HiKv8DCC8QABoMNjM3NDIzMTgzODA1IgxWZzQL77Ar8u5qN6gq3AOxY3OyvcgfdLDZY8G2gALQDVNqDpLLkx8UOtWY9Is80Wrdo%2BhIgDWU72%2Bil06B0tZirTWz2kbNcaEHIL8fcoNRUoPVgwNHYQq8BKBaUeziJ615ZwLf%2BitSnpQAvHqcvMKTTm6sdE0p067USfadAs0344zMNB1SvbnvXTjBDtIyzDpf0tjHFQHXKgFToUKY30rSvywPtP6GVykllNqzwkOi4T6%2FIEjtai80uC8UcabF0uilsZN1q%2B7nitDZajl7hX03qyObH8w3HG2vE%2FEUx4cYOcaQvOS2D2B2%2BOgRmQ1o5GafLG2P7mo8egoHbEm0mbkLmU6j8QB5n%2BoFh5daW072QsScOtpqajvjtLuhjT6ICD0kqO7NHBxJ46khrXFgN3q1iOEKdil0R5yIbwWmL7C9hISQdUZ5%2BEOQzKeTmeOCoUZjF%2BmNDOKXHFTc%2BYvTP5iU5WFX55CQGhHwymSN3TV0AUlZJf4YY%2B1fYvM%2FMCC2SL8yH5wtPLb4hJKEsjYZz8x7wxDk1SWgIn8kGdLSzPd6Ub5yBhtq9WwcIVxeIia4%2BEIIFMM%2BYJr9d%2FgJhUhzecR9Dds0vO%2F1C%2BkNJGHU9cezd2j8Na4aZ5T1qadz7XsK44CrqpCmUEMVRh5AZDCJobvNBjqkAVsdHuRKMCzn5nnq8vk5VRwVNtRwY63Xqd20jyxhY8weEXCS7z6cylxQwp8h36CZqWYydl8%2FZ2psNKme%2FIS9t1jvWNv1OrLQP9ayIMiAyWbS04qPHT0WOaQ8f7NFU9nyUmPC3GcX7brQ37QyE0%2BzcQR8pVZcetpOyTSRadckWCWPN2YD5JZlzVNGOWU4rg%2Fn86weXBHnYtPEDjYoYWz7Y2uPsEPk&X-Amz-Signature=4d3ba447c8106111dfe2abc2192c1143e04489b35d4c3a752ac32955ebf0bb43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBPNM7DQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCSQ2OSExV%2Fc%2B7G5Zvh2SCqPcYT7Z2KF7anjLPkhxMkdgIhAO2GobOowLK%2Bu3PpfejxLPn%2FerFiJbBjcJ8evinJm0HiKv8DCC8QABoMNjM3NDIzMTgzODA1IgxWZzQL77Ar8u5qN6gq3AOxY3OyvcgfdLDZY8G2gALQDVNqDpLLkx8UOtWY9Is80Wrdo%2BhIgDWU72%2Bil06B0tZirTWz2kbNcaEHIL8fcoNRUoPVgwNHYQq8BKBaUeziJ615ZwLf%2BitSnpQAvHqcvMKTTm6sdE0p067USfadAs0344zMNB1SvbnvXTjBDtIyzDpf0tjHFQHXKgFToUKY30rSvywPtP6GVykllNqzwkOi4T6%2FIEjtai80uC8UcabF0uilsZN1q%2B7nitDZajl7hX03qyObH8w3HG2vE%2FEUx4cYOcaQvOS2D2B2%2BOgRmQ1o5GafLG2P7mo8egoHbEm0mbkLmU6j8QB5n%2BoFh5daW072QsScOtpqajvjtLuhjT6ICD0kqO7NHBxJ46khrXFgN3q1iOEKdil0R5yIbwWmL7C9hISQdUZ5%2BEOQzKeTmeOCoUZjF%2BmNDOKXHFTc%2BYvTP5iU5WFX55CQGhHwymSN3TV0AUlZJf4YY%2B1fYvM%2FMCC2SL8yH5wtPLb4hJKEsjYZz8x7wxDk1SWgIn8kGdLSzPd6Ub5yBhtq9WwcIVxeIia4%2BEIIFMM%2BYJr9d%2FgJhUhzecR9Dds0vO%2F1C%2BkNJGHU9cezd2j8Na4aZ5T1qadz7XsK44CrqpCmUEMVRh5AZDCJobvNBjqkAVsdHuRKMCzn5nnq8vk5VRwVNtRwY63Xqd20jyxhY8weEXCS7z6cylxQwp8h36CZqWYydl8%2FZ2psNKme%2FIS9t1jvWNv1OrLQP9ayIMiAyWbS04qPHT0WOaQ8f7NFU9nyUmPC3GcX7brQ37QyE0%2BzcQR8pVZcetpOyTSRadckWCWPN2YD5JZlzVNGOWU4rg%2Fn86weXBHnYtPEDjYoYWz7Y2uPsEPk&X-Amz-Signature=4d3ba447c8106111dfe2abc2192c1143e04489b35d4c3a752ac32955ebf0bb43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJGYRHHZ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCzGIP6XDXMKF%2BfHkya5qX051gDM%2Fp4ZpcAGK%2BddcM3BAIhAMLzYYnPQUG2ZUHFt2q%2FwgQkcQaXYE749h4GFnd%2BXvlLKv8DCC8QABoMNjM3NDIzMTgzODA1IgwkGAFXQ1f3oidUxrMq3AOUJv8e0J10rQ2lND5a7LiSnrWxwisyOKGmwijDV80379eF9MrpFX6jXaFrBu6SoH2GFoPky92jgRaH3o4LSTXtHQC8%2BFacHeUG7l2duyO08Srqubq63pLcPu6MTCyui8sg%2F05onHwHqVerTbWpqYMvcngnn5X1pI2AEp5TvHpkZf%2BcvBvjzZ9Bjnykj4XI7shoGdOkCMzL50RvYsN1E1L7vdx5r0%2FZz95T9749ER8qdhq2eC%2BTUkbJqSKmfWA3FjpyiAyVBWF3mFQ23H9IjqZCLLtwtUVgjtY13b9dGzRdHtn9Yqu2N2zjYuTwl%2BVzFJyT4bYqztET6JASt30r8B8vPo4f3Nm1AUHJpUJ2qTmwRCoPe9i8Zgmi49TXMzYzlECq9PP3dt2wJo34EFTlxBg9Hv%2BcX2SB05rg0ZXgaUdF9ZSpVQo0N%2FqFnHXaUGN3ySYKr6%2BhTOnyJqn8lmv%2BkF2TZdZ88xY1bU13OTqJ3U%2BuczeFq0LeAw%2B6PQswrAIe9%2BenlRFENf5sxUhuUjQuLrpbNHKZ3Qf%2Bh5EK4rM2HnwpVYGPubxmDuZLcRMcsicXLD0ECJbWb2GLJhhvmEIPWMBWuy0WsKq5wbCjY44g22EW6s6tq5GQPYS8w2bWhDCIorvNBjqkAS1ZI53KQlZtbFhMgY7zRr0d3Snt1062RIYfsP5BG3G7ZXdwD8CviBO%2BWLYcXItxpSmP9RBwmkyANsElgl%2FUahLfp4LNm9VyVpF8nJ7HxYUgydizQWc%2F2P%2Fthu66VPexWpwzpuuHgHfWKcg8x5oajVgfH0GsMY8yJwXZ88I%2BHF3dLEhTsYpUGm7mc4GrJa3k2CmLAETtuN%2FgoZm%2BsaQXWig70FJn&X-Amz-Signature=984a71350f20641a772c5ba23b80214966e1d8dda9ee355aa63446990be9db63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTBA5FCJ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDdwgpx43YPXHLQMEnxYoo%2FfWJJ%2FKxM4Tszl39diT0rnwIhAJoLqHhfnvgAo9cg6nrYImF%2FgqJp6dm4ILoCVG20CgxoKv8DCC8QABoMNjM3NDIzMTgzODA1IgymI3nx%2Fx5PNrgoJt0q3AOlbUnHTf6vNK0AG68MS4WLvbL3SxcXQ%2F1kd9Run52vHaMgMrc74CttRSJWtFCwxnnJ4z3IQGk0Hg8JkycRh3hMEz2yK5eEKeW1yHP7mVV1M01zR3opUM5Ccq%2FrDWbv%2F53y1Lkvr64Kn4QSkwTy47YNbByG3md83bLgQ7mumE57igiKCLjZbgWrC1YACNPdFr%2BjCFK8tU1Qqkd0vdIzROLTaqClbuKOCaiF97DX6bS%2FBgXrFN20MieUfTJZa0f2TeTYJphVzVMX0v%2FopR8WpHsVqSBDifQJOTlWj9O0bZLM0BP%2BbcJpDxeliCccdGkVJNUSqtAY91rsNmQV8V5TDo%2BO37ixOFi4fBBY298DBRxXGAdsMrARgwzfFWOwNtOfl858AOLUMeBsL4E0F%2BbpA12ja85DlJnTLEoG3FySR8aIBUZEePT7qVxUhd7R6WLn1%2F7KuQVaBYqS13mGgh7WiMH5nVjksF2AAVW39GuamnW6Bfk%2BvADKr3KxxOMRs%2BYo5giv81hs9croeVH%2FipDIlVBqkCanhgtdDVMV0rUvOw5Try7h%2F9UqB9Xexx2ELKfuNXrTdxNPS1RZAs7kAolQzPulgxHY5FbyjGDOcUzIonHI4KCStGTbiqm3OPSDjDDboLvNBjqkAY%2BBccZYhGCJiyTkVdniT8nWQWAh3hxEG56h90eQHj%2B4TAZ1DMyYRh3DmzX3Kv92PU%2F1ieoD1wWdCXBuaxNX%2BEckVJ%2FvnscKp29efOV5vMPySH8TkiTU3jAlJgoXRke0kh5Zf7ZXXPaF9NegYOfyLI3Oc5iHkZ7vfZLWgyhkPZLyMKmoe16GckAMbbhjbRrtnhC8NnSaP5iaNP%2FrtSPXbFFJdGvR&X-Amz-Signature=8185a92f099dce1e26a3f58c255420b439d528e67a7fde090cc03a93b4e3a9f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTBA5FCJ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQDdwgpx43YPXHLQMEnxYoo%2FfWJJ%2FKxM4Tszl39diT0rnwIhAJoLqHhfnvgAo9cg6nrYImF%2FgqJp6dm4ILoCVG20CgxoKv8DCC8QABoMNjM3NDIzMTgzODA1IgymI3nx%2Fx5PNrgoJt0q3AOlbUnHTf6vNK0AG68MS4WLvbL3SxcXQ%2F1kd9Run52vHaMgMrc74CttRSJWtFCwxnnJ4z3IQGk0Hg8JkycRh3hMEz2yK5eEKeW1yHP7mVV1M01zR3opUM5Ccq%2FrDWbv%2F53y1Lkvr64Kn4QSkwTy47YNbByG3md83bLgQ7mumE57igiKCLjZbgWrC1YACNPdFr%2BjCFK8tU1Qqkd0vdIzROLTaqClbuKOCaiF97DX6bS%2FBgXrFN20MieUfTJZa0f2TeTYJphVzVMX0v%2FopR8WpHsVqSBDifQJOTlWj9O0bZLM0BP%2BbcJpDxeliCccdGkVJNUSqtAY91rsNmQV8V5TDo%2BO37ixOFi4fBBY298DBRxXGAdsMrARgwzfFWOwNtOfl858AOLUMeBsL4E0F%2BbpA12ja85DlJnTLEoG3FySR8aIBUZEePT7qVxUhd7R6WLn1%2F7KuQVaBYqS13mGgh7WiMH5nVjksF2AAVW39GuamnW6Bfk%2BvADKr3KxxOMRs%2BYo5giv81hs9croeVH%2FipDIlVBqkCanhgtdDVMV0rUvOw5Try7h%2F9UqB9Xexx2ELKfuNXrTdxNPS1RZAs7kAolQzPulgxHY5FbyjGDOcUzIonHI4KCStGTbiqm3OPSDjDDboLvNBjqkAY%2BBccZYhGCJiyTkVdniT8nWQWAh3hxEG56h90eQHj%2B4TAZ1DMyYRh3DmzX3Kv92PU%2F1ieoD1wWdCXBuaxNX%2BEckVJ%2FvnscKp29efOV5vMPySH8TkiTU3jAlJgoXRke0kh5Zf7ZXXPaF9NegYOfyLI3Oc5iHkZ7vfZLWgyhkPZLyMKmoe16GckAMbbhjbRrtnhC8NnSaP5iaNP%2FrtSPXbFFJdGvR&X-Amz-Signature=a0780fc2698eaa1c09ab7288d4fc5cf5c5e1dfe400fee45f5092a34ac43c83a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNNBM4IC%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIGbeHecc%2FFBsgop48Ualq9nDIjnbVfiKEG1bmRhKErtVAiA3AGpLIvaHc2wBH%2FQWoTuJ2LCwsD0YWmKNXHsJFouAEyr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIM%2F2gPzskDgK8IZrFHKtwDlKTxAf0bzeviwXBZ93ZeYL%2BBLzAirVxwoJzgPHJ7ADIq9l7xUsxcuKo8CnNkcFvQep9bJjobIC78FMipKZMVznLtvFHUMpJ2syolLNcMdz%2Fx7tfd8I0hVzpVmIPOovR4%2FeiT2rSyh0lGCi1J4Magn9TeYuuFJvT1KivAl6vAy%2FJiFaBbWNCPO8tuagLNnXym%2F8Sr3q48kuUvQpz91O8rXBFL%2FFsLrBYL5GAE16CYEdUn9AZNwRaaNr0PxWh7lYWEhQ3eIrNrklhDmtwvusldjbmImjpEXucEg8LHNji02r%2FvIYD6uZX9THCW21eQBxlx2%2BQn085eRW4w0qQmnSUSNcLMtFILEP%2BQhGEKGkC2xnPep8KDLrUa1Cg%2BBcnastnUrtOf%2FDv7eOgiAgNGDjOWFN6uCEfxK0PaPk05RWqP84QeLTbGJt3dj7wQ0bjWQqij0kXchIoJIFE%2F0IPAbLsuRqObxapSdsC5uS0XF9jtvLDwDb4DP21ld2LTO50xy%2BAKl265h7QlDK7H9h4%2F%2FCnzVMJWUOA7jTSuymFgacoyP8yD3Nd%2Bwex4rFYbois7a%2BQOTXuz1Ht1f%2FFsmvLxFuMW73Fa5SpRuJPPkCZq1fFZkoOq%2FPIeFuxbPzUC0%2BowhKG7zQY6pgEddqjY4fF7BcoALd1Kb0sjo45pX1Qkwm%2Fl3xb6UGJ%2BWl7vmaQd2tjI5tNRCvUmqJHie2Q12XEhYNYlG%2F2IuPjonn4O0PhFnWIpoKmzp8%2BXIIIswDA7Tgiaqr1rrIUM78pZ0gfgUOQbN9sJORTOx3R0csX%2BY2V2zGJS2%2F6KhKAD7y53tdd4hN2L1x8CRNd6a7VL0P7dh14g4pDVzlW9uwrrYukR3SHj&X-Amz-Signature=d3b9b946f634b9787d067d77de3f2760f10cd50d46987caa05426a03cec608a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B7DPBXY%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDzMnhBOeZ8ePVnQWtfY7taRbPCkVAHMA44OU0OMZ5sCQIgFskWN%2FjnBXHXNuSEer%2BjPqC5X%2F2%2FQhv5RWUrUtlZUoQq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDEzcFEs5yry3iqFkdSrcAxhhIqONbz0ws7mAmofl229OvKhMh8UpqWCQyu5XTkuhK5txBrmiEPM9Hnmy4pyqnQ0jdRUmZ5qRfJ%2FE5ub7uv6VyjnGbpxzuFACtCU7KrrsrPZkbDjVlaktyZMqOEvTmJ0nu4mEFFQywIn8su33golcq1WQHMwyMsNdcsy%2FhKIrDXD6Dcv7JQlgGra20P4Js1hO7ujOSD98btSvqEOaGohNy%2BR7qUjh6oHCjEqs4wCxHje2dMgLO8mK2%2Bu1Mxk6F4xasjD0aVp42QDO6VyX8bF1%2BPHaoBjYbp5H67iHs%2FYSLMBKR5zUuglq%2FpXM3dBud7jljgcMJmTASkUQOjXELXGQwRo4kAQfatsqHrakMNaS1eDCDtKsysT8zs9BkwMCPlVodqQgbk%2BNXydbq%2BR%2BnRsqFuR60wWM%2FcUAE9iDNxOFXd5eswhSEVFZxQcOY98rqK8qxX6ODmkYQECG9fStXxE%2FdFRtO1Vzhgv5%2Ba2P3rddu0HcigsGmZMIMkexivC59dSaaxAcZfgCWFwDwxqSsB6jwTTIfRhtc29%2BZcfpmJOMkXIZlfYNcUOHKkJh41hEKGSOIudmAVEmepMeFuFzB1TRtreqHcpmxrmbRAPp6wTaonlW9fAkCRgA2ylOMJ%2Bhu80GOqUBDH2nXYbxawCbzR1jY7ZlAdMwttU%2FzjbDG3NqydzyHe0033sL0R%2FIimjawxORLtRP4X0JZhq2GZfJ%2FmrpJtS76rQvnHOzL%2FaFucCrtdGK4RGhCWiD2ft4iH2911fo0VJCDXG7iz7sTzl3pGBiUOdlFSGqO6jJEUOvhBDmNRnfvnciDmf7GEEu7%2FGm9Du9zrgXG7KLFVUnmYVLbJONGdU2jJS0uWbL&X-Amz-Signature=6d882a8db43154d748f9dc98036751a353786d8d860bccb3c3fec9813351b55f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6LPLNJS%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaCXVzLXdlc3QtMiJGMEQCID%2B0P9yYXiySp%2FwDDB54TeYucyRfRCVBNYQjr6sGtbh%2BAiBH3DuwHP7OfVHmfg7zMBNR4abiHvpf7iCkC51P4pe4hCr%2FAwgtEAAaDDYzNzQyMzE4MzgwNSIM1%2FvphbLCsYyqzOrVKtwDbXdvguGk0vO0aqDBC%2FLhXHHsvEfvzFaWNm1GbqQYonFc4YDCPoggFhn0CPH0wd%2FbKYuf2PIXXZnwdDWBnd4reZkZiIt%2F4wp5pRZzTi0vV2xBjD7hPCXY3k4ykaROz7YbaT6WOUZhlrf5v6AKec0c%2Bmq6AaIRP5TG4VSlhlv3YA3R5%2Bk725brwLsZJEXUZKnEQHXcqzilQjAZt%2FIBTVugNqzJOJ464VYsz09r2KQqt196B6W8MkBLXotsjO%2BEy06279VxopggGv1lW4IDAdpxxVIDL6qNKLPci9Ejp9Ph8q53ETUqwfEIwBJdg3vLl2GL5y%2FkSQg1Z%2FbAywRrdIewC9rlqDoXx671d3fi6m8SCu58Mj1hnGggnXKZpmMhhSFw172uO82%2Bk0k5MjyxZc1ovaBr8%2BZnCDmi0y%2BLWQoGiswY1VOp13199f794qi%2F4P46yc8I7aZxaA8snEyoi05w89WAvG9W5VMHyoU2NuwEmhH7KDi9pzntCl9%2B5K4zxzQQuS5Bn%2FVFvsWkIfjAurKpVtBIrCmBPCyW2kzGQSt8mLD%2BdvIrzw8qmtNmZb6%2BXrt6lLEbLEcfqbyUwsirK%2BKg7tjmOxyRySdsvqORzC%2BtGyQ9yZ5Y2%2Bi0p2SziHcwxPa6zQY6pgEDeXIVpn4bKvr6kGoUj7EHiAjqKhSJ%2BRiZQyQ6QoECzIxove0d0dikoiuOQYS0Y0otfKCyGegWm96vmBHxF2f%2BrNob2%2FVhnEWPZASFyLDw8Z%2FWQ6BfeM1TAO9s%2Fr%2Fi6XbRecXsnHejDN3o9KIGVc%2B9vkiUJebtnHGwVn5HP4h0WtNpQpm0DFGcQWHOeSXl%2BfyOuh4CoE%2Fl5mm4JrlNrAZwRCSJf0bn&X-Amz-Signature=79c0902f482974c43dd162b288839feb2eca8352b0a22fd64a93b2c5a56b97ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVVQ3CCT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDJD%2Blt0gkIkeCJNoVuLj4vuMMwAmUpMBJVNYzDdD6x7AIgAzwFDeFzO7MCteJuNKIH0Kb0WuczhJmQyJBH9JG6Vzgq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDAFbPFs3VOdVOqSfHyrcA3nNh09xftIVMkPPrJTPG5jFuOcNuc724cIo%2F1KCqBh191Xkm2ukN7DHkUFUu315bPtyIb2hrdIXq%2BFU6Sk73QKuWSq2a%2FeG%2Bh7c9TNtyHgPGYr55H0pxS9v1UZdxkzmZl0abel%2FMCJP1sw6qi%2F9XgE83gpplCF6m0xqStrVv8f8MyYlrqZPfPYKTudlmpi0pfXZ1OBeHUvlm0dTTZ%2Bb27av0ZWidTlgzoml9X2AEtI6f5MPjNEJG%2FLHT8qMMElQPGQCE%2ByTPHKuUmvtOh8I9ixz%2FuvVeAMFMpfeSZmc3bjvHo%2F5v3XpcJlTdPzCIXI3eYx3QsP5qcePPqh0UUcRrKUrPqhYsJGBxlBWBtK%2FrxHeG7X7hgLVgAaafyyNW1BV9qDzu%2FMOxLL%2F4tb%2BkFZNL7vHtg4if5ubagtME1kv3a4x5CeqkPaF%2FNWyEoiPFW%2B%2BS%2Fp7ULkA2Xp4oOGoBLs6lG5wP%2BwyAtqwnuTmps8bCvhNKHxawPuSpvPK8iVqtOQDfeZh8TKJYljYqInpHy2kBsZXre9eu%2By8Q3B%2B6n0bxmrYh4RJf4OryPZRibUVuS8oOTbjJnMxSW0etbbS8jmamt25BRiQgLLKZau80t8O0fQd9PrX7pEG0YxoAFubMIqhu80GOqUBr9b5dx1zJYVXMRVBo%2FKJJTDYq0F2UKdcqcoUFkNhzrihw8lSlyOMegBU%2Bqv8B3Zn2X%2B%2BVZYQ%2FZHpJv6Mkn5nTFltljWX9AsYIJuNbj%2FiLtGyiEQp2fHAPMDn4yvd8qKoSqqaUOpf99FI5RG2h%2By3Kk2trmMuZvfRpUB63mYiemz38tZEir5Vweyq%2FCiE%2F4JhUfW5YQpbuIWFbHH05ZsoqzubxjOW&X-Amz-Signature=65d70a8b9041159361f1a3c40c75178c0d88c25e39028fc2bc8fd904c8df5f1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVVQ3CCT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135558Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDJD%2Blt0gkIkeCJNoVuLj4vuMMwAmUpMBJVNYzDdD6x7AIgAzwFDeFzO7MCteJuNKIH0Kb0WuczhJmQyJBH9JG6Vzgq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDAFbPFs3VOdVOqSfHyrcA3nNh09xftIVMkPPrJTPG5jFuOcNuc724cIo%2F1KCqBh191Xkm2ukN7DHkUFUu315bPtyIb2hrdIXq%2BFU6Sk73QKuWSq2a%2FeG%2Bh7c9TNtyHgPGYr55H0pxS9v1UZdxkzmZl0abel%2FMCJP1sw6qi%2F9XgE83gpplCF6m0xqStrVv8f8MyYlrqZPfPYKTudlmpi0pfXZ1OBeHUvlm0dTTZ%2Bb27av0ZWidTlgzoml9X2AEtI6f5MPjNEJG%2FLHT8qMMElQPGQCE%2ByTPHKuUmvtOh8I9ixz%2FuvVeAMFMpfeSZmc3bjvHo%2F5v3XpcJlTdPzCIXI3eYx3QsP5qcePPqh0UUcRrKUrPqhYsJGBxlBWBtK%2FrxHeG7X7hgLVgAaafyyNW1BV9qDzu%2FMOxLL%2F4tb%2BkFZNL7vHtg4if5ubagtME1kv3a4x5CeqkPaF%2FNWyEoiPFW%2B%2BS%2Fp7ULkA2Xp4oOGoBLs6lG5wP%2BwyAtqwnuTmps8bCvhNKHxawPuSpvPK8iVqtOQDfeZh8TKJYljYqInpHy2kBsZXre9eu%2By8Q3B%2B6n0bxmrYh4RJf4OryPZRibUVuS8oOTbjJnMxSW0etbbS8jmamt25BRiQgLLKZau80t8O0fQd9PrX7pEG0YxoAFubMIqhu80GOqUBr9b5dx1zJYVXMRVBo%2FKJJTDYq0F2UKdcqcoUFkNhzrihw8lSlyOMegBU%2Bqv8B3Zn2X%2B%2BVZYQ%2FZHpJv6Mkn5nTFltljWX9AsYIJuNbj%2FiLtGyiEQp2fHAPMDn4yvd8qKoSqqaUOpf99FI5RG2h%2By3Kk2trmMuZvfRpUB63mYiemz38tZEir5Vweyq%2FCiE%2F4JhUfW5YQpbuIWFbHH05ZsoqzubxjOW&X-Amz-Signature=9319edf99e376ec6e981927f0dcb4228493bbec0cece7ef2d50f59bf1c48aa6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YEIZRZ5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIEIpwGPSsmukO5TVsJevAEmx1BZqD%2Bd%2FwyGf%2B%2FLalejBAiEAn3fA2OFogTmNXbnMEI6rcXrazQ1BNwbeUkLCFboPaLsq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDFRKvxc1lTQWvbPGOCrcA0XRaamHP%2FC52RiC8x2b4X8b9EkYwgsB2qiCseHq1wsROHImDltdn%2BF9QxJDBTBYyfFjpkFPCMMLsjaWJipVgKcKh0AVx%2B%2BZdkWVsgZyqnSOO%2BD3Jjve7j5IgqKR0WS03hQFslI%2BcUNAcikE6kzIWBbWYFiQM6N9V0%2FtGXPK2TBl%2BkbhxQr8ex1YrimmhmnRzImdkFQFTZ3bS%2FdLx5Pb25Tt%2BDNfmLo95lPIeID3iqTj0ykYTsDl8XbOQWI%2F5IE%2BsK1f%2BHnuqBEO8ZCUu2L2N3OWJqV1xkqmbevCv8O%2BM9hYJUPi4oblYNjgfaH2OkeV7GQ2bPzJCW7hA8vInhmZjjPJMJiivoPPk6OZkZtvusUjIjsahUaRzR74K4%2B4jNqiPbTIvYVAaaT0HAmkAbsE5R6sk0BgUD%2FsEjY0qQV%2FYyMluIXTuF1dxy%2BubMC8eu5sGFVBS4wlzbs5p9%2BO3PWtLXSWZvP%2BtxbjzmwQSGr9NW4QwDS%2B7r0x0TysfXlWCi7mfuei1lAiMKZPqxqcpfV97XYJv%2Fo701LEBfyWTkzApHH08U5AybPy8J2cd4Gb8MbClMFD959VRPj%2FRnHQ1Un0ldM2bQ2WbdxHlqVukEb5vGz91Bsg7IvlOIDebkYCMO2gu80GOqUBKshPXEvRnXFZ3fQ9MWWkz1QldWzQnuwl4r%2BMX9L0%2BghWOCoBwSJowQlI%2FQpLhMpHJld58MXppYYyzyr%2BQChIafszn1%2F8XmLVF2%2F5nsQkUs9nOOyU%2BL2i5ihlqr87%2BbfACCtJC1Guu7jJnQvzvw6dxfOdGlRG8vJAyPErbETZuLgeo9fYvjaozqLh%2BYgU3tXS58XZkL6Y2oU80PHngOeQAzE8cUlS&X-Amz-Signature=d80314012e8698c5c7c2f06569b5eb1696772ab2ddfae84b305b87e4ba434208&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEIXQARQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDC9I7QdCxZm4ejMntSQE3wYJlqbwSeuRPR1mfxnzF78gIgLB4CeQs1kX%2Ft5LONFi4G5R06FgcQjI2n317I7KTq9ooq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDCxwHwuqQ0C4HqKLSCrcA6uBg1tKu2tr%2Bd8g8n4cEMEM82%2FYAvuFItYsg4oprouol6LJFqoXZ130axyq7kSG2xTmjKEK5qFxe3T6kphi8r98XwUZFiv5jMOwWlNsqJOSj4hAKW2oPPyRzOw8DP5kTYbFglhvp%2BCS291ouJLwqSQYftu9p07DPhRly0q62e%2FH341i%2BB0ve5Jd8rdfuwdl5GARIeIYM8D7uwSSVGdPquTxpzAwv411LjCD2kzUVTS1XSL%2BYi5bgt6%2B5A2qeQkIWYu0jitWAZSiulXVeBXYIsQFlrHI5pZiytuU3zB93C9T3M8vBIFr1E8%2BzAy3yfZDNJGs%2BIQ9kfwLVzXDrD1nEglldopNzmQ7pvrNgPh7aRmO0V2187FmObNEn4bwAHyXMTbkfge4FSNS7AK6El36RzENH3VJrtlM4VOd3P58DHKqu93JDpfi4MQFHVfLuYBDlhpYw8Gi1Dp9mr6Yq0NwZQpF5caEK44fqF9g9dZcKMGuy2RRa7Imsi8Rh1%2FTJa1N9WCUQSPI0q0Lr9oTNpP8bgIbCoChUKDWdEydXxPlqH6NotsC1nNaWctRkrUvxgiDQ%2BT7ukNDvXwvd22JEL8BYuxVNKX5dwAL1rlkYT8AiX%2FyxlkveNxpkqt18F2WMOKgu80GOqUBeI0RhSCgKi4FH3u7rtsEdmlXj43P5khxpI8MZ280TQD704XXeQrzc4HQ9p4HSnFftJpTID1DcgIpLES59F4MVSOZ2V2G6E4GQwJft0mkQmgC2DLp%2FLbZaw1EBLKZnk9qpz3nFy6pPTnWydRrXt0MwimjuwvrInCysqaf6jtfrIszSU3YHCfVGguctgpIC5o0fNz937aG0QurQZ2UYUDmkdNQHcuP&X-Amz-Signature=be595fc1088e07baf52679990bdc1d3adc5173bec24e3553c1bb0323f82e795d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TEIXQARQ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQDC9I7QdCxZm4ejMntSQE3wYJlqbwSeuRPR1mfxnzF78gIgLB4CeQs1kX%2Ft5LONFi4G5R06FgcQjI2n317I7KTq9ooq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDCxwHwuqQ0C4HqKLSCrcA6uBg1tKu2tr%2Bd8g8n4cEMEM82%2FYAvuFItYsg4oprouol6LJFqoXZ130axyq7kSG2xTmjKEK5qFxe3T6kphi8r98XwUZFiv5jMOwWlNsqJOSj4hAKW2oPPyRzOw8DP5kTYbFglhvp%2BCS291ouJLwqSQYftu9p07DPhRly0q62e%2FH341i%2BB0ve5Jd8rdfuwdl5GARIeIYM8D7uwSSVGdPquTxpzAwv411LjCD2kzUVTS1XSL%2BYi5bgt6%2B5A2qeQkIWYu0jitWAZSiulXVeBXYIsQFlrHI5pZiytuU3zB93C9T3M8vBIFr1E8%2BzAy3yfZDNJGs%2BIQ9kfwLVzXDrD1nEglldopNzmQ7pvrNgPh7aRmO0V2187FmObNEn4bwAHyXMTbkfge4FSNS7AK6El36RzENH3VJrtlM4VOd3P58DHKqu93JDpfi4MQFHVfLuYBDlhpYw8Gi1Dp9mr6Yq0NwZQpF5caEK44fqF9g9dZcKMGuy2RRa7Imsi8Rh1%2FTJa1N9WCUQSPI0q0Lr9oTNpP8bgIbCoChUKDWdEydXxPlqH6NotsC1nNaWctRkrUvxgiDQ%2BT7ukNDvXwvd22JEL8BYuxVNKX5dwAL1rlkYT8AiX%2FyxlkveNxpkqt18F2WMOKgu80GOqUBeI0RhSCgKi4FH3u7rtsEdmlXj43P5khxpI8MZ280TQD704XXeQrzc4HQ9p4HSnFftJpTID1DcgIpLES59F4MVSOZ2V2G6E4GQwJft0mkQmgC2DLp%2FLbZaw1EBLKZnk9qpz3nFy6pPTnWydRrXt0MwimjuwvrInCysqaf6jtfrIszSU3YHCfVGguctgpIC5o0fNz937aG0QurQZ2UYUDmkdNQHcuP&X-Amz-Signature=be595fc1088e07baf52679990bdc1d3adc5173bec24e3553c1bb0323f82e795d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THCL5CNJ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T135600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCvNl6daKuEenBNR%2FcX7OaNJNi0EHJ%2FZI0wjxBY2Wu%2B4gIgRvX8ILIueT3WBuW9BKOdprylGnV7VqvD8lMx0YmKoRcq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDMJfpDFxwa250PlbMSrcA54ozOYcozhxli6mBKgYevC6o2c%2BJFGn%2BvuFlJGa3xnH9u9YY%2BmzzwqCT5p%2BEDimzrrRTZfkeCZ4SpIi254Mtz8cS9tldHC%2BpwTniMpHWxIFRqtm4%2ByjLhBZym54YAoqzG0pxaULtuD6mpHYcCJv0UQPARP7%2BQKGIbF3AG6gilGddOcw8BCHjKGqSP0eEASbQmJ1TPu55klMIFBn9nTlIOCg2lPYtzPgQKlfuONzZbShkreaaFKYf5b9toYrmoWQ8iL5yhpPL9okRXHrITUeNoiOc4SvU9vLSX0EdVbHxrEUBiSBEG0qrynH82U5OuIOrq9TqASlNX5hinOqdVjX7SnGQhIpgjZ7m9h9oFCBmnpyCuN1wwoVwQoxCEc2vGilNtHVh475S4ElChc0leWl14e1geLsWd%2FGS5Xz9wb1jFRXVOpkoWmZA4c1PxBbh%2F6TUkgXGUBQkpqc1u0WM0R0cM1dlZKec2NB7CgrWgXMWM8OI6CBnTrmGvXpOY8tB1ly2y19qdN%2BJRWk%2FzAL4TQ287QaZcGH1ZhjIfeAHIikg%2B45IsAA0cVpWdJ7ii0B2lhGOiOnMnYyEZR9XMl8%2FbGqejd8SQGyCXbHx3qtG9%2ByAwrLNyHET%2FvOhF1kKf8RMIyhu80GOqUBca%2FtR5wlTGMockI6IDCoK6Q5fXNiK4Au4S%2B5RFOjCPlHgI24aOs3as%2BLj6cE9kY%2F%2BtW6bdBcExmYBW2ByJM1VqvKkFoS%2F5oCnJsZJUce%2BQWgpUQo1nYNjz9pjFreX%2BCKQqUsqD3fLEbP0chsQ20IDoSKq6pwN5zc2cKRJ0ss%2FvlKsnRjIo6WRtVWhRfqt7Rsu4hkCElQkhcXDPYAUW%2B5yIRT%2Bsn2&X-Amz-Signature=52d2f5cb8738cfc95c318ae2629f90a37c56293ac06ff95152c8570ef7bb4c4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

