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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXMZKTN3%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCYzGu55DbDF%2F83p3VLiBhdzv1Bq403FcZeMMHuztormwIhALMYWs%2BZF1kNHjPVDLLWEOTO40OQNBRJqLwiQ2CnZLoBKv8DCFAQABoMNjM3NDIzMTgzODA1IgwscvpGx86LpjedKF0q3ANDg3VSRmunYLgcqXZLG4aEP%2FA4PUSg984O86k7J4NXsbMOwnBg5%2F977TfQXlPVwdgKS0hoAxg1Rg7BP%2FKDG4FsBKwNRsMPSzg6gk8eG%2FcdXJCmk%2F5f4gKpzb4HoMKoEeyO3ZnhEOy%2FAvZ82CxqLIiPYX9QT64w%2FaOwaXAi5i%2FspIQMMudHO2Ciwk5vSPcERvM537xZcIFNafhKN2aqtUpGtCtrhgILtG3HEKXCGPlAYZaRRNqjqMsB0HZQZNPTSiwLY1nFCa8iSeXV7GzaVUlozE0aqTlQ4RTd55Vbk%2FFR09lHp2izQ2XXTd1GdqjLzhKdo%2FgO5cHWMvBT81QeZdpLCxIimcqHBsDnnXX%2F78d6vtrgKyuyedkyfCJQQOAdRrpwjsL2Em3%2F022Gt8Gjo2xh4Za3ucX2UbsqCiaV6QcfCDSCGx7NYG2rVxGKUElqLByJbKrfS6u2dU83ziYSuGMgq4CbzKali15Ye5QFD3CsI76Q%2BOzBZiB2HbzMwD7JP9qlFlS7z8SE1Ev91i8YHxXHPM1PuyEHcWedSl9VEWQibJJzx23n%2B4eN6%2F%2BLdrhevxs2Mh54Pv%2BDwPKAXDPJh7DcfnFkWlj%2FxigegOw0Ip%2BDl8jj3IL0ofgw6Cp7czCh%2FfDKBjqkAa9Jhy51AldV02thtFnFLntCWV4JP18EoCWGGcOKOaD83jPPZ86vitmzLAdahSgqFtKixbc0bnf%2B1w%2FUIVTPmqmfLHMU7uazqtRkHDL6MdKy9A8mGzeXe2tm2InknHPpctMIkCXzog917bjcky%2FADiRW0OWJA9%2Fyt6U7Fr4rdWfposgvxghTBV3ffkJm7EdGPTFMVRqrEON4zHmHleEBy1ukwiTu&X-Amz-Signature=46a813a9d3d61d7345c6ef2d7324e4d381721a662d641a35b9d6b93775daed4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXMZKTN3%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCYzGu55DbDF%2F83p3VLiBhdzv1Bq403FcZeMMHuztormwIhALMYWs%2BZF1kNHjPVDLLWEOTO40OQNBRJqLwiQ2CnZLoBKv8DCFAQABoMNjM3NDIzMTgzODA1IgwscvpGx86LpjedKF0q3ANDg3VSRmunYLgcqXZLG4aEP%2FA4PUSg984O86k7J4NXsbMOwnBg5%2F977TfQXlPVwdgKS0hoAxg1Rg7BP%2FKDG4FsBKwNRsMPSzg6gk8eG%2FcdXJCmk%2F5f4gKpzb4HoMKoEeyO3ZnhEOy%2FAvZ82CxqLIiPYX9QT64w%2FaOwaXAi5i%2FspIQMMudHO2Ciwk5vSPcERvM537xZcIFNafhKN2aqtUpGtCtrhgILtG3HEKXCGPlAYZaRRNqjqMsB0HZQZNPTSiwLY1nFCa8iSeXV7GzaVUlozE0aqTlQ4RTd55Vbk%2FFR09lHp2izQ2XXTd1GdqjLzhKdo%2FgO5cHWMvBT81QeZdpLCxIimcqHBsDnnXX%2F78d6vtrgKyuyedkyfCJQQOAdRrpwjsL2Em3%2F022Gt8Gjo2xh4Za3ucX2UbsqCiaV6QcfCDSCGx7NYG2rVxGKUElqLByJbKrfS6u2dU83ziYSuGMgq4CbzKali15Ye5QFD3CsI76Q%2BOzBZiB2HbzMwD7JP9qlFlS7z8SE1Ev91i8YHxXHPM1PuyEHcWedSl9VEWQibJJzx23n%2B4eN6%2F%2BLdrhevxs2Mh54Pv%2BDwPKAXDPJh7DcfnFkWlj%2FxigegOw0Ip%2BDl8jj3IL0ofgw6Cp7czCh%2FfDKBjqkAa9Jhy51AldV02thtFnFLntCWV4JP18EoCWGGcOKOaD83jPPZ86vitmzLAdahSgqFtKixbc0bnf%2B1w%2FUIVTPmqmfLHMU7uazqtRkHDL6MdKy9A8mGzeXe2tm2InknHPpctMIkCXzog917bjcky%2FADiRW0OWJA9%2Fyt6U7Fr4rdWfposgvxghTBV3ffkJm7EdGPTFMVRqrEON4zHmHleEBy1ukwiTu&X-Amz-Signature=46a813a9d3d61d7345c6ef2d7324e4d381721a662d641a35b9d6b93775daed4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXNULMSF%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDTv6zO4LJ5jMTxe5bjNMPAjDhLbyMsaSRpQs914sdTsgIhAMV7sTIkHhWbNUrjvO5jF0Sil3jF5KiRCk%2B%2BpSm%2Fa%2BS9Kv8DCFAQABoMNjM3NDIzMTgzODA1IgxFIf80WMm%2F6njcKesq3ANnkFPkLHvSGl9fxggEv11zkzkwKxKAG00L3aFBS57mswPsa2bUddZT5MtJAEJDghvrTgJFgF9OkceFXTK34Dhm8qZN27H1qjexxdTJ64CWVAUPL9vwqLXnfXqtqNUm9uJMRdsw0kcmEi%2BblOzH3MUmi9fk478qtkbYyTs9CQqhGDVIwpwfvUo1srWHwVizkWKiyHaZ4ovcUBdbZj2pvJQX4c1zdRYcRm1otJ11BuivrfEJp8nuHp05xC4yXPJY5MYiGZSRLSs%2FSwYiohuqT3oG%2FcwnX88PnH7g477PMij8N9dneBOfCpRN54iU%2B6mquNPrSLAbmJRw8p8omkARcvUXiuKpd2mvrUr7jwpFv3FwyVIVlmZlm44roPQHaG8gM0VQX%2F809UO4lBNzIZYiwEWOXCS1BWxK78oMRAUyVFzhsNbEI%2BjCi4KsnA4HLWgRrHval2HgokS7SDPqcPfFDU471FlcYbGnzHoXmu8w%2B5Kd3LXQ34m5nPZKIYBV1FQpucIxxmhBj2iLKyLD64GscjzvRPLYXOi17CrT%2BBT4BSHdqsMim0hgHTRslkXUrpAMHOPUSIbSxBvoGIu0dXcE3bs3O%2BhTLhD9f7TVaIaR4GYpWpSz0cVsCKcN5ZoM3TDb%2FPDKBjqkAeZjIF6OCWI5rXLGLfF1TYcPhKB3Ra1AHXQYnBCeHGI2kBOaMHQvZZnyJ9eyYd8uR%2FKopx4ZjreAP6gsKOeYZb4ofceQBClUOwFbuaf46K%2BPc6%2BcX53ndNu4GpShN1VX%2B61J0gW3sZgKiXqYM%2FjjS6JSncxH4VU8Zfy6BHRG7mp3ZyfFuk7MSkYOPJjNg%2B9loNxahLamgkkzWuWyb9fEuxECypTl&X-Amz-Signature=1b736110b20a2dc187f827d832ace200faefbc0dcde7dfaca86be1af710cf1a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VT7ID566%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDwPSWE%2FoVN7VQsjaIgmByOelK4uSRwoZGh6OmEhDntBAIhAICwl8OnOcY82Qd%2BIH6GaIIL%2FDDzteOeh8PWU0zQnPKeKv8DCFAQABoMNjM3NDIzMTgzODA1IgymND5vbrDyRVEY5Dcq3APwSWdzcClEa8QqytsmVWsTM%2F7bDEjy75nVT5T1LHBvIjC8AreIY41rCPkz7TPtkFHtW71Ov1MoP2TCxG2IxVsum6sMlP2soCUwSCRcwUNdyppc8VNwccjK8L5%2Feu6e3xN3iHgBn7cnF8QPBXnmQXngx3abjTLWWUuksDQgG5njDplBrFYxgQhdNTK5XmpEg90jw9zHyJGcU9%2BVEmVZ2nrcdFCpO43lTEH4XE1U%2BC2WiLeH3ngsHUhtPGdOEMgPa5aS9THuxtIiqDWMwMkja1IUqcMYQFUz9kMO2va1%2BOZygqeFK09ICoUnQ16oL1YoKQTtxKwwOf0gER7a7lLqfBlhDfX%2B1kQmTUnLy02q42F2IYmg56BItYCyvUi3RIQlooTjiZIUb11qziuvteOEngIo4CC3gocHW6qalWWBTlWJX%2BOHMq2Oq0sXBq%2BQ1zaKWqjSlyFoAOVn1yJZO1rX8nriyNEH0bf342zS0JnmsdDx8%2FOraMY%2B82HpuDxMY0Gi%2F%2Fu86k6NThkC1LD3POHYLvM20jVmmH%2B61NMtsR17F0xrP0c4teLEIGu13PmeVPySq%2FkhzqLTkg2YQfjprJGsckrAlMI0hDViuwjeODGPITGJYTYvsOPB8Dx4UHGPWTCj%2FfDKBjqkAc8DJZ6xPtX8LCDIiPPOlLapHUcqTftkesFKbQYNn%2FfMyIFHdEDcN07MmjHhsG47T8zUGG55GQEkfa7SHnRN%2BJZdHBiInAnWdJ1JbpG0WT7gDcNcJYArsi2ghWOmGx1XyuadsGJ%2BpQRFQyOW8mUGEHqjtJvbGJ1w0QDk8X5dohRvG39FutKSBj3f1lIAy%2BjJXszEmmpOWaCaKCBafzRK%2Fc1PPTpQ&X-Amz-Signature=f82f7637eef545127e21bba91efd85ccf39851d46687c3b417f7f6ef07f655b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VT7ID566%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDwPSWE%2FoVN7VQsjaIgmByOelK4uSRwoZGh6OmEhDntBAIhAICwl8OnOcY82Qd%2BIH6GaIIL%2FDDzteOeh8PWU0zQnPKeKv8DCFAQABoMNjM3NDIzMTgzODA1IgymND5vbrDyRVEY5Dcq3APwSWdzcClEa8QqytsmVWsTM%2F7bDEjy75nVT5T1LHBvIjC8AreIY41rCPkz7TPtkFHtW71Ov1MoP2TCxG2IxVsum6sMlP2soCUwSCRcwUNdyppc8VNwccjK8L5%2Feu6e3xN3iHgBn7cnF8QPBXnmQXngx3abjTLWWUuksDQgG5njDplBrFYxgQhdNTK5XmpEg90jw9zHyJGcU9%2BVEmVZ2nrcdFCpO43lTEH4XE1U%2BC2WiLeH3ngsHUhtPGdOEMgPa5aS9THuxtIiqDWMwMkja1IUqcMYQFUz9kMO2va1%2BOZygqeFK09ICoUnQ16oL1YoKQTtxKwwOf0gER7a7lLqfBlhDfX%2B1kQmTUnLy02q42F2IYmg56BItYCyvUi3RIQlooTjiZIUb11qziuvteOEngIo4CC3gocHW6qalWWBTlWJX%2BOHMq2Oq0sXBq%2BQ1zaKWqjSlyFoAOVn1yJZO1rX8nriyNEH0bf342zS0JnmsdDx8%2FOraMY%2B82HpuDxMY0Gi%2F%2Fu86k6NThkC1LD3POHYLvM20jVmmH%2B61NMtsR17F0xrP0c4teLEIGu13PmeVPySq%2FkhzqLTkg2YQfjprJGsckrAlMI0hDViuwjeODGPITGJYTYvsOPB8Dx4UHGPWTCj%2FfDKBjqkAc8DJZ6xPtX8LCDIiPPOlLapHUcqTftkesFKbQYNn%2FfMyIFHdEDcN07MmjHhsG47T8zUGG55GQEkfa7SHnRN%2BJZdHBiInAnWdJ1JbpG0WT7gDcNcJYArsi2ghWOmGx1XyuadsGJ%2BpQRFQyOW8mUGEHqjtJvbGJ1w0QDk8X5dohRvG39FutKSBj3f1lIAy%2BjJXszEmmpOWaCaKCBafzRK%2Fc1PPTpQ&X-Amz-Signature=6feabb3664b244bf36c366aba199ac1a92ffda700720cb7c6de7d94cf80e351a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFH2DMYQ%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZaMq9r0N3nNWBcq6kWaSJdFjC%2B%2FZnCXrjkgavc1%2F%2BJAIgcZX3jnk1PJnzS9z2VP8sbyk%2BRWDGn5oav95ngpm9hQsq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDGmdyTJbc%2FcC7Av9wCrcAwIwnuKaxcqDN2hJUKeshjIkPvqDeG8ue49XUYVEDwAYbdOXfXBiWwTwofngR%2B%2B1IYoan5fF%2B1de3751WGNDzQOBe2EpR9EDW58ZstGsMhfQKl99XlRrNk7zln3Pu9PEPBOROfLL42453TBvOUH9vjWnaUNbVhzKAWi0JT6%2FqLfnMtlSlLWs6s9Xj2i9dh7qvwgvMyzIYm07G4OpmR9wxRhad%2BxWydgZ1P6SNGdcKIbv6WjOVzpX1DXJ1I77Rh%2FH%2BywctiGOdejb6hB%2FW1RwtjBm%2Fh6g2US8kPu6ZGN0F%2B%2BzuZ8pKI9d5YVtncr2XSM2H9cdGFKsIk2Aq5MDLmbOu%2BYIi0KZ33d5JjYBdK0Yl0ojrduIEdCYNIQL%2FzQV3AQK5nKzSUbh4CvYo2NbSUOWNTnYHnxGHxOTdeS5pP1IzpVYeeaheU8hcqTc2OwFtaqVK8alc1K2jzTxmJUEtohxipZgfmej5lp71hWkva7qFBs7P2SOvqZrO9bmkeoeJGfsPVCXMqZ6wJPNGjSsXLKPXU7TQKmgSqq4IkCJX%2FVvGPxlyf444O6DwTfr4lIxQwCV4uI1rDOmgilsv%2FJGBiYB9o9EjADXbc80ckzLOAnoK9nmAwuDCuqItuePXjWyMKn98MoGOqUBEoONMPy7bPmaj9ld74mEY%2FHEphYoI%2FUBj6NX6IODo5rWKWBWF0fWKuWRTetfmiKp3PTlBzEkaPmiKtDYxGNq9tC4v5m9YXk2xXpzGvXDZMAQv3Z73kzDbSBFvrhXQGzzbCHGh7y2XFNjI3U%2FyaAJI79xpOCdKxye3KOHKjcQO7i5sWEtHyi%2B2UvjK%2FAtVVa%2B1ZU5tPlWdc%2FFtSmFgpw71hfTWJI%2F&X-Amz-Signature=4a38affdd27323be5b5a18efe864420bf7cadaf7313fe4af94bc03e7c104345c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXDTOFXF%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID7yzmgsBxvCFqJoxqn9MrBhT%2ByUD3RlGlQkB%2FjOtRmeAiB%2BxgN79PMQebUlo%2FupcRVLaEwPnAMtk5Soi4m8oC50hCr%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMLaMrwxT1VAMSLtJWKtwDgQ06N32CJ4EHTYVIRFa39uaVIUQBP%2BDsTUuQ8mWUl1spbZti9PxIHeKX8bVoNGySu6V6zr%2FndX%2FnTFL9Ary3h53ZbyuncSmGCVd2mIRx5KdJd9WQRdJMxDPw2J4UKsMQHsOKeLGTiO3DKs4jKg0CiBzKxFC%2BhuIAqwyJTLboTxwvFAqFOH9T0sikfKCwi2AFxHTMrlFW58Ne1qd5fJVtLlga3yBE%2Bpx9ofjVxBvJ2tnZhjmAaSxSHmSvEM3QSqsrBKG%2BH5ca6ohni9qKDrjl0B%2FVvnpsSt%2BPoNdSy%2BkydW6WRhamIdjxEHKFoVsoVBvO5Qx4uW%2BHVRr2J9XJXKQen43JdpT9kPwUImbkLtDOAa7EH7JN73MC%2FtUXFtLpenhAKKV9hSVjyNnHAjYAwZePJt%2FT7ON4X7H6bKqm9jdlqusUTxDyKSBj70slWAw5f38dT7UJp63xb7uk75fkBrDFgRbWtJU0dGN6jhOy6NyX0uwtkkdNtKOhWg4evwJauAx1HakkuL4L8xwcCUOGx95tSvBLI2bnDi5qskkV1hCN3%2BpRTQxRZRYXrmJxT93%2FNwY3v%2FGk1%2BfgTQO1bOhaCs5UMYtfCf7ctva2j0vZAvdbIuFgR%2B1%2BKz1w37SYqYowtP3wygY6pgEWZhBaBlkGDWv0V2saxX%2BIDcH2ho4VajZKgiCC5DdFi1l6qXC345IXAlfe8jgrwapLOvKeGOtwsAiftmvVFBVObB3fd%2Fet2Lu514RsffwpGrMRtc%2B4gzzfvwnyaDIJcSz3wy0S4F%2FeMi2oIs6kqRGqVjEvrK6%2BaJeErpAZLgVKKg7GPS8dudNVyNO5SPF0XH%2F5x4f1LBptDxvJbGsyUtpqLp2wNceN&X-Amz-Signature=06b4ea6e2a57efa9b792cf9c92094affa60c88709b2bfd9aa7ca0bec2cf0080d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USN2WLFD%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCEzpIfS4x2kknmJO42qWbBZJI8N%2F%2B4Y%2FeHVhCcXeUbVgIgAgGHdNpVKeG0eKZOeWsOkzpLnzfLGe9cHsYUTJtmgTQq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDE0LOQlRygd8FRWSkircAwWisCU%2FRui7m3r57O2npoxcMTDsWe7HP7eDn75TZpGCOxVh8194Evu8tLQzs11utudAa09yOf2j3NytxRlFFASjN28ZZ5mdfW4xXT0ZHGqa9k2z%2By30bvF3Avp%2BZYC6eBTDE9FIfZ8UmtZ%2FJYO6hm1UYSH7xs5ecrJ%2BQ3xInjZy8%2Ba1QR5OFEk6ZEuFOq0dEhbq6jfAItA8DLKFMa57CByzaYmIyWjIb7hKEXxu8m3QTen7SteqOb2%2B0IJeKZjOQJODfSq%2B7ad2jRRc6wW7YS4b5%2BrWUGPDW8TZ2F%2FpF2bcVVX8hYXrnL8GvgDhIZcD1X7qv8aKlBGe1FKvaLsJ1m8s3Ni2oQ3StOqjJCrS3nD6u4znsszAE%2BsJZKOr%2FA7bbdioFJ9axdHoD09NTyos6e2Li8UNWDgjfWDiKmHsBMRoMQf8SlvXYLP7ATKK4TEvGBfSsvVeLMAm2TAdsrTGVnZSRqrZcUokl5YbeOzdgzIQ4%2BXl8MO0Wq9hr432U8Xz1HNfb1EeaLIHaHXtREmWZEyhcGkO%2BZTKTcNcOXcezDtCGu3kNBtK1gKsy74lmBOiJZyuHESxaouplBuOZL%2BXcihX%2Bd9dWUhilGv2W6WPvXmUWuURea0CQIg7vuM0MLT98MoGOqUBEYdJKYnFSVB6rCulm49CBLCUb8s5tCNoPWHSZXOj5WJIY1coAfBPE3zyDgiV%2BmJO%2FieohOq0Hl4T5M%2BfiZ50VHuoYHPGOyXKBZMJBJ33aGctcANc7tp4qVk8R1kumR5uV2%2FBkTXRkBiGyMpHXyJKWdfmMM6AStd1sno1DWF7SGVzpqAbK2auSzQs%2BjbN4%2BWt0F3Hu1uWS%2FUyfTdVFFlM6PB1nx3i&X-Amz-Signature=8e033de5b2bd08f0bea24d20a923c6688c5b2034e8708d545e791600b2a7872c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFYMQ7QA%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHpoXz58%2BBrtifkoWZRuXsxQCnO3SqtqGxHT0ZHE5TSkAiEA4Dkiwl4j9CsHOBcwcZ%2B1VZxsVSbtXONAU5SuMT0OhEsq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDFLW90ZWOPSxK2n%2F3yrcA4vdV%2FEBxfyyIIuru89CfVHc73RGSo4sYKTXBZ9lnlnIZmuCZfDmVG9Pe232AcHCGVg5hI4kEUmp2ldgaZjVeDRB9dUV9XlNvQLOY7tAGccumV60CUYt1IWiovsgApiaQF9KUWE%2F%2FLiN9CrUmIy0VQT4aRQT4Bd0pmYChFXuNOQitXadXfS4HS1LRDq3NtGcX%2F%2F06ASC%2B2iaNl%2B6i%2FgyX%2BBlozn6o%2BRR7u3gXUrhrzngacD0hieP3ejZv0%2BSXtQ%2BS9NCk68OwuW%2B4ApDwPXl50e8g8JGF7GwxLDkMJrVE35M1EgNee8RZ0xKrSZU4DaT%2FJdhKYu0CQJ2s83nFzdShkDA0%2FcALShOnEF7u66onYBmPZlo3O96o9V%2FBsMMMoTg8sgwuOAEndyKhimPWBllvfOp7oq3BnKIS4hq%2F2Hqv0i91hmtudQCqK7ffqHom9wKsziUmUtaFGOkA%2FQe1M5LKpaFbTJrmKH7XVIobjsAZCT%2BrNsMCWmj0HmHFb4zMB9PoHf4ahreK2P4Wb%2BbZ%2F5R6ut1QwK8qX8wfgZvOqy1kGVGAn%2B%2FQhYPT%2BU7GSkw29BtlxCPewCONJLnXxqWJWzXQx%2FyZeKOkdgHyxDkNs4IFuinR%2FZ4SEbejlTspFvmMN788MoGOqUBZduMgQtkmhTpKJKkoq5lfSITxWy2c1%2FjWJtRv8XjwFbkxgee3ySDVZyF%2F1Hmw004q5dsGYaJ%2F9GMiFGPDNru%2FVNiE93oM1ddM3%2FSEsljwo4XVMEyIykf%2FwOxfBQV7wYPTYrMzBD2zFxgsnyhHqtVMRyhjRtP6v1y%2FiEPPlwK19B0IuXeDqQWmU%2BzEILTfvqxcRuP2vpA62wMYhqLnnJ3A6miGj3y&X-Amz-Signature=0cbdfe7da4ec41104ede49f888e406ee0110755d5ee67766c0ff3aa5ac92d6e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFYMQ7QA%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHpoXz58%2BBrtifkoWZRuXsxQCnO3SqtqGxHT0ZHE5TSkAiEA4Dkiwl4j9CsHOBcwcZ%2B1VZxsVSbtXONAU5SuMT0OhEsq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDFLW90ZWOPSxK2n%2F3yrcA4vdV%2FEBxfyyIIuru89CfVHc73RGSo4sYKTXBZ9lnlnIZmuCZfDmVG9Pe232AcHCGVg5hI4kEUmp2ldgaZjVeDRB9dUV9XlNvQLOY7tAGccumV60CUYt1IWiovsgApiaQF9KUWE%2F%2FLiN9CrUmIy0VQT4aRQT4Bd0pmYChFXuNOQitXadXfS4HS1LRDq3NtGcX%2F%2F06ASC%2B2iaNl%2B6i%2FgyX%2BBlozn6o%2BRR7u3gXUrhrzngacD0hieP3ejZv0%2BSXtQ%2BS9NCk68OwuW%2B4ApDwPXl50e8g8JGF7GwxLDkMJrVE35M1EgNee8RZ0xKrSZU4DaT%2FJdhKYu0CQJ2s83nFzdShkDA0%2FcALShOnEF7u66onYBmPZlo3O96o9V%2FBsMMMoTg8sgwuOAEndyKhimPWBllvfOp7oq3BnKIS4hq%2F2Hqv0i91hmtudQCqK7ffqHom9wKsziUmUtaFGOkA%2FQe1M5LKpaFbTJrmKH7XVIobjsAZCT%2BrNsMCWmj0HmHFb4zMB9PoHf4ahreK2P4Wb%2BbZ%2F5R6ut1QwK8qX8wfgZvOqy1kGVGAn%2B%2FQhYPT%2BU7GSkw29BtlxCPewCONJLnXxqWJWzXQx%2FyZeKOkdgHyxDkNs4IFuinR%2FZ4SEbejlTspFvmMN788MoGOqUBZduMgQtkmhTpKJKkoq5lfSITxWy2c1%2FjWJtRv8XjwFbkxgee3ySDVZyF%2F1Hmw004q5dsGYaJ%2F9GMiFGPDNru%2FVNiE93oM1ddM3%2FSEsljwo4XVMEyIykf%2FwOxfBQV7wYPTYrMzBD2zFxgsnyhHqtVMRyhjRtP6v1y%2FiEPPlwK19B0IuXeDqQWmU%2BzEILTfvqxcRuP2vpA62wMYhqLnnJ3A6miGj3y&X-Amz-Signature=a7831f9883b007c1530569abfd7c56ff621ce3119c43a2d14e0c494e69d70dc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2MFLNQG%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDSEyZYTuRUKTYYM9s1Yi6tdjQ3zn0AipHn8aYyXGimqwIhAPRZOOMkwoyPYJwud43oubfjKT0VM0ZKVnZq73d4sGtUKv8DCFAQABoMNjM3NDIzMTgzODA1Igz9vlEBHwccfIMcbD0q3AMO%2BY4Ft3BeNXX75rWUq6pFQwaMOilq%2Bno3XJAYZIjHZNoTF859Uh7oAnx614iyBvlwyc0cv2e%2BAilZmTgrYCrORkEeJBN5qAecj8dhGuHY5Xe8DGFc3DqnvPsiWh5XU%2Fn40lWTnXCfHgw4cLb5T3MCCCrooNon2wvRU6W2J2Z7iQZRCaRfOdlRAro9VSpdpH58xkFXrgwm8SKFnF%2F52EHz6VVxl8AqIG2v7N13xZCBUanhsk%2BAeL5pFFpo6aiFNuzeGNO0s7pk2KLVoG88vn5tHcYz8OF8xQULY7oPYwqpWUa9X2PvZuwaGvDR%2B%2Ft0oxsnldCwGcPvhVynLHS6ozXRc39L91H1k5AversbPrqsDVQA3xLEJGcvF02%2Bsw1%2FB1cGKS8JSXRJ6vC3J76YICh7DAm7hXnYrXC99bpsTW2KnJwaIZ42U5Q6YAtLWq207xSIYzCKEOOqAiYrt1qKzUyjeK9sSLlYyYIkL7eq7S0mipPNBQluNtzIrsuOcOrcLw%2BSWvsCTTUQhdt8whhgUkDG2ie4wqEkL%2BsEe7SoFqlc6u5HjUJwB9MRRLd8QXGp7ULQFSE2nbfXHFIUygr%2BY1%2Fn6MJao1qfBRa%2FCDXNXfzfgksi%2BSJgvH4VYUUcFTDb%2FPDKBjqkATb%2FXN22iGiubSsw4x%2BHKY6BxwndW15eC%2BzSpjzEPXU3gsrexqb4DW3eiwjHVICeB8sl%2FGuRKrFg2fagyGkzAI9GpbdqoDtZyFvusUN45hjh1S4W5zqJDa3OOrj5cInAHYatsIlLmWA3obYm4EAJoHfbX4Weo0aeRAzNJ33jwHa3k9F%2FHAhtb3oJn6BjL8qDGQTyeaVTQnduwqicArenl%2BsHTLjF&X-Amz-Signature=b1e8faf53d24d40c3fabbbf0852c8d6e622985f43c0c3448e973182dbe530cd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJAPIX47%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDrUYwuXPU%2BzieKWlz5H7FY4oUSc4mEyQSmBGsDsNre%2BAiAld7CV6WPOj5b9MRWPhH3WOAVTMiiuKzUgq02A9G%2FBhCr%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMKqjflwkD7xkUJfYpKtwD7dJ0640QYU%2B%2FhclmgOC%2BdABtAnrb%2By9GtGqHGYfXFArAVUYEtHY2gzKgG50G8fBFcOKw%2FeIAVbqGqZMJ3Xf0y2vFARlr3PRs4S%2B%2FycsWH%2FX6CNRGllfhI5RWEDKFAqgh2GrnD05Q6qi9OY2FboibFxWqpmGO3mezLpI9jgyywzRi4DUC2irmYgBQZx0%2FgzFRKEVPXqYNazTIT0aGiTgdZ6JlgcOcgT3lULsqTj42QMAMvUJKaBE3YxkzflIAY2PLx79SdpPTKlWIp0t2A2qWe0vexpOaK2LBU7YUItVHiB5oCv%2FYr5%2BpP8oyxVgCjrT80MOHashtKJ7gLCAtHv6pH7SHrfCQqnuKjwzQgwAc32LiGixhWp3CvzFHyXIrv1qe9Awd6%2BWffch4SY6yXqpdOkMRRRdiTXGhHgbXo1shzTSLVYsbzRdcoKD8LiZ5FHEb%2BGCBmUVJXZl3oKUMQ4y%2Fk61mUHmeSpkmouX4JRtwpGCo7KeQH6O3Yp2XY3Jk096mQhJyJuok6S89U2zjkqukBITB4kYp30gzIA6IteqX7KhZa%2BbHTtt3bcSPjJgc%2B1wkaf6LW0A9Gn65OJM5I2Hb5F%2FkPZtsIuwLqpC3KtvQaRXin%2FjiR5SHVG1gb0Yw3PzwygY6pgHyqVk3Z9iGfbECznyFzE4jrKjdagus2q%2FArvbORiYH4yKn%2BdF7sKCSzyeJFOv57l6gsyfHpb4pF1lYHNqTbjfzsLui9Uah6Ltk%2FQguo2J7D0Sd6rghnccgoKdFexGLjOQ5QvaBRMjURl7s3zV0mFBVMVAlk%2BLsx7z8Fckmp43PL%2Bqk2rHmQiPCsA%2BGnTVJ%2BZqFnvLLfQKab1e5xmkae6e6GFH08TIr&X-Amz-Signature=779fb975d1d4ce0930d7187c763e5d1a58994d1b861a23356a2c2876aa90dfa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJAPIX47%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDrUYwuXPU%2BzieKWlz5H7FY4oUSc4mEyQSmBGsDsNre%2BAiAld7CV6WPOj5b9MRWPhH3WOAVTMiiuKzUgq02A9G%2FBhCr%2FAwhQEAAaDDYzNzQyMzE4MzgwNSIMKqjflwkD7xkUJfYpKtwD7dJ0640QYU%2B%2FhclmgOC%2BdABtAnrb%2By9GtGqHGYfXFArAVUYEtHY2gzKgG50G8fBFcOKw%2FeIAVbqGqZMJ3Xf0y2vFARlr3PRs4S%2B%2FycsWH%2FX6CNRGllfhI5RWEDKFAqgh2GrnD05Q6qi9OY2FboibFxWqpmGO3mezLpI9jgyywzRi4DUC2irmYgBQZx0%2FgzFRKEVPXqYNazTIT0aGiTgdZ6JlgcOcgT3lULsqTj42QMAMvUJKaBE3YxkzflIAY2PLx79SdpPTKlWIp0t2A2qWe0vexpOaK2LBU7YUItVHiB5oCv%2FYr5%2BpP8oyxVgCjrT80MOHashtKJ7gLCAtHv6pH7SHrfCQqnuKjwzQgwAc32LiGixhWp3CvzFHyXIrv1qe9Awd6%2BWffch4SY6yXqpdOkMRRRdiTXGhHgbXo1shzTSLVYsbzRdcoKD8LiZ5FHEb%2BGCBmUVJXZl3oKUMQ4y%2Fk61mUHmeSpkmouX4JRtwpGCo7KeQH6O3Yp2XY3Jk096mQhJyJuok6S89U2zjkqukBITB4kYp30gzIA6IteqX7KhZa%2BbHTtt3bcSPjJgc%2B1wkaf6LW0A9Gn65OJM5I2Hb5F%2FkPZtsIuwLqpC3KtvQaRXin%2FjiR5SHVG1gb0Yw3PzwygY6pgHyqVk3Z9iGfbECznyFzE4jrKjdagus2q%2FArvbORiYH4yKn%2BdF7sKCSzyeJFOv57l6gsyfHpb4pF1lYHNqTbjfzsLui9Uah6Ltk%2FQguo2J7D0Sd6rghnccgoKdFexGLjOQ5QvaBRMjURl7s3zV0mFBVMVAlk%2BLsx7z8Fckmp43PL%2Bqk2rHmQiPCsA%2BGnTVJ%2BZqFnvLLfQKab1e5xmkae6e6GFH08TIr&X-Amz-Signature=779fb975d1d4ce0930d7187c763e5d1a58994d1b861a23356a2c2876aa90dfa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PR63ZQV%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T230117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB8SjVwwh1rQZakW4NA9C5h1T2ihmz87%2BgenSpeYXPGoAiEA4NO5Tl04g15kmgkFRvDp5%2F7G23xVBxPEye6Bx%2BseqaMq%2FwMIUBAAGgw2Mzc0MjMxODM4MDUiDLg5ZPPLP0bFFYYMcCrcA1fMfaDM0oh2O%2FPM4vNIEAtrEXj593mzONm15kc9kWtUgiFAJ%2BHl5X%2FQVFlao%2FbaTgI1NbJhQ5yuZWEtx6oPUR5kwbACVho0zlUowKaQah%2FgH2rDRAQCUU4sBPcEjndxzpYdXcfs2PkpY%2FxSFVC9AbsvVYPZLMmTZ9KlvzF1eajGrR6bbvpmxJ1Z4n0QpnvtDR7RU4S%2FTILrGzRNjzZchEFAe%2FuaL1AZtSo9Gx5YyR7QPGhwcN6xgoGr9IJMXtvZSLBFffcFGsL2uN8ea69zSUtfLO2zWjR6okT5nbNUIgZG%2FamnVh5nv3yGJtpsZeuCI4lk%2B1LsPGiFh2AsY2NXqzQca1LyECeNIo9L5KLOuwT8aY8GGVFaV%2Bkp9nRjz3Zf2c2gKCCsKY1QRxBw6l1RAqIRZ3uPq6xHFAlJBFLnQCi9NZg5NzPZLn8fYt23k0Y0m4X%2B%2FZHTLNTYm0BglsgIKRzcfMXq4z0Ob7p4a2DbHSB0Z1UHlziPTZyAReOO3NYzQXX6474MsyLqndscM323UZzSD%2BOB%2Bq%2FJ9ehTduseZ1CcksNuOXFRc8ZEfhXeAWQC%2BmUKoTbP1GgGH0yD%2FcuTNL6WfBNbnHWXAkCoSxi%2FlsygT6s0JoAoThGtD4IyMLz98MoGOqUBzi31K%2BQsfEfh52I55E8iZ%2Fs9Fb3RglMDxkdBCfcQ2%2FSzW4CUKVwi%2FEY%2BRdjt5xukzHFnnVUMQVaf%2BseCDJiKlrDCvvwOOXpz8Gjyrr3CLkuWhzFuVfyIrJUo%2Fa0uaGuWacOA6naouXPpD%2FF7t%2F2X8osRK%2Fb5xmExPyn08B72Egkcz%2Fm7hzhIpNlZJ6CWYWo52f0oAQqq4p84n1bvA4ieFLLuRSKj&X-Amz-Signature=fcd6e707d8f95e56ac3d2eef33fdb33b4fa83296fdea14e415409e044919808a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

