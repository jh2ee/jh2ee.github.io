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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUNRTWJV%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIFze5vK6pRCfoJDOq%2BjSNmoL%2FOYiRqLGIaIKB1vWgEYNAiEAsriX91JNM9ZZ9M0RKnrCiS2fvZ4%2F6DovKRsWwtY2%2BF0q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDNNyr%2FaEBIWuq6PSayrcAxJTlQZy8PzuGU8f2oGwDIdvlWFsVAKp6ezxlO9NO0uZqfenF%2BvL9nEeiTri47hCB1oxEyigEkEv52S%2BDuTVmKeJGHb%2FJ4Eh10API0N9lDkdOt35FR04nsfvNkv90iveh0MYEWkQiuCNgGqSHYdVHm5ER8fJzih91auJrJAJpzqQ5Tczig8LgG3jEZ3jwo2r1IrY4dxzEfg%2FY7ZAUjbKJMOdHZR3tGG2pSFqbVsAsYVeq5OVN%2Bis4qGPw7Yol6q2Em2seBJ%2BlhBtcX3LUVpPAmJMLyQh5tMG4AzQ1wt4dH1SizU8QlqzoqXc1s%2FF56g03nAqpd7yoWMYny6Jwr5B9F9PF7arfcyIRa4qmxZguf242%2B3HNkwHjUDVt4pbf%2BOmdBwS73IX6HDzc43zHSfw2EkXd6D%2FZ%2FekZmqw0wk3Pry3aW7kVyjmeY%2BmZe5cOBgNB6qT0oLh2dwE3cSMMbmcoz6KbYS2cNX69JURcOVVdsHQB4i8sBVivd2gj8o7igg%2BPRcY3627XSj1TEW7F8z2FrEqiINrpbJ1ZSq3cYo6hDaTdg6d%2FAUKNnGusTALzExXYAkbpKkY9wN40y6yqdBSmdC5B3eJG8wKTI17zmFx7so3bHgMjF4SUpMPLIBSMKvl%2FckGOqUB880U1qj3k04BkNFTTojOb%2FQhd27TaLBRDsf6uO3CR2jXx5yIt6f%2FQyd3%2FQBsMrx1tmUmHFtasctmXFLBmS%2BwE7voCwl0NbjffL71%2B%2Bfq6ikP4OQPiwfWohJl%2FmNRZvzrIFxI1PVQrw0yzS5GV%2Ff1yw9%2FANA7IHiQaihrHB4WS3%2FBo%2F9mN9qyjDsOAxfg0pHTBqeX4KNyEDNSrW%2FLLJFK%2B3IWHnsk&X-Amz-Signature=4caf74eb5de8c28d53aa10045116ac7cd87014971b6020640d1a647c31df25ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUNRTWJV%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIFze5vK6pRCfoJDOq%2BjSNmoL%2FOYiRqLGIaIKB1vWgEYNAiEAsriX91JNM9ZZ9M0RKnrCiS2fvZ4%2F6DovKRsWwtY2%2BF0q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDNNyr%2FaEBIWuq6PSayrcAxJTlQZy8PzuGU8f2oGwDIdvlWFsVAKp6ezxlO9NO0uZqfenF%2BvL9nEeiTri47hCB1oxEyigEkEv52S%2BDuTVmKeJGHb%2FJ4Eh10API0N9lDkdOt35FR04nsfvNkv90iveh0MYEWkQiuCNgGqSHYdVHm5ER8fJzih91auJrJAJpzqQ5Tczig8LgG3jEZ3jwo2r1IrY4dxzEfg%2FY7ZAUjbKJMOdHZR3tGG2pSFqbVsAsYVeq5OVN%2Bis4qGPw7Yol6q2Em2seBJ%2BlhBtcX3LUVpPAmJMLyQh5tMG4AzQ1wt4dH1SizU8QlqzoqXc1s%2FF56g03nAqpd7yoWMYny6Jwr5B9F9PF7arfcyIRa4qmxZguf242%2B3HNkwHjUDVt4pbf%2BOmdBwS73IX6HDzc43zHSfw2EkXd6D%2FZ%2FekZmqw0wk3Pry3aW7kVyjmeY%2BmZe5cOBgNB6qT0oLh2dwE3cSMMbmcoz6KbYS2cNX69JURcOVVdsHQB4i8sBVivd2gj8o7igg%2BPRcY3627XSj1TEW7F8z2FrEqiINrpbJ1ZSq3cYo6hDaTdg6d%2FAUKNnGusTALzExXYAkbpKkY9wN40y6yqdBSmdC5B3eJG8wKTI17zmFx7so3bHgMjF4SUpMPLIBSMKvl%2FckGOqUB880U1qj3k04BkNFTTojOb%2FQhd27TaLBRDsf6uO3CR2jXx5yIt6f%2FQyd3%2FQBsMrx1tmUmHFtasctmXFLBmS%2BwE7voCwl0NbjffL71%2B%2Bfq6ikP4OQPiwfWohJl%2FmNRZvzrIFxI1PVQrw0yzS5GV%2Ff1yw9%2FANA7IHiQaihrHB4WS3%2FBo%2F9mN9qyjDsOAxfg0pHTBqeX4KNyEDNSrW%2FLLJFK%2B3IWHnsk&X-Amz-Signature=4caf74eb5de8c28d53aa10045116ac7cd87014971b6020640d1a647c31df25ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XKGNNF5%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIGXIjcN2NSPlhQ%2FX2CK9zbh90NJ%2F93%2F%2BSBIAole%2F12gZAiEA55HJ8CrdCbirHnEdqKn%2FYLczRFWzf9%2BMOiresRYKXRAq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDGcr65W1ApY9Hsk6vyrcA%2BSOi0go3s1C3mHzO0SE8xZtgVZwhpXxW0Fsttg%2BbMZD1vlYlaCTdW5V4GnW3vBDFUQmSnP8yCiU0rFcMPLf6NVjgwWL9e8Ow6dEZCIkAtIaqAVTZO82wSLR8rYxgVyGY4%2FkQU54DrwVmQZqOm3Ty1Qcr7hibeus02vD3JGPay2SuGX2a0ywGmXGnpKBzq5WnrqEib7y93zIbasAmrjaiYiv5YCDj17bczDCQVmbB93%2BjQje9e7jCCdJql43TKovIRr0EY81l8t%2Bh%2FJv0n3142KocScyDqeGuySyLfOXXBht%2FI6gAX6J8MjKDzFdzB%2FdrNk4KE5L%2FpIBQDShvu4ZfzZhhqfSwUU19Cl2w5TylMR4TkGMcrGHryiVAe%2BX3wooSza7d%2F91HZoBob8k7dWbB8YZIxhE9Zf7pMbmVSoBpIkQeVxG5hc3ewnU%2BUvT4dQoiUG5H60dQKIoSH5p5e3wzaz74zpLxRZ5%2FU%2FjG23ml7vu9RlZsyV56S7TZXY%2F%2FKvrnY7%2FjirtJbUVP%2FqvSBmA3s12Dotv4Tt08SBDjqUib9jYEm3XUqXzaADUY2FSbv1gWVac0TCJf0rwlog8po5EnFSl7GCvQuygSp01nJ3NIsir3CRmlsFFPJkAq5BLMPvI%2FMkGOqUBOA6LKM4TRUkuJ7HzieyuN56hLMg3GfuVrArNV96JXymddV%2ByXjNWw2xCYDZ%2BHGgI8oY9os8D0Y5ZtCyBxhggHBkU%2BG9dO8p4vCBlMYQ8VC2fEgX0oCqaLPolq2m2Ri9VpewfB%2BAPeii0ZOo9RCD42aX5ktXTr8LrTJUDgachaE9QQD3zBqE6bo5DTIDBtaVZGC9JLrgBK7dJuOrc3EwuELlPbWrE&X-Amz-Signature=3d7467d6f2b123948da49d64f661fd2fa99b87a7996115b7a40b92912d6db8a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEBJBJP3%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICO%2Bz4eJaTsurMdbwbSPyhRTe03hLuUFkCxoaaZtBodCAiEAlxH0bZ1FPHqpbhBhzzGPZgYBVr1Gx2y3SVI1isAiL24q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDA0ZvqmBl9hmhnlj3ircA%2F8BGNMMjMQRzek9vCW1R5AwxpJQ1ERhUTUUIXPS67rdPit2uX1x90tvnk0d45G4czUWZT0DFPGxD0Pgo3p5AeRtWtkxPtFVX3GA5Zt8sVIy%2Bes7HaekhGUdqGR4L%2Bbigt1oztSz7VXYaqvNpnlzISnp16j%2Fh2e5kqIZa6IjQqgxWGXZHjmY3VJ%2FPwLYRD4wlrRiwBzkbyOvUktqfEXlLHzDRf0mTcrxGz9f3QuTffB2qX0xX9Xc2bON00Yy6krRJlzrge%2Bm6YFNvdV6ZfHKab4zXj9Tfn17mbikXSNrDuuoKQfepm0IoYnUMZVtAHvabgQhQk8zbncLwaCisYNKJlMgtoVBDnQxcYO1QJc88JuYBjJA%2BPdpQ9lkxVwu5Wrk%2FvjkwjyGQyl54ARz8DVfeAzc9hcncm6ZNIvQpai%2B21Lg07LXBGgQnbXaVIjv3m8MJ0zALzeqeVqQMFQHuisufNVld8iDa3w5HTggWZD9OUtxqq4dXkgKRBfw9Mu5SaukCKVflFKNlHekC6OZIIRyokmSPWY4XZIUSkDHDbnhg0bCa5308qiif6FPuPc8AR8JS%2F%2FdmhS5v8tipHQjYbh7MLnoYB5ZesA9APoC%2BW0kbvAqZPCImNl1Q%2Flmupw1MLLu%2FckGOqUBO1SpSFNNo2eQ%2Bn1b997nhqXEQuffHrnBJITekSvMNASyLzo0JiXWJeNlrASRebhz%2F0Eao6aPHyZlpA1rnZvNN6%2FY9zk0l1mxfSQ6vWA6AnapiNVPUSlLcibE72Ui2NpZ5z4hv8sOhYPlKzITZkYO7N5zkJfXEVVSoo74I3pVCcnoei7Xungo817OnffWX7DAainX9zDe4pD90shTO6IqjpFAh7NN&X-Amz-Signature=4f03cb0e111acdefb48680a7071abe396075399da1f150ce694f5370259bda25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEBJBJP3%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCICO%2Bz4eJaTsurMdbwbSPyhRTe03hLuUFkCxoaaZtBodCAiEAlxH0bZ1FPHqpbhBhzzGPZgYBVr1Gx2y3SVI1isAiL24q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDA0ZvqmBl9hmhnlj3ircA%2F8BGNMMjMQRzek9vCW1R5AwxpJQ1ERhUTUUIXPS67rdPit2uX1x90tvnk0d45G4czUWZT0DFPGxD0Pgo3p5AeRtWtkxPtFVX3GA5Zt8sVIy%2Bes7HaekhGUdqGR4L%2Bbigt1oztSz7VXYaqvNpnlzISnp16j%2Fh2e5kqIZa6IjQqgxWGXZHjmY3VJ%2FPwLYRD4wlrRiwBzkbyOvUktqfEXlLHzDRf0mTcrxGz9f3QuTffB2qX0xX9Xc2bON00Yy6krRJlzrge%2Bm6YFNvdV6ZfHKab4zXj9Tfn17mbikXSNrDuuoKQfepm0IoYnUMZVtAHvabgQhQk8zbncLwaCisYNKJlMgtoVBDnQxcYO1QJc88JuYBjJA%2BPdpQ9lkxVwu5Wrk%2FvjkwjyGQyl54ARz8DVfeAzc9hcncm6ZNIvQpai%2B21Lg07LXBGgQnbXaVIjv3m8MJ0zALzeqeVqQMFQHuisufNVld8iDa3w5HTggWZD9OUtxqq4dXkgKRBfw9Mu5SaukCKVflFKNlHekC6OZIIRyokmSPWY4XZIUSkDHDbnhg0bCa5308qiif6FPuPc8AR8JS%2F%2FdmhS5v8tipHQjYbh7MLnoYB5ZesA9APoC%2BW0kbvAqZPCImNl1Q%2Flmupw1MLLu%2FckGOqUBO1SpSFNNo2eQ%2Bn1b997nhqXEQuffHrnBJITekSvMNASyLzo0JiXWJeNlrASRebhz%2F0Eao6aPHyZlpA1rnZvNN6%2FY9zk0l1mxfSQ6vWA6AnapiNVPUSlLcibE72Ui2NpZ5z4hv8sOhYPlKzITZkYO7N5zkJfXEVVSoo74I3pVCcnoei7Xungo817OnffWX7DAainX9zDe4pD90shTO6IqjpFAh7NN&X-Amz-Signature=3df60559ffe4eaf06b00a01152de80f0a273c501381a6a1839ff52745dfb2641&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675RA2ZRN%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIAnz58QZkWsO9A5VROHNZVRgVhzQtHG4cZoYqLX8UTLtAiA2Ke0FPAgVbPESziZMLO5q78WwioMaIJS3Ht3MKXnrvCr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMHCWpezK78AvcXWCzKtwDFPMqvFrdWB9MMWx4FUp%2B8bgYoH4XsYWSzdeu5fo4Y22udCmBzmpP3eXeU82lfZLCA3gy4yxYuucrW2ptoSltBozAtpKbBN%2BOCUJT%2FQu819vGEFDy8u0jOTSp7H1ULC0is9XVPR63ACtJoW7Fyf%2FU6BeMFvg6h%2BtdzbKIsYvErSKStzJUtkE%2B2osjLzI07r40i%2FnK9vWBfk3XhdoiXQHEplazlhTGEh52Isl5Z0W3w1Oux0GqcW%2BZdRz9XrEt1%2FOR5E1ij%2BaJ1RUBFWQIUSzqo2LN%2F1C4wGc4KkqXNZCle62Us0c4bTmi4emtnWAG8B2ZP3lzWcvhfHc8I0pnWMlF49Htz36dILX9ffMQlG%2BE4AQJZVyRQbjtrX8Sd%2BWp2Xd34OmrE%2FwLBLx9d%2BTvY%2B%2BBlWKesrhdEJwT0iT29XfMy7jMq4gZDKl7nV27foiv8AA60E4oPom2UtNQkP1usXfV6nCv0DbbzI3YUfNKsqajqghQnQfhlLWuVVFeT8pQrSF9Te3Fcss0SL9DY7%2BC9i8WH1%2BgDLad1VzdrWPq%2Fyt7pppOzSDiw6QFgxGdBLfcHjZLclWH8r1rZqbt%2Fq04jHtWHnJzpxp2%2B2F%2B36WQjbz3fkgTeWFal4FgvCLuydQwue39yQY6pgGuVCnfIYpdgZkEF0q3%2BkD0JWBA%2BZJYbtazfHnCgJI4Tol75amBiP0eP%2B6ieWOLZLiHrB5g1fAiEivQV5cXT0C1T7e6Qk9SGdpPizMoT12tRKEvMq%2Fq5smIU78oCIAHyQra2HwUslj7E2ZHDAhNXExgFTRP%2FIQhwnu1W%2BV0kTQZPxgKIAC3PbJYhlofiviMrQMjTcE%2FKpDaDFbFT3r4qKE53kk3ayRC&X-Amz-Signature=4cda76abda1297e8e449c29f5addcf6066fb1807c75598a61e64e8a6742fa242&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WM7MAXOP%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJIMEYCIQCJAl55923geYfScWBjuHw5i2keVbbEss6icE3JTOuiSwIhANFqPKQ4O8xJGFYhhVoUAFz9xf1LQ1F6gkAuhNYiM9QqKv8DCEQQABoMNjM3NDIzMTgzODA1IgwscuhlHRc2JDNi7Jsq3APaEPp%2BlSoN8%2FlUWEX9r6QYdnKUsOHpmljvbFmOyGSGi9K94tvxNaKQYkU0T37pk7Z8l4PL1vFiJxrHpNawGU28eUxc4h7NxjiGhlV8IiFn0zCy0LGW%2FMIfFIxCXNhGxFHZd2vrL6teZRLKHdwsIxFddgycc9oiafFFSYcdc8jS1kBGGjp152DgKg47c0SzOI5LjBOrBLYRGWotb3SEURuqf7xA6FnfcDmoPzN%2BGKxDYzWQpgfzaMfoP1TNY4cOo0EjQUh95B0KWDaU9KRraB0UmN%2Fk84m6L8sK6tykwxQwUvS1IwnfGpy%2Bl6d67u8sxxqeCwjYc%2FCxFzuyuvOtmhA79Z5QEWJo7GZPUuvQ4EYSk95oyBPE6WmI4VUMU7G4a8VKe%2BtR469s98iHHnkDo%2B%2Bp%2Faw2l6Kputm0B1b6SKFyMe6gBQii7bSGRYOlv1ZueN07Yzk27ArP59oRdtTLRK7gKi9OQOzzmAPfy4ieUpSdBDPB%2Fqe%2Fy5mbR7UGu%2BauDG5%2F75icSFUtjCEJacrLi9HPmF%2BxlcxhSCKIzBGgB2BJ0SMe8%2Ff82N0KkK1h7kF35OnvDcuTZgFQ8zyKDiRRsgCmFX9voLakWmk5Iv8N0fvTM4s50sCNplzXJSsS9jDN7P3JBjqkASO%2B2bMYxPxAnzC4NDexjzxd0O%2FGmxrFo9x09CP3cR2ADgtax3ak1JwGBF4pmiNzjrU8iQsxPsHZEfKAl2uNST%2FtEbuZAXJsmNRfKIOv46hv219cWxJ8u4wZd9JDUPSu%2B1pl%2BYcXVix%2BqhD742NoH2X72cClimm0z4p4ql3lh%2BXt6PnRsZqijpXw87G4%2Bya7iDGqEYGoD4b%2F1CIp0eeZFRVkXGrz&X-Amz-Signature=734cc1f76d6eb556d8c450ef4a872e94b5e561482d60a9c1832f6602ba28ce6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676EJ4ME7%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIB4OiuVYiVIMYOgEoaeh4pGi6fPtyJVC6bTn4six4SqqAiBSIW7VKmlGmia70MmYRIQwGG4kdYbxwk%2BMeynjvlwY0Cr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMAqPiTMuKkMHoD66%2FKtwDSyWyHpFLQvGeJ8PrbcoseYb%2BoJ4aGRGaAaOrrIp8HmWD8Prt8iiJDzv9YU127OUokOzMhJzK1A17Z6hUeLM5p0F9I5i0xoB8rs06zNF3V4PVdTKJPf3uwIyb0fozH6ZEJmfJx%2BsroQc7POH%2F%2BZTmBS44fzQSC8w7oW6oIorNXHiULByqtNcxjx3tEyL9vHSspurA%2Bz3KjzNEYww%2BeAPcy7JPU%2FrhB5Oje2y1%2Fkr7sWCD3yV4Nv%2B2o%2Bh%2BLkdeq4nCLUNqT%2FmG2FMxikmzoqKwCAD%2BVueirvInuQlZYe%2Bgw7yNGQrMHbXMJ%2Bvu2qi4GxvqEd4ltp5iCdj1jbY1Wf8Gbb2ZTge9Abw602lAsf8I4BWOtnjr5HDB8jE01g5IappabWuVXix7H4wwg13rI12N4Q46iiNZQSXZ98pJXeh17uT9Aat80tYvpuCXGZ07KwYB3%2F5wFsihneStSPtMgbOwsdqgiZxP%2F%2BGE9t2OWmXb8xwYDuHe%2BcT3ZLhtHPzGVPi1Aq2sqPAQ4WstupdHPoqNWs65L5VRE9ipuK%2BixszeuBfN7ccHrUh6I9weCODyHPF1U6fmBCmtpQRFZx%2BYoSTFZLjyURlSOlgUeLICjTYyVfsIxvvYJxreA3qfyNkwt%2B39yQY6pgEJWgWrb%2BTkAMYBwqGMujbrMAxVRsqmlY%2BlbsOCg5VE96Pxfncw9Rq4SkzryZsvOVEgLTtfUSOjvy97gatv96jIibm0GN0ov0UvrFqTmEppm9vxr3BXU1pgVpAwwFbPECAM%2FwhSxK8BcyHx7RIDWUUiRwSDRBMiuDc3kuiL4mVcPBxaP0jyqH3XMBTMH9pfnhv5Xo28XfAB2IKLgBHZWLm1OGIwDaf8&X-Amz-Signature=814b5e630060d61670d9b10340a710dc93dd70b18bb503bd4d6e40a0fa830604&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXK6VR4F%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIGxSKtmD0hNRPoh7Lht41mnXnnzdfjSQPU6GJhfU7UwaAiEAw2U5dcIdyd87mq797QJapmTvCftm37IFzktazY1IHBQq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDBGR2xlTgUfD7jMP0CrcA%2F3x6s1Uyn%2BUU2exj8v3yaZMVzPlfd%2BQF3itak89EzTXe4Bwd5u8uRrbFnjuHyhh97Fzlc71XxU2kfSREOpKTJNj1WoFf1VeFWTm9CWsrTHfCVd1zKo%2FY7vJYFBQ3sZbdwqKaeKJd%2B9GCpz%2FtVgU%2FQOlbapkdDrlfqWZUu5EEh6KjiNq83hTqadVer%2F9rhukvimTDwxo221DfiFxSXwCe8oTPoCxohpl3f%2BFpTY5pjbRUJ%2FgWTWO51kzxb0qKcDj%2Ble7bV4fILQ95yADH8oQ9FCZteadgCYuvriaVzO37qlCXgpHTFd7mhK8yWFxC3PTyVySKV%2Fxc%2BPAMDW5GBso4KLie1F8NxRM0xrw3aR5iYWzvr8GqQHJMPy2PJMenwSPL4J9eed2pGPjHJ2WiypTakxxx7eFV%2BOZi38vvVFAGcVSAYzFedLVba%2BSJCHk3AuOtvkLbZW7AyECM97sO931mdephtg6qRJ4cK5hvoH%2BHiSqFKj4wy%2FicZOr9Dnrl9SFU3LNfUGeisRjxSmEo5Jt4xOg6lAiGPFPmT%2B%2BZ0EdcT0u5LOOoLRYWmV7kzitzt%2B4hHRfWQxsbNZwWJjRWoMbGr9kQZN0b9sua%2BBviSizhTEdaZqbi8i0V8to7vI9MI3J%2FMkGOqUBi7M%2FvHomXKTIfRKtdqIbXth7H0m0KmOGkMFEdgAB3pFbBaDbtbJMJVzo3lvsho%2BgVZH8Ey7tpdECXgGgfvE%2FhXUI5yQx5FhyAydfQgdbMXHYoZa3NbzKNc8ahVCevFyzcqqswIgp5GDyqcWvqpiffFHNW9%2B2Dpp0kSmRTn8ilJv4lkeMLIyKHwnExx6wiKmX0jDEpi7fS%2BKXCY5WTeZqTEND4F7G&X-Amz-Signature=53a926568542cc4241f218a4a8cdc500250e053e12142354c8d45ec5cad76270&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXK6VR4F%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIGxSKtmD0hNRPoh7Lht41mnXnnzdfjSQPU6GJhfU7UwaAiEAw2U5dcIdyd87mq797QJapmTvCftm37IFzktazY1IHBQq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDBGR2xlTgUfD7jMP0CrcA%2F3x6s1Uyn%2BUU2exj8v3yaZMVzPlfd%2BQF3itak89EzTXe4Bwd5u8uRrbFnjuHyhh97Fzlc71XxU2kfSREOpKTJNj1WoFf1VeFWTm9CWsrTHfCVd1zKo%2FY7vJYFBQ3sZbdwqKaeKJd%2B9GCpz%2FtVgU%2FQOlbapkdDrlfqWZUu5EEh6KjiNq83hTqadVer%2F9rhukvimTDwxo221DfiFxSXwCe8oTPoCxohpl3f%2BFpTY5pjbRUJ%2FgWTWO51kzxb0qKcDj%2Ble7bV4fILQ95yADH8oQ9FCZteadgCYuvriaVzO37qlCXgpHTFd7mhK8yWFxC3PTyVySKV%2Fxc%2BPAMDW5GBso4KLie1F8NxRM0xrw3aR5iYWzvr8GqQHJMPy2PJMenwSPL4J9eed2pGPjHJ2WiypTakxxx7eFV%2BOZi38vvVFAGcVSAYzFedLVba%2BSJCHk3AuOtvkLbZW7AyECM97sO931mdephtg6qRJ4cK5hvoH%2BHiSqFKj4wy%2FicZOr9Dnrl9SFU3LNfUGeisRjxSmEo5Jt4xOg6lAiGPFPmT%2B%2BZ0EdcT0u5LOOoLRYWmV7kzitzt%2B4hHRfWQxsbNZwWJjRWoMbGr9kQZN0b9sua%2BBviSizhTEdaZqbi8i0V8to7vI9MI3J%2FMkGOqUBi7M%2FvHomXKTIfRKtdqIbXth7H0m0KmOGkMFEdgAB3pFbBaDbtbJMJVzo3lvsho%2BgVZH8Ey7tpdECXgGgfvE%2FhXUI5yQx5FhyAydfQgdbMXHYoZa3NbzKNc8ahVCevFyzcqqswIgp5GDyqcWvqpiffFHNW9%2B2Dpp0kSmRTn8ilJv4lkeMLIyKHwnExx6wiKmX0jDEpi7fS%2BKXCY5WTeZqTEND4F7G&X-Amz-Signature=d3bdb1c687e0fc824a516c289b06515341e8d58f798e548a12e2796336b30f59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHVRRKIS%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCID5AQbKe7sZwpdzYxDDXS6Eti7W584UAs%2F%2BNLBL9FD73AiEA9VlbUXEuy%2BvzZ1BwPS2j3is4Ol9L2rx1AIZRNRRWDDUq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDLnJTtNIYHp6f6zH9ircA8JVu8A5FQkK81Iw%2BVz%2FBoprGfovk7auejG6edy1Ip3jK1KYwWTwUf1BggruOpLcuzGELvCAYw4iT7NvO%2B17g8Fm5LqmTMoMwbwHIEczI4yQqs7E8eeD%2BwXvpBdUlLvu6jCltH%2F6NZOF%2BxxWL%2Frj0gtzYNwnFIYFrJVYRbde3IOgw9aoDsj1Ewpm9Kt7gdxeI5QSE5U4SnMYxErNFQVwqYxzZycKNsG0w7vp0e97CKRCLsbcQi6WQDki8YnFzu4IpkyNATUP4SLkwGvczzndo3dWRJf7EDjfLOzo6mX08K7DUPWrFv0gJAodlU835h2F%2FrJJADlt78jrJ9OwehahNrCvdWVi1HOH049%2BFunsfoF1%2BFzOFJdL3f2oUT3nXuPRboVZlxS9rMgKaPYSnkNqHIrnAoGL0egcYQvfCwnK552Y2ZgLWIu3AibGL4Av7yeN4wGDb6SMkgzYmSYE5xfGu7cijwtNt7OLoslgok%2BkJv4%2FBw0dkSJqdhyrE5wnhtp9dqjKcoKTNQyqwxOSqbTiHoKZ%2Bc2k83kgQv661SyYNKETRoEuQHUTy1r7dbe8LsoTA%2FIQlobHXYRA7OJtozBdw77suhgP8l0GLafTxLLeUOqbUr3ineYrUjs1pLsQMOrI%2FMkGOqUBXNZtnPfiair2f90GQMru1rrSdGuPit8hJI7XEtA1%2BiaMohWlqfeZaMVdWXtR0QPI39x%2FeTIe9ywq2A2r0c5BfnY0%2BiGopsPFXVF9t0DEYhlQvBISjF201PXB45KjK4sq%2BuSAqYG3PkAzq0h%2BTAAkz2MLYzqIXFomDtAGIqHOGIkoPHSts8UgNp0EXAMciG6jNikSbsWquXJXCiXDNUZ7eT1gsjK%2F&X-Amz-Signature=a3640bdf3ee82b058f54d93f36c482188e558d26aba86ce319ec9509da6b8b73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUJ3FBEW%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIDXLiULEwWxKf9%2FShv2%2B%2BUrKkcUkqrDs0F9bI8UE%2BtXrAiBUiWDtb5VRvmO5Ozez3InBgzZW0vaArjwSW4eKrq4iJCr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMF%2FwpFl%2B0iJ%2FV%2B3cEKtwDjkHKt01VUDBOjeCqN3ugFyckqYnZeRSWu7Y8l%2FkY%2B%2F%2FpQVcByuBwEzf4HlRI5kXQiO3SID7obXzyXZ4zCY1Ds9XnLwSO7L1DrLGKtxItGYcuyWWk%2B%2B2%2BaogWe01DpwumIavGt%2Bg71J3WQJsPr%2FFhUJ%2BvlWv8YKO57cYsT7GhqhBSB70SAknLPS1gBk33%2FPQ4q9jB%2BHIVblIwH2G3DOugZyWrqhxaMUJlUug7IHKr8RfGFBuXlbWpD0OP6WBSO6UkV4ogyP7gYU5QHStTZC49LMvcQ%2FCSYhWJ6N7MdbG4B7rFuUGUWqpojmbeziI6D7FhTK1n%2FezTuV2d1VlmT6vK1AbsruENt86MWGU8%2FJ%2Bh9493RzjCK4YptM5%2BrPqJFQl6cIDeg7sAaQNe7zqvMraTrTi3fxjYrjeiV775Dys04yM4J2SovwKvQrhTCs8a0HUnUdILp6yJ3elfW1osbyJhfhGOs8hidKcpbcDrLKqeHrandcep47nYkU%2BvBO4aNM8UX66d5XxiAmqgbRd1RsZRtZT0VZByp%2F%2BbYxTUqBDnaNMF%2FSuLNwkU1p6Zgu1NgXDVeBxan1mCqRvfRp0kcRBtFWK6Q02Ys3iUmtv4GpCru1TUTOzHu52iRCF1VmQw%2Fez9yQY6pgGh%2FY5PizjYRdlmKc8B9xA%2BXheQmBDM8Vxp8BntZ62qpCseFJvlHfIK0mhke9ImBBknpWj1tF0iIXoNXXZZspaqZMVyndpL7XzhpBsfNRPUvOiarzhdIin73Xla41mFs02YT68%2Fp8Tpzb7gBFmGcyPvYJO4KRlM%2FnAfqKFA08ucCyP%2B6J9mjwWu12Lxki5mR%2FsVYZ7uf4XdRp7r9cAAB8IbyD1gstwo&X-Amz-Signature=6307ad5fcd66acb2805cc2e6dc7af53b54efb14b5e97eddd3d43f61ab0ad0331&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUJ3FBEW%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIDXLiULEwWxKf9%2FShv2%2B%2BUrKkcUkqrDs0F9bI8UE%2BtXrAiBUiWDtb5VRvmO5Ozez3InBgzZW0vaArjwSW4eKrq4iJCr%2FAwhEEAAaDDYzNzQyMzE4MzgwNSIMF%2FwpFl%2B0iJ%2FV%2B3cEKtwDjkHKt01VUDBOjeCqN3ugFyckqYnZeRSWu7Y8l%2FkY%2B%2F%2FpQVcByuBwEzf4HlRI5kXQiO3SID7obXzyXZ4zCY1Ds9XnLwSO7L1DrLGKtxItGYcuyWWk%2B%2B2%2BaogWe01DpwumIavGt%2Bg71J3WQJsPr%2FFhUJ%2BvlWv8YKO57cYsT7GhqhBSB70SAknLPS1gBk33%2FPQ4q9jB%2BHIVblIwH2G3DOugZyWrqhxaMUJlUug7IHKr8RfGFBuXlbWpD0OP6WBSO6UkV4ogyP7gYU5QHStTZC49LMvcQ%2FCSYhWJ6N7MdbG4B7rFuUGUWqpojmbeziI6D7FhTK1n%2FezTuV2d1VlmT6vK1AbsruENt86MWGU8%2FJ%2Bh9493RzjCK4YptM5%2BrPqJFQl6cIDeg7sAaQNe7zqvMraTrTi3fxjYrjeiV775Dys04yM4J2SovwKvQrhTCs8a0HUnUdILp6yJ3elfW1osbyJhfhGOs8hidKcpbcDrLKqeHrandcep47nYkU%2BvBO4aNM8UX66d5XxiAmqgbRd1RsZRtZT0VZByp%2F%2BbYxTUqBDnaNMF%2FSuLNwkU1p6Zgu1NgXDVeBxan1mCqRvfRp0kcRBtFWK6Q02Ys3iUmtv4GpCru1TUTOzHu52iRCF1VmQw%2Fez9yQY6pgGh%2FY5PizjYRdlmKc8B9xA%2BXheQmBDM8Vxp8BntZ62qpCseFJvlHfIK0mhke9ImBBknpWj1tF0iIXoNXXZZspaqZMVyndpL7XzhpBsfNRPUvOiarzhdIin73Xla41mFs02YT68%2Fp8Tpzb7gBFmGcyPvYJO4KRlM%2FnAfqKFA08ucCyP%2B6J9mjwWu12Lxki5mR%2FsVYZ7uf4XdRp7r9cAAB8IbyD1gstwo&X-Amz-Signature=6307ad5fcd66acb2805cc2e6dc7af53b54efb14b5e97eddd3d43f61ab0ad0331&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLEQM6LI%2F20251215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251215T025134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJHMEUCIGh%2BvyxF8hDCouUuRQR4Taf4oWjxBiiaVsYU%2BTXbOLVcAiEAgHupsdI7XqJ1QbjsvBuJXKrKAefQers6wswsw2u0C60q%2FwMIRBAAGgw2Mzc0MjMxODM4MDUiDLIlzL7RLwp4yt%2FuSyrcA75XGZvfTSeB%2FPrRyJA1DaE6MY8r%2Fivbpa0pV7abSKRktbpbJ0IPea96gNd1%2FCefRIonWNOLZWluJl2R35vpQHxEeKs2cJv8hvs%2BEL0ZIXI7kPr3KhASksniZ8IC7ic9BTsjsZ9p27poqOmUFQXKgThF%2FuK%2F82338p4%2BnVEtXywxNKnepnE%2BBNjAmPInG27l6Fpt5%2F9dPE8LK4jmznJdP%2BUr4xi9Z5ZWlRQN5FPF5bAKDNkOogH2N9ksntSKVDMInaYiKvv3sjQtNwm9urEd4r7ntOdOXt1GTuRt9JD%2FWeRLtlDqjD%2BQ2R6Z1AcZLwzligdk5DHYo0J%2F9RcPSnhzrx9rqCR72NQKkdUIX2KvSUAUgskoQxaNnjj%2BSh1ItgrXKXMJVxEjToetwbJmCradOml%2FHn6pQvGSviTSMI09bUbb1LWK0mZrq7tL6qVxFKWnvNM80weeN9mZpJBQkmqBcVldRkShP0lr9rMqkRQAsXXoGgFD4wO5RRHj%2FKXqjh7Puin1ccEKn5WPu70KQJl8UnWcZyK8ZM92tf9HYCWts6%2BLb8oDU%2Bi%2BzP1rvlpEcdHvlPO%2FVmikHSwmOOL%2BbMnwBobL96nv2pamdZQjvsrNQK4D%2Bjo0MIdCCZ%2ByA650MMzs%2FckGOqUBVAZtAJE0Hi0aZ%2FgtUjzIZMUTvUqCAt0C6CwWro472aJM5Bl%2FiPPjSgoPREME0pBOS7T1g9u3Bk1N8tfkFDOtUg9EIk2qhzQk%2FCKXmrn5MKoSBwCf%2Bh1zetQJBZf7o45VCyqUEPxkgvx3Ls5YabUeo4eJAx37L%2B9QS8EfKYzlNoi30OEgP3%2BVgcm7PMoZoEZ%2Ffet8w99Ds7O7XoqpBzbFWBikihSj&X-Amz-Signature=6c881330b22abdc5765eb65bb34c33139fc803e8cf0e86cf40330f92bdfd67d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

