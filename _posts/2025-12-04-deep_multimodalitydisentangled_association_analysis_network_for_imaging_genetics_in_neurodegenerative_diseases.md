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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7LLSOH3%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDz9qwf3Y2MkPwjIk6qTOLtCPA8h0sjP0KHjGnVYhtWPwIhAJOeVKtkC43C7famRyTB8l3y1n1Y4BZAxtNXpLmeRNOQKogECJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyAyly7VpCHR4TypVcq3AMEIaZ3DUx0gKVNGY0BDVoGruoc1OSyObqVCAL5%2Bwt0XUigK55Xt4FlEfD2kfyUP%2B%2FhxVu%2FshFDuP8%2FO%2FYByulYNyZzVBWWMlwPjbnpThzdJyGAitsb3mCNfQ2sOqoqy51WMrSJafg0Z6YsGIO2zTMuhdxot7WrDFwuWjOlKEk8vV0eYRzq8t2hblF4zgWt5h%2FiCf0DXvgxhwL7qjnk9kETHISaDRc8nrIqq6wonVxXsnuWg2UihBvCHx745ipI%2FQEJaLhoSgzL4V%2BAwa0yER5cxqXPcLnr5F%2BWDIJ%2F5qZTYAlJEI0AAL89ppEqYcb8QFZ2G3mHIAekcq9rUVh0ZQCIXKmzEY87taUmwPyqALKW9tE4bUN9s2FTew%2FNf%2FY36UN1RycbmIb5vqCNIeCPSWsEgSE95PHv9xaJ0jqB%2Bdtyu6mFAkpkpsQG6%2FU3wEiX24BbsHcuXKq6fo5HrczaSQcAnkeSGp7ZDPUifJ6rJy2LPL8NVCWYLRvbHR5a0gpmGZjMS4xKAovM5H7yJMKsWvsMF0fr7loWk%2F%2BKif%2FzK%2Fvrymh4slLXNuhqR%2B8jc0nv2nWs8ICUfYfjmst0EfT%2Bh7FRSFjr4ncEYgiFX6oBrEdHC9tgC2kH53lNmfKCIDDM2IrOBjqkAQtwdvMZwnftsN7MEYSCSYBTwxmEOHQKqKrqcV6TJWjvH8HwY7NGU4LSudwytW2JUYNY5l1ENFVu4yS6%2FKXKv55Qu20RXIiUhzm49RBbXBGXBx%2Bin%2FTJa08Q0SFORvLxJMHamzTwDcVCXCIfKjb3T3eHWEN97rvpqAoT%2BVJzR78askOCuVStSclQpNkruRaO5x%2B9uMelrMgCJ14bOd%2F1drgEaBkd&X-Amz-Signature=708bffbf01d254f717c20f9aa9054cb9fc5fe9754dec09eda83a04037897c0e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7LLSOH3%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDz9qwf3Y2MkPwjIk6qTOLtCPA8h0sjP0KHjGnVYhtWPwIhAJOeVKtkC43C7famRyTB8l3y1n1Y4BZAxtNXpLmeRNOQKogECJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyAyly7VpCHR4TypVcq3AMEIaZ3DUx0gKVNGY0BDVoGruoc1OSyObqVCAL5%2Bwt0XUigK55Xt4FlEfD2kfyUP%2B%2FhxVu%2FshFDuP8%2FO%2FYByulYNyZzVBWWMlwPjbnpThzdJyGAitsb3mCNfQ2sOqoqy51WMrSJafg0Z6YsGIO2zTMuhdxot7WrDFwuWjOlKEk8vV0eYRzq8t2hblF4zgWt5h%2FiCf0DXvgxhwL7qjnk9kETHISaDRc8nrIqq6wonVxXsnuWg2UihBvCHx745ipI%2FQEJaLhoSgzL4V%2BAwa0yER5cxqXPcLnr5F%2BWDIJ%2F5qZTYAlJEI0AAL89ppEqYcb8QFZ2G3mHIAekcq9rUVh0ZQCIXKmzEY87taUmwPyqALKW9tE4bUN9s2FTew%2FNf%2FY36UN1RycbmIb5vqCNIeCPSWsEgSE95PHv9xaJ0jqB%2Bdtyu6mFAkpkpsQG6%2FU3wEiX24BbsHcuXKq6fo5HrczaSQcAnkeSGp7ZDPUifJ6rJy2LPL8NVCWYLRvbHR5a0gpmGZjMS4xKAovM5H7yJMKsWvsMF0fr7loWk%2F%2BKif%2FzK%2Fvrymh4slLXNuhqR%2B8jc0nv2nWs8ICUfYfjmst0EfT%2Bh7FRSFjr4ncEYgiFX6oBrEdHC9tgC2kH53lNmfKCIDDM2IrOBjqkAQtwdvMZwnftsN7MEYSCSYBTwxmEOHQKqKrqcV6TJWjvH8HwY7NGU4LSudwytW2JUYNY5l1ENFVu4yS6%2FKXKv55Qu20RXIiUhzm49RBbXBGXBx%2Bin%2FTJa08Q0SFORvLxJMHamzTwDcVCXCIfKjb3T3eHWEN97rvpqAoT%2BVJzR78askOCuVStSclQpNkruRaO5x%2B9uMelrMgCJ14bOd%2F1drgEaBkd&X-Amz-Signature=708bffbf01d254f717c20f9aa9054cb9fc5fe9754dec09eda83a04037897c0e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466567S4CXC%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB%2FAL783bk58QwQoaN%2BngxFGe66Tq6A%2FcomPhVirOM6kAiBSuS5t4EUzNaD%2FI3O9WJKU9s2J8VYY2en88drAVVTQpyqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMI5Q9esL1Eld8GA5aKtwDJCyDH5eA3WEabAKOT8aD4cBVEfQ7CzbMj4RhEQNyQ0dRvQwPuumeZv05t4cSDzl%2FswZ6mq5X%2FmL0xMEZRYnLrPNINu7epZSHYpwIhOGyII1tWf5i%2B70w2FJqDsyrR2uR3DHnHbdr93kna2OHDX%2BbJWK0XDVnyo7TKVaSZw1l1nJtD5ZEOgzLgXkXs1%2BDl6xag31hqvRiYYB1Ce6jnbDCzyvl99P9q64iMH%2BvY1mcghfxF6EU6hL6fGjG18cye%2BJci0exqbSGAx9JB81sHqxNU8pReQjwloqLB1kIWp%2BIMHD8iDCfnu142A5%2Bm8k3VTW94sde5g2vz5c6zUoHON3%2FfZQuhkbFGemZTJRAugsUbnNmJN7Ct3ikH1S%2FQhzPJ9oBOwniDV6iriyxbpoKx%2BT%2Bcg%2Fw9per%2BsMxEQ8tiVRL%2Bj%2Btu7EtbA133iVHyQKGlAZAlDtqaofWlS5j5vUOd6JokeN9VR4fTQgyObTNPg4z%2Fw6th5jAcGLQLUPv3DHZsRjdhGL9ovrV6gWMoW1R%2BeRoFiaucygdea%2Ba8te09kSIQowygwia6PtICnbHGPReHDAUMOd2ErorB39Z6jsLykcdVPWbw7r%2Bga8o1q0ihiC8medGCp4vtJBfcNgFPzEw0%2BSKzgY6pgHrCWzsHqsArC5Nbj0pfr4TJmqLDkwH2lVnLneobQ47bCGjNqIRr%2FNma7xqT1PqG5yRKZZqn9lUTUl3kj%2B3evHT3OOR7gMs%2BOyIhpJHX8KQKrtSEsb1EOyPZ2SrZDO5WSBLnr5AU4%2Faf%2Bz4om43vIU5zgywM4lEkkw3Pf9jjkIP0pzsQLrH13aN%2FOmwXkN2xRVioicPgut2fPF22BzTuTHDY1uUt0rz&X-Amz-Signature=dc9c478ad707bde29473c441992a64cc0a1739352de55c427cbf6451249d0584&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633RYWQPQ%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCcMB8S%2BIHMHFxaAirNS8d4U%2Bt6tNCZyoCPTUEAkWJK4gIgUZGA8DF6Y4X82XwyG4ozPW5uCEOrM0wwtBIIrmdRlwQqiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIpAJLrp3AXMAUc14CrcA9Idl27nyRtfD1tssLLaPkhLPZ5hzfXX2xJTo%2BSSp2%2FRcRxuhcOfSx4hkCqr9%2BePJ3LwOjcxMrwvBv0OrqynIAdyzzbF%2B%2Fatn2WJS3eO%2FRHXAbV7eZGQGzr9f06XiQuVZgF2MOSJsPkNeuNSFBGaNu4XgU%2F4ckwo2Yp7%2BKnYxhfIvg%2F5azH4ZjuOFlVP4Tdrifmu3s3rhlJnnL1TFdhlzl2IzfA%2F%2FeBlMdhcH6Efk91LRTAR9Kmo0zgJeLdtu1Y1wC%2FmXpDE6TwqI7VStUcfOZw0Vwl5RaLs414iYA%2FwzUfEIXiDl65Q6nhPBSOZNmoP2xKYwFFd8%2FSVlEw6O5fImEjflDdUkuUi8edgn6ZHyxhfThmswTqS8RbebncEokq2q2Ahj%2FD85ouhX1HP%2Bdjfp2ZtiM0CsxKGg7LzTWncbtCZvYekqrgGInjYynWgcIy%2FWoRbq3LwuzdZ5WQ30RH1vpnvFsiFoV4Gco%2FQtKH%2FliLLeHIQUgm5DkKCtAFLxeJ03Ge4vaUcolQBfDMKX8hDH0gPwqM438JaCQXPM9xQIP%2Fts7tqt8PSjtpcQ%2B87lE7z0uLPSxLZNsdmoUK4Ebu6s5Lo7fHvIEUaegm7tZ5Vcz%2FJ4MCD67WPy5WdpN3gMIzkis4GOqUBCxQQJ5NvX0iVW7i%2BMQ5trmVhaK%2BPqdLTOUfvvcr%2BGWgh9GdXfzbZXduhNoRaIpk8XInxoZrzEQf6atCmpIRDxdIBHLhXTrgBZlB1QWgIYIqQ1MOb6AbYuyPAqiH1uLadR0ydACT8rbLt0rY7HN5GLEEubsRrKylVy0s9Ujb%2FrXM7re9BdIjRjqdLILWWmvnuBXIZXEThbqggv0RKQlhYWFx%2BQP%2BK&X-Amz-Signature=afbada38ad9b94082e0bd4bf879712a677c308d8522c311f231c5f42915b567f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633RYWQPQ%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCcMB8S%2BIHMHFxaAirNS8d4U%2Bt6tNCZyoCPTUEAkWJK4gIgUZGA8DF6Y4X82XwyG4ozPW5uCEOrM0wwtBIIrmdRlwQqiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIpAJLrp3AXMAUc14CrcA9Idl27nyRtfD1tssLLaPkhLPZ5hzfXX2xJTo%2BSSp2%2FRcRxuhcOfSx4hkCqr9%2BePJ3LwOjcxMrwvBv0OrqynIAdyzzbF%2B%2Fatn2WJS3eO%2FRHXAbV7eZGQGzr9f06XiQuVZgF2MOSJsPkNeuNSFBGaNu4XgU%2F4ckwo2Yp7%2BKnYxhfIvg%2F5azH4ZjuOFlVP4Tdrifmu3s3rhlJnnL1TFdhlzl2IzfA%2F%2FeBlMdhcH6Efk91LRTAR9Kmo0zgJeLdtu1Y1wC%2FmXpDE6TwqI7VStUcfOZw0Vwl5RaLs414iYA%2FwzUfEIXiDl65Q6nhPBSOZNmoP2xKYwFFd8%2FSVlEw6O5fImEjflDdUkuUi8edgn6ZHyxhfThmswTqS8RbebncEokq2q2Ahj%2FD85ouhX1HP%2Bdjfp2ZtiM0CsxKGg7LzTWncbtCZvYekqrgGInjYynWgcIy%2FWoRbq3LwuzdZ5WQ30RH1vpnvFsiFoV4Gco%2FQtKH%2FliLLeHIQUgm5DkKCtAFLxeJ03Ge4vaUcolQBfDMKX8hDH0gPwqM438JaCQXPM9xQIP%2Fts7tqt8PSjtpcQ%2B87lE7z0uLPSxLZNsdmoUK4Ebu6s5Lo7fHvIEUaegm7tZ5Vcz%2FJ4MCD67WPy5WdpN3gMIzkis4GOqUBCxQQJ5NvX0iVW7i%2BMQ5trmVhaK%2BPqdLTOUfvvcr%2BGWgh9GdXfzbZXduhNoRaIpk8XInxoZrzEQf6atCmpIRDxdIBHLhXTrgBZlB1QWgIYIqQ1MOb6AbYuyPAqiH1uLadR0ydACT8rbLt0rY7HN5GLEEubsRrKylVy0s9Ujb%2FrXM7re9BdIjRjqdLILWWmvnuBXIZXEThbqggv0RKQlhYWFx%2BQP%2BK&X-Amz-Signature=4369c985e5d000fa6c8f3074b7607613d30d00925c907a43f442ba953d5966ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJ4U6LLK%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCgKIdT9Gl8DZ%2B056IzZ9iUEEzx0W7A4SCYCWPye0AJRQIgN0Aiaty5nLvCgOadLuDYeOjglTtXNyL%2BVlHi75KQw%2B4qiAQImP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMncaCT8UTy0AwxWeSrcA8awi%2FG%2FWtNN5yE%2FX2sP5fKKMm2ThT8qJJqsF7x%2B%2BxT9kllcR0K6O8ff67ITpmbETAKI87uubp%2ByFCXSglnom9JP407Kro8QJ6NNk34AnQNSo5YBS8Ozv%2FTuJT84Rt%2FtwIOPLjUQBBgJeh4EyWpyY7ajDU2pgs2yUq731w1LPQBr9tYPh%2Finh6lJjc7hJ4cMNMZfDkjEHlC9w9jqYAyqUImPuILSQpNQ8tQt6xnzHKiwUHbpiblcR5WtJtlCTMygbxflrQlj9oNcKHz3WViPMauPc4X9L3bfoFb6Q3omhQ3pkLKNUsEFLZAQT%2FzjYOkYJKdaHInHZgxzdC%2B54PVRu9df4Q%2F5gpE9Qwh%2FMiSlhtaOPAuDf3lq03Yyvgs13ztYpkGvFQc9Z4MgDWRu97u1HeEspfAEZOl8msTicCLpL%2FC7rVFCfeduTPJOUn%2B7nvWv18ceJoGPEH1bwf6TFTF83tM0JYvowGNY8jg0DrdLWFjEiPWTEOFNYJN%2FFG3PAoo6l7AjmoIRzzX6T1koM0ZkYD661nSqK5a4%2F5ugOp3BayYtprWsxaF4vknvBnQWcHP6%2BIoOOhYj9hcHRtThulsj2hXQaF4Tlr%2BVYFrx7qNqCdJAtqK6n1%2FZfqFPOZdUMMS%2Fis4GOqUB55PN4HHRXdbntNQ%2FiH6Z6vpUFtef69R79AqvIHonniT5pw3HT8Ei%2Fh63PzkNjYXAZv2NIzCCUPBRxCt0g7GB68%2FCz7CWzwv84HGg15o1lDKDiyVJ9AkWYsFaen5CcwE0I5bBwOAiVWFYpd2llaSzo1TtZf6dxZWSjkV2Q0Bb0VLZlVG6JRAGJ5XpUbTwR4uk17tjZDYd%2BmhIIFAabSKVXCexsILT&X-Amz-Signature=747f1050cab765090fa1b7af5bc746ca927338c36c52b7e42aea2c154e3b6580&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RG5ODRK%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBSSiPxdijX73VMM8f8QiDX6atawBC%2BIZBJTmugkhQCtAiAe9p3HKKAnoDz3SwGrBDPdiZIN6LfPJeKvyzmW4aM0UyqIBAiY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkSv4NcuSy1f4Q9XIKtwDwn9himqgt3g3XAeDPIQDnyEC0lpE4%2FRKnqF9pV855uds%2BzDyCLhYb849c41DkEMkt8lGjkB%2FtnND%2FBxub0ejaU50eL2n09GmR0hdsMPSwOHPVDRKIcElD68aY3WCwBxNUnBSHPvPkuO4qfqHXFLopBKjbsha3rctKt5tZhnYM%2FdG%2BpkHylXAMtBowQqpoStV2UtNq0KgASqn3N%2FrFmQaJ3jS%2BHBtKARW5KMNxstZJCEsxHcn0h6cTi9qPWe8uLt2HcJ%2FHS2xjYzEuiP3U3i6KKj0wfksyRSXxQQfsmqnxxblXq%2B2GiXhhDHjq8MRACRzGL60wuKNq%2Fb504qme5%2FXnxgPG458AatDLLTd3KLrYMkPCG3zxvsZcXlASBdXJ9Eiq%2Fx6l7CmZHnk6akiV74g7IXi1QlF7lBlmM0%2FMuwkja3FIfuibAdZvvtw%2FIQRZJ96V4z%2FLtRLNveA6G0NAuboT0htbzzDNANcHsYGgFUk%2F4EMTYLwk36j9BHxdhYg6VW23wkDmvS559p50nssztuYtt%2F3mbh3gJpHga%2FZcvIlYcNcWvKpsTjhO%2B55taeodzmiSFxXCFKQ0AC3gN3DabeiIk49N%2F4KTttOBilWlNFvH1IR0EowWONwWhU%2BMxEw7L6KzgY6pgEi5Sd%2F4CTkwZ1vRb8JW3QVFcXs2qg9YiWIcBNB59Ol9QzVVbsGAnibtTEpg%2BUW3N7v3oNcE4enfwCelQPglackSyW6oPAJNOu245WHBz48w0XhmfzWzXdEcPB%2FHow4fSU9J%2F9ZX3pni20DcvjkuPPhQBHbCaDAMy8SVM%2BmPVALX3u%2Bj1UTU4xDysiuy0P9fezDaeQBO42cUP%2B6%2BOfWMqk6L5tR1A3m&X-Amz-Signature=7aeda07648aa37828cea2eef282f955103161ae6dadd49c766f832faf42ae31d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPITR3GH%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155248Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCqn3k%2FfT1mLGJvYOS1zgLkPIOLHMOA5TjurCr5vRnDdwIhAK80ug7Ak37ymh8Tgy4ecf7ve1gy8LH1S9CWRjysm2z8KogECJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwCLLV49iTRyogSYMMq3AP%2Bad4NMEGJbL4d%2FffUuxadXTN2uyQmzrvfuxRp3XaWnSujK6pXPtiuSCQYzaMDChdzvn2LqrxQiUJBW4fnnekcgDNslt0%2B4JKqE7RKV5txUZqq7Q%2FZOTI46nstXmRfW00n5NAT7%2Be3rvx2Dl67U%2Bd%2BiX5D2JaJ%2FuaQrvCwkip8CTTIMG8qqeO0ZX8sH2lrW10bBgk54hsz6ffa2B%2F%2FFkC8wo0%2F1mC934ZIG3Gm0ZLLOoO1cudwL1k4KSg9KMsHGBg5u4p%2FrMaa8uktT0%2BbF7RHT3KKv48TowkhCMzH1TOqfAkBIQC0O80QLAHG0N2bGbYCOzuwfySFBrY3kGY2pOM8XAt0R6PdUgwuY4blS2aJikAkw720YKPv5kg6FpL0fsbYzX16OIwhwFsa1sz5YrDSf%2FS2RS3r%2FtH3mJCR5tMPkYl%2FHWNIHTHUT87IenbUCIJyWU5pPhCXaZg8mKZe9CN8ZpFb0U9V83%2FY4uQAwBOjhY8%2FVSgJUfK77tMNEWr4FpI71S3lTASzrOc2RlcN7xp%2B%2BfXIf%2Ff0tgjwWAk46MuiZ5PypwjTNoSOVD8AswigO9Q7D6wRRHzwBykV6qwXTSIz0SKkJekTc6zOThEfxwCoLMpkF0Ec0zE2lS9lWjDDv4rOBjqkAX%2BoVKn%2FiH2JxvvyN5ZEheKIDj3gW8kGSa5MH%2FwMfBuFNMNeM6uk%2FobBeqJs4ZSq7AFxsVZLZN48Jy13JDaBZr3OUiGy3%2Fm5tRIKBC3DoE5aGo8T1NP%2FDq3uNDa44xVusL7EjOsp2QfIBkwWNGetX4LV1XtoTTYBdgRySzFXwp%2Bfvm9Y2k75Mw6cTo8lJv9EwPIeM9QKaJwtV2jBerZhvICXHNQq&X-Amz-Signature=a13169cdb01b4c5d93bb321f72c929a9d95fd51a0486dacb1cd40c5b344ce782&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKTQHAFK%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBEBDbOHxlsd0LfHm2r9%2B64dwq%2F%2FtxhmDbdZfzkJfjtaAiBcwm%2FI5sHs6iA5UnabkM0TBajmE8ideUtqawRgkugZkSqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbAaQ8edRkyWgOAOwKtwDJO0PPGKfVHgC1auhpVQx%2FRbTwZNpjwUXzg%2BnKyJujhotWEXHmMRlwhI17iCKWhJ4Eh1q9vrhA%2B46M9fUhBmG6cOUG2KcCcIxE%2BjgIEsep38n0L6B1NYemIq5Oq%2B1tYHdPUnh0RpbWapEAzbeitRusdtWkd48WyYFEzDtG9MLZ8ivrR83aJgDvwMSX3WQjX0e9TWZ57PH4NIFrGNJn2V4uUvY1a6iZCkrviu%2BrYS4%2FNU26uBoFpe%2FAzZGZLUnGT8CVvPnuONBH3QNQr6ueFzPYMQtYx88fm6R5lCGfrheGtR%2BSJ5di8fIMq3cu5ujK002eALM7T5%2F%2FohySQNM4ElfCfkU%2BFqX44P1mz%2FwIgvkD6mjRau3H%2FG21q5bX%2Blh%2B%2BSSkwWADb%2FW9QYu5uMPjTp%2BLoG268Glp3kVQlXjIr5K5%2BhhzjR6d9Q2r4G5VWRZbaivodZC%2Bj%2FCpHKnSmm9QP6ZZeSvs5EUUGCdzGe%2FAryJrN2YjiiVgcbGneopsdC%2BdcJgzngIFS9XcYdiMkJG7LMGUZD5kp1RCXnUB6Uz6mpu6owDla%2B7Fg%2BbnXt3heqMavnFjJeUscYkBNGIjc3e7VoCicNPcoctDBkANWqtPkso012g8fuFyhsKD5zXsJQw5uWKzgY6pgFWyODG8pUivsuHhe0rw%2FkcEXIPi1QrCsFweRM9IOrEPXvddpdDM4C7r8KaFXiFCxbK7Fw1tngjwyW4BdJH2rhnc3yKgEM5gO5i8ljJ1pYwIA3HLducGVAGskIpo%2BhRNGRS4yCOhA4Ks%2B0B%2FpmUfyi03ePhfjuzNyrRg1B8uP%2FgkboQhOrP9lkwodwvPN5ScP7cnEQqzshE3ce%2F%2FldbzoujkoZbROnH&X-Amz-Signature=bcd13bef9e133b5ed36152b9bb0c7fab4fa0bd5c42e5a0cd77a0fb5d5512a9b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKTQHAFK%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBEBDbOHxlsd0LfHm2r9%2B64dwq%2F%2FtxhmDbdZfzkJfjtaAiBcwm%2FI5sHs6iA5UnabkM0TBajmE8ideUtqawRgkugZkSqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbAaQ8edRkyWgOAOwKtwDJO0PPGKfVHgC1auhpVQx%2FRbTwZNpjwUXzg%2BnKyJujhotWEXHmMRlwhI17iCKWhJ4Eh1q9vrhA%2B46M9fUhBmG6cOUG2KcCcIxE%2BjgIEsep38n0L6B1NYemIq5Oq%2B1tYHdPUnh0RpbWapEAzbeitRusdtWkd48WyYFEzDtG9MLZ8ivrR83aJgDvwMSX3WQjX0e9TWZ57PH4NIFrGNJn2V4uUvY1a6iZCkrviu%2BrYS4%2FNU26uBoFpe%2FAzZGZLUnGT8CVvPnuONBH3QNQr6ueFzPYMQtYx88fm6R5lCGfrheGtR%2BSJ5di8fIMq3cu5ujK002eALM7T5%2F%2FohySQNM4ElfCfkU%2BFqX44P1mz%2FwIgvkD6mjRau3H%2FG21q5bX%2Blh%2B%2BSSkwWADb%2FW9QYu5uMPjTp%2BLoG268Glp3kVQlXjIr5K5%2BhhzjR6d9Q2r4G5VWRZbaivodZC%2Bj%2FCpHKnSmm9QP6ZZeSvs5EUUGCdzGe%2FAryJrN2YjiiVgcbGneopsdC%2BdcJgzngIFS9XcYdiMkJG7LMGUZD5kp1RCXnUB6Uz6mpu6owDla%2B7Fg%2BbnXt3heqMavnFjJeUscYkBNGIjc3e7VoCicNPcoctDBkANWqtPkso012g8fuFyhsKD5zXsJQw5uWKzgY6pgFWyODG8pUivsuHhe0rw%2FkcEXIPi1QrCsFweRM9IOrEPXvddpdDM4C7r8KaFXiFCxbK7Fw1tngjwyW4BdJH2rhnc3yKgEM5gO5i8ljJ1pYwIA3HLducGVAGskIpo%2BhRNGRS4yCOhA4Ks%2B0B%2FpmUfyi03ePhfjuzNyrRg1B8uP%2FgkboQhOrP9lkwodwvPN5ScP7cnEQqzshE3ce%2F%2FldbzoujkoZbROnH&X-Amz-Signature=9dcf849a7725144e96baecb3c69613c5a77453ae52be6ae57bd0d2a61c99b8d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXETTWX3%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEnVwyXnnWkEQXZvz6TvtH9Nio5HAlrTc6i6I8z%2BygG%2BAiBnGiNQaQO4EiCGgh8kb9CT1IL2be7orre%2Fv3Zq%2Fs2fDSqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMg2XPRu9X9ECTc86SKtwD1ClE%2BhZ96YzHACkLyx7JqHOwTmpuURwCigp13XQo9sMhQWbfHrxJcjCBPkNCEMdb4ZKZxxrzZip1MH9MQWkGrzHgtQi1MCLXZrri0GVSzleH9whfQr0qZNAHS7bF6uIjpLEe7XEbrchNoGHDkFSkdiEPiGtqD4FrsEBw%2FpwS%2B818WY9rQs0R8Q%2FMBHsnUXYWoozHVEv4jqC2kT%2BPiJf3G%2F6HtA05DbLrL7fBrcHKYJcd8Xid6uQyBFsthKGL3mLIbwtP%2FM%2BYZ4n04D6x6Iur7q2gtDu3JMW36RVByx%2Fs1Ur6bCoUVP3NgtNTvFZ1QCJmZn0jrmfLRrRK7%2BqaPQrpRemx5H2eTXYL5B8%2F4jjFAzAjxUK69JS6HSfZHDOmJ9XNoMEc566gSZK13SrSP6g%2FP4namEyUWYpbLlTXW3gbDAWpwETci7%2Bv3Adf9WS75gJ9H7qKxAdJBeFRh52h6Flitq5yt%2F3c2AKQZbBM%2B1vs5JshSmKG1%2Fh%2FETiZlU%2B%2FXwZdzc5J3UwgHVgIObWG6UTUw3dXP8OhRJh508tejrv493epbU%2BgldCsXUYDwcIMyXM%2FJJ7glsZIgRVFsTW7Q%2Frw25nhYSy5TrZ7SKH4ZIdDx%2FrEXeHnFqfS2dJ7%2FJww%2FOSKzgY6pgFqVBQ%2FrfOwCbPSodfgmDKxYDh6DP29Q1kkPR4T9osdDwABTem6TXgEEAPDwBO99C1z6IzqI%2B2EMY7RVGot%2FyFSxLMPILjseMg99j9TkE73RJ7nUtELefNfcaDe4h5OiycM9YsVoBAwI2W%2BzEd0yOPLMsovtvoTgf4TGddQZ3kML6QcFVrkUaqylX1uvq0N2gCMTgkj0sqEk239ITDJmwjCzJBSBCzs&X-Amz-Signature=fbf26c43a5b3394b6949cb1cd2eadf053604543ec8ab5098cdbb1f2b7fb78e71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CZ7DDT4%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF5dMpHS4xkk420Ck21wcVkgCRLA8ndBy4%2FyjIzlsGKRAiA6yKgeUvbI%2FaLfVfQeIlA6Dmv1l8pD0G9XJtzAoun1bSqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLuX18pCOdsOG0gL8KtwD9TAdU7Q%2FBbfttFZC0Lli26lO6Dnqa%2BFz4%2FGCjEjuwPZYMS%2B%2Fu73fAyCYu%2BTkgKJ2LAPNZxFMe3qm01185Aty9oG9OwUiov97NRZfMcV2O9p7wDCITvDPhF%2BVjp9acowyuYWlVxiOUpYHNpN4RNnPcQ1tPPiUePoOVRhDTPS8xRdpQccdT1Er88ICEPSV9BrOZyam8Pc6kw7dKzVM6EzS3CC%2BeFEICRcfcH3GnN9JJpmk8EWX3ohsx7cqGH%2FW2ZRtBEHlgCZsppBk0hM4MMvAyYLrDP4nbophT9YuBxDgjyQl0everY6CXVe8K13AMhFoEtvH50f8B9GavF08KSf67y36GAilG%2F24KaH%2BKFAJBwkaW%2FREEWjveGCkKF66u5k7K1WTvwUHZM4hlr%2BZstWq6q6uZwAgY9lI2GIVtHXukMkMVQOkAhaP3g7z%2FUhPiVE4xIPW9szTFbq2%2BmcVACmeGSLm%2BMGHPgnOSyJ0W4xFJCcyX7QEc4AoivF7j8YOXKQI1vEA0PppHGQy9bR%2Fxkj7LCgttrw1COggLYYRNkmY2mTFR8aKqtZfBE6aFezkeE7Vq8PVM6MZwiBuJwE%2FUT1QCDJb3aOjyAzd9QTl1eH3CcgXwy%2FND9fYP8IqGaMwheSKzgY6pgFhAQUOydC6pXlTEXOJh6tKr2OA17VD0od4xk%2BlTfh8fOjFNTRcUQvgAcKy4yqF2x32DsN5HBuRDSn0tIODH5XkKJL66GMXzns6Ug8UlSRF%2FkIyhpQhSstCw1lSRELocrY10cn0Nzfr8pBTZMQ3ldhZ6hmweN3sahFbobYPVBH%2FmprrjDkU2i0TGfzhV4VOaiflVbVgYsZwwy5LHO%2BTYJyX3UiwcH%2Fz&X-Amz-Signature=0f530d8144f0c3928d07579c3872bdb0297c041b61d9021f154f6ee8e0edc147&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CZ7DDT4%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF5dMpHS4xkk420Ck21wcVkgCRLA8ndBy4%2FyjIzlsGKRAiA6yKgeUvbI%2FaLfVfQeIlA6Dmv1l8pD0G9XJtzAoun1bSqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLuX18pCOdsOG0gL8KtwD9TAdU7Q%2FBbfttFZC0Lli26lO6Dnqa%2BFz4%2FGCjEjuwPZYMS%2B%2Fu73fAyCYu%2BTkgKJ2LAPNZxFMe3qm01185Aty9oG9OwUiov97NRZfMcV2O9p7wDCITvDPhF%2BVjp9acowyuYWlVxiOUpYHNpN4RNnPcQ1tPPiUePoOVRhDTPS8xRdpQccdT1Er88ICEPSV9BrOZyam8Pc6kw7dKzVM6EzS3CC%2BeFEICRcfcH3GnN9JJpmk8EWX3ohsx7cqGH%2FW2ZRtBEHlgCZsppBk0hM4MMvAyYLrDP4nbophT9YuBxDgjyQl0everY6CXVe8K13AMhFoEtvH50f8B9GavF08KSf67y36GAilG%2F24KaH%2BKFAJBwkaW%2FREEWjveGCkKF66u5k7K1WTvwUHZM4hlr%2BZstWq6q6uZwAgY9lI2GIVtHXukMkMVQOkAhaP3g7z%2FUhPiVE4xIPW9szTFbq2%2BmcVACmeGSLm%2BMGHPgnOSyJ0W4xFJCcyX7QEc4AoivF7j8YOXKQI1vEA0PppHGQy9bR%2Fxkj7LCgttrw1COggLYYRNkmY2mTFR8aKqtZfBE6aFezkeE7Vq8PVM6MZwiBuJwE%2FUT1QCDJb3aOjyAzd9QTl1eH3CcgXwy%2FND9fYP8IqGaMwheSKzgY6pgFhAQUOydC6pXlTEXOJh6tKr2OA17VD0od4xk%2BlTfh8fOjFNTRcUQvgAcKy4yqF2x32DsN5HBuRDSn0tIODH5XkKJL66GMXzns6Ug8UlSRF%2FkIyhpQhSstCw1lSRELocrY10cn0Nzfr8pBTZMQ3ldhZ6hmweN3sahFbobYPVBH%2FmprrjDkU2i0TGfzhV4VOaiflVbVgYsZwwy5LHO%2BTYJyX3UiwcH%2Fz&X-Amz-Signature=0f530d8144f0c3928d07579c3872bdb0297c041b61d9021f154f6ee8e0edc147&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466565Z5O34%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T155256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCXrHj%2BnHA4S2frOB3l%2FrRk1gyJZv81QM1xeF9ONR11vQIgX0%2BLfvFtmETSnFUPj1TCZ1XRhNiDC0Yls05weYtzkMMqiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJRwgXFcYZREAA%2BSRircA%2FHb72eu04MX6AF1GSOvRpfjjT8Gb7iSbQrUfP3vwFB6He%2BnPnRGsFLepxIrpHtonVL4Y3sqTPBeK6SwD8f2H0qDEBF2K91yjp8fNTWnimIUozOmMb%2ByZAecOr8uhcizLiBLwgtZ6UZ7Z3j3EYM356Wrq93es6%2B2NIe5DCA4jgOc2JBbJqRKC%2FCZdP4fzCk4O21Kd1S8CQlFOs%2BKtJA7lieOP1SzgdSG8kXaVPfjyultYDfm3%2B%2BoqdoytxcaDGULpFjNCOyRjvG%2BVTT3pFWrhs5juXFUL%2ByLLSrBeJaMAL6SzRpgTH7vSV6BDmIfm%2BLxJrL6yL5Bmj%2FTVp6Zj1WNLdS3HeJcgDem9FjPX3jfmhJNb31dqYRjFbdX7RykD8MKXH0Ge1BR6y0Y3iX%2FeKrCDePuskW%2FE25LpestT9QZ6VVPvVQwcq9XUJMqRyGHxmpxFJGXWUnFNv4NxnOgf9jpjB7VbcnQR9VNS1BZuEHSZYLWgko%2Bo9bJQ0tYmMJ0sEFO%2Bxv7Ssdd045mr8XW3Iyqp%2BDycxbZ5aO%2FTO93leDCcGMy4hIXZUOslXavJE0nrkB%2B9wfb19fxBYIqvBDQ%2BwldAD%2FW6tigJt3u2e6g7UjoY1YeuvoSEiCEWIov2dqOMOLkis4GOqUBbSJ6HLYuB2ptSb7m90niVm0M8PQSU4AKjELMe5giGMrGh0wCzDLwbaf1TvGsmbciwPs9NwYqZ4wugSId2Hj9GOE%2BwaCayqNcqX9bRTQEfR0CdJ36slcTUoh1sbOoBmBHbsZcS39HVcJIeIp%2F4vm60KMJ0jSgY82P%2FlNiggzASARMVxqVrXLSb78Aeni2BRn08l%2FNY1eL2Gs4ztcLQkIlY2YY5xje&X-Amz-Signature=5b475346fa5b79e74445026d67d198e32e19e94301efcf4ec2887353aa76c7a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

