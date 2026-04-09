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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TERELZG3%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDpwx3RXEqF2Q6SjcIRomB9gO5hn4Otx9rPFtZ%2Bi9MpeQIgJ%2B4QKyC903DT5IIbIAJrNCQ%2BVEqdhykMj4T6Q1PuzGkq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDCZmaLP0wqFG87qm%2BircA0qpee2SL%2FyzAXpwT1F0cR%2FMteiWOD0gXjvlD%2B7DSkL7ta2cxSgX1nS%2Fa0NoTBqjQbCxc3DZ3nUEr%2Bg1X3hU8E7diXHFt%2B8xxVuENGzHj2GWDdjYu%2Bqb5GbJYDKYCEgcIM6U7ben%2FeuG5oR4A9k%2B3hO3OM0cz7st4WnQ%2BEb6047EVI3lk1PumB%2F7cQ4Xlc5t0QP4VD%2FJLS1mGBzBtB1aDhgEO9lEmHKJn%2BgqobZKbXkqDDQPOmRoijOuu%2F2zPIZQ01BwGibqgn%2Fvp%2BHWXVAj3gQ9yf5khT5z0mdTrJRsE70u%2Fc70fbxXEzQdkRYW1EMRoWk7aZqjzmXdhs8wcJhba26jqJucI5U%2Bwqzo%2Bs2y0er9AjEWNdWdER6Jus%2FXOQCdkQ0NSwZVk9SmTPVrfNHYlSs%2BGp0EM1HasYOUs3%2FCYSGjGy%2FS0hUQI5xsNknm2wDueI%2FbQxI6BmT5Psr1M5h%2BijMmZ4W89CnFJtxXp8kLkesOb2aj8CxFJFX3KT7tpvkWjMHzt4a0CHmadM5UD0Q%2B8ObbKITrzjDh03GKhgZcyuToTQpUXXfJYBzx1aVOvaiLZzIAxSWD9%2BYpOJj%2BttGwBpVPB4joAvt%2FsQ6x1JqbG1xbSmF%2BNXGWc8tr5BqaML7p3s4GOqUBmlsh2FP1Cu2EM%2FTyYtTXtlBacGNXpEUob6whJzH7D4LWz%2BeGHNGH9YxML%2FXir0KSvfq3n4iGVYT8ciMJJlbRec6falYz6LWfW8LczJDCB4KYhViIOOuYHpMEnfukEor9Z3LRYUEuR5XxoM28RvcAiuGaEthNwFOXE1yEVdfOSnRdBIP6JjbnOQj%2BaWAf2dYJEWNtivwCu4PpgZ1buKEP8sYHUY9V&X-Amz-Signature=e58dfc7d0732fd0c48e1171961cbf76fd84f33666212ec642425a1faf3a37bd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TERELZG3%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDpwx3RXEqF2Q6SjcIRomB9gO5hn4Otx9rPFtZ%2Bi9MpeQIgJ%2B4QKyC903DT5IIbIAJrNCQ%2BVEqdhykMj4T6Q1PuzGkq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDCZmaLP0wqFG87qm%2BircA0qpee2SL%2FyzAXpwT1F0cR%2FMteiWOD0gXjvlD%2B7DSkL7ta2cxSgX1nS%2Fa0NoTBqjQbCxc3DZ3nUEr%2Bg1X3hU8E7diXHFt%2B8xxVuENGzHj2GWDdjYu%2Bqb5GbJYDKYCEgcIM6U7ben%2FeuG5oR4A9k%2B3hO3OM0cz7st4WnQ%2BEb6047EVI3lk1PumB%2F7cQ4Xlc5t0QP4VD%2FJLS1mGBzBtB1aDhgEO9lEmHKJn%2BgqobZKbXkqDDQPOmRoijOuu%2F2zPIZQ01BwGibqgn%2Fvp%2BHWXVAj3gQ9yf5khT5z0mdTrJRsE70u%2Fc70fbxXEzQdkRYW1EMRoWk7aZqjzmXdhs8wcJhba26jqJucI5U%2Bwqzo%2Bs2y0er9AjEWNdWdER6Jus%2FXOQCdkQ0NSwZVk9SmTPVrfNHYlSs%2BGp0EM1HasYOUs3%2FCYSGjGy%2FS0hUQI5xsNknm2wDueI%2FbQxI6BmT5Psr1M5h%2BijMmZ4W89CnFJtxXp8kLkesOb2aj8CxFJFX3KT7tpvkWjMHzt4a0CHmadM5UD0Q%2B8ObbKITrzjDh03GKhgZcyuToTQpUXXfJYBzx1aVOvaiLZzIAxSWD9%2BYpOJj%2BttGwBpVPB4joAvt%2FsQ6x1JqbG1xbSmF%2BNXGWc8tr5BqaML7p3s4GOqUBmlsh2FP1Cu2EM%2FTyYtTXtlBacGNXpEUob6whJzH7D4LWz%2BeGHNGH9YxML%2FXir0KSvfq3n4iGVYT8ciMJJlbRec6falYz6LWfW8LczJDCB4KYhViIOOuYHpMEnfukEor9Z3LRYUEuR5XxoM28RvcAiuGaEthNwFOXE1yEVdfOSnRdBIP6JjbnOQj%2BaWAf2dYJEWNtivwCu4PpgZ1buKEP8sYHUY9V&X-Amz-Signature=e58dfc7d0732fd0c48e1171961cbf76fd84f33666212ec642425a1faf3a37bd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4QPQHYI%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIBSDAJNV9FHjX9Egyxtd3f8JTUQhuNojZxC5lkFcUYkGAiBygr6jT%2FuKMzW1fqITSKH5b6jzsKpoBGBQ%2FAPuk5LYlir%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMwLqahj2pCUh%2BP%2BHkKtwDZXM0r2g%2FP6A3v986PfYHR5T7blwo6KKL9IbT1tD9SLrtsWYXk8iPuiGUKSZr9GKS4DzXvLIKY1CiJSuCQD%2FaBjPwl1y8BGZhIKMFtfNK3aiHTiSgijkvCD8AMCGpI0JoRZrAAiBuwxY0clyVSMDXNEqF3Ko9DEam%2BS%2FtPWeNkOz084TDIXANtLvCEW%2BVBPTi0d5ubxBRAcFhIrucZX%2Fx9JC5j8KHn%2FonHTS8H5FVlI6bmfhEjltT3RMS3oPFPFoXvkj04yoQRcmlJ8N6M4vjmDPB10aXd5zXXjjoveaY8ceF%2Ffx6%2FW%2FbcQqnpPZ%2FMEBPRp7bv6C85OUud%2Fm8VsPWi2lBibauOoiOneeFCxddELrnDZFMbhWu0gvsTEjzxbNfa6k9DocDtPCasmz%2FGkXA8PC7dkYjJZm8%2Fe4RkwsCqXq5qUVuk%2FwIw6ZD%2FusM0md9V74YxMBTrt0R8V44jyOy%2BAb5Mue4k7Rx%2FSuEhPUJw9rJq48mSMDbaqv4a0NAg%2BOBtYjoQc%2Fmr6jhf9hJj1kpTmEAiGMAxdYUQf6OMwaepRE0z9TJDw4tCwjSmVDftC%2BtwOY%2Fi%2BmIdVVanQQWP06dJLU1HgKia5FSneFNjFx44TfjM2F9NrMNpuM6pocwwejezgY6pgGeIjW1hFks3JC%2F731Yi4RwTnk%2FWsdRzeUmMSBA2sctk%2FEP1j%2BIM16E8LtyP04qoUjACRYwqVyTMSoYR5LcXdY51bHxOFIMdT6RzMnooB0WUtLsHxhtbVECJHZoRUVAPARvPKpHvPqeHtXKJ2Uc0j7878BUAOizG95kMAV2ppF3gyxgZZNcYksyo3PQwj9T0wVH%2BiM%2Fs6ifRVLVLE68aIZeFignzip5&X-Amz-Signature=24c200b4e9875e0e0ba07487d774ea962f724c2dd24481ea42b1c7ca3672224c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667F7R2QME%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDOivtFc7YnsxjHd6iNaoK4%2FejKS%2FqlNhlSdictZTC7xgIhAJ0Z6C%2BRIp0uLeNu9Mw2Pt6jnT6EUeRl%2B2LDmXb0jiMaKv8DCBcQABoMNjM3NDIzMTgzODA1IgzRYjVpD780CFKE3vwq3AOPoFVSDtC2%2FRIIgprDFoMApLHod5RJH4RT8F3%2BsPllYEKmA5E2opMyWBoy6GL9L2FaxXgWSVJx3RVyPZ9rgVSi4JaprcMrKxNbUAJiT1n9px3bdF6lPVWTFI3W0O1rzq%2FX%2FfWAA3up2t%2BLtyR0T6Q%2B%2BanfLFUDsam0Uy%2FY6LSUG%2BcNEGAL1%2BsldZWETG91LeGEjDbvhhnMXYyeHOM1dZI%2B2UA5r0ECpLzVuMAjrrJHQpS28cO%2B42HeqlEiWdX5We6vo1NnKDM0hJ1hxFA9P0xQj6vv12hQUdfsz3pW310MJziEPfYTLjv6JsfoDWzvR5vTW6UUJLwOAAQ4rYB3dL8sN%2BoE2Z2%2Bo7mp7CB3lueFksuPdxjgqV5KqBqKmPp46lijbxApoM9GkXZX7jfPdPLIy9uz1zH6hOiLRx2haoAMuWxSCUxwfYWngoesV8U2g99rB2WXs7lhILKG%2Bezf%2FyrGEi2TXzNqsu7RWZQYxCHMrTd5zdicqdrBI1VYtpUDRHuvwaazvN%2BGOp4VwIcHoiW2ILeyvoqyyqNiDAfo1UPFKNmivzr8sSDTuTgmeHAoNLFHljwV4jqbSyj9NrtPidauH7Gg%2B%2Bv8V7ocgfb7vznYZXsfMv2LXY5dySCkJDDG6t7OBjqkATjI9IScpZBFHQGk7FyziJBsOJJWGjbkTUeaGvQlnkk%2FygkIVrYBR8CZKZcB4gpK8eG2%2FZ12a%2FanklEffrCFeil19SdxnOkzvh%2FRpSp4VBxDBXJlvo4SFscYPnZCPX8Zv7ktpm%2BwGCf5b3l37zks7fQukJ5MV5x8WrwTs3%2FUugGlZHYum%2FWEs5SjP6bd5F%2BUq5wLAAfLdb8P9sNzvz8G7BUYTYZb&X-Amz-Signature=8fa3f8453c20de7e3efeacfdcdf49a11d77090a688b9dd92910f5d671885cfd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667F7R2QME%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDOivtFc7YnsxjHd6iNaoK4%2FejKS%2FqlNhlSdictZTC7xgIhAJ0Z6C%2BRIp0uLeNu9Mw2Pt6jnT6EUeRl%2B2LDmXb0jiMaKv8DCBcQABoMNjM3NDIzMTgzODA1IgzRYjVpD780CFKE3vwq3AOPoFVSDtC2%2FRIIgprDFoMApLHod5RJH4RT8F3%2BsPllYEKmA5E2opMyWBoy6GL9L2FaxXgWSVJx3RVyPZ9rgVSi4JaprcMrKxNbUAJiT1n9px3bdF6lPVWTFI3W0O1rzq%2FX%2FfWAA3up2t%2BLtyR0T6Q%2B%2BanfLFUDsam0Uy%2FY6LSUG%2BcNEGAL1%2BsldZWETG91LeGEjDbvhhnMXYyeHOM1dZI%2B2UA5r0ECpLzVuMAjrrJHQpS28cO%2B42HeqlEiWdX5We6vo1NnKDM0hJ1hxFA9P0xQj6vv12hQUdfsz3pW310MJziEPfYTLjv6JsfoDWzvR5vTW6UUJLwOAAQ4rYB3dL8sN%2BoE2Z2%2Bo7mp7CB3lueFksuPdxjgqV5KqBqKmPp46lijbxApoM9GkXZX7jfPdPLIy9uz1zH6hOiLRx2haoAMuWxSCUxwfYWngoesV8U2g99rB2WXs7lhILKG%2Bezf%2FyrGEi2TXzNqsu7RWZQYxCHMrTd5zdicqdrBI1VYtpUDRHuvwaazvN%2BGOp4VwIcHoiW2ILeyvoqyyqNiDAfo1UPFKNmivzr8sSDTuTgmeHAoNLFHljwV4jqbSyj9NrtPidauH7Gg%2B%2Bv8V7ocgfb7vznYZXsfMv2LXY5dySCkJDDG6t7OBjqkATjI9IScpZBFHQGk7FyziJBsOJJWGjbkTUeaGvQlnkk%2FygkIVrYBR8CZKZcB4gpK8eG2%2FZ12a%2FanklEffrCFeil19SdxnOkzvh%2FRpSp4VBxDBXJlvo4SFscYPnZCPX8Zv7ktpm%2BwGCf5b3l37zks7fQukJ5MV5x8WrwTs3%2FUugGlZHYum%2FWEs5SjP6bd5F%2BUq5wLAAfLdb8P9sNzvz8G7BUYTYZb&X-Amz-Signature=8e8e28f9eb9c7735cffba95d893408c247c6b78cf61a0e89d94d83f9e61bfe00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NYWDSZ6%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160807Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIH2Xwmqsgvz7HNvD%2Bk%2Fu1eBAC05tWzMayJe8r3xJVWUmAiBFwtJ1fVhYNk09UD1bVtFb6m%2BSv4%2Fqt%2F1gfRxx2ujU6yr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMN5o65XoEnFTwFXSoKtwD6GDUEsSOAAHMfKtx%2FTrG0p2JDMrUzbmzk8t2rTk7pW0dAvtqbvUGdNTLfgMYgua%2FWniUjHPz1Vk8kIWafsClG7QckhwRLcqOVbz1TZ1Z7OtOT3UAjYmpSzO5ljtUhGmOqaGEg%2FQZez6zH1niDOWBoEL9Hw2jt6jJ%2BJ5Y7FIG84IJX%2BvxiFa%2Fxcb3M5NnEQ5WfOtBFv%2FMuFYrt8qZ%2FU2SN01snPHmr44LJv9L7y%2FPecRUgHPF%2BOlFvjD%2BX1bmdQ6TJA%2F1eJ14BaBsFB5BVm3XIvuwBWpuZLiGka2lGprn3XR%2BW40qVR2fRMIMQMNvFYKKDH%2BCzfSczJ0ll6OzVz6%2BB%2FepT7TVX7ExkLLL2Uzrae6yIkKkBLQR%2FwzusQIYhcbIH1zZzfBXcuLQdBjlEQ2ni2QhMiLEYpuF95gB%2FwkuHZvfgSPhHRWcSj%2FBK5QkCclsa%2FZyKp2s23Vd3W3Nh3GkxtCAYjnZLTd3AxXH7uhaG%2BJ8C739mYhI3KPbasMnrfI4vJp8vShcZ5w7lP5xcQPkhk5XzLpYtAoHyb0q9YvsEmE91ietM%2BGgLm7aEAUbOhT%2FkT2FY2IODq25RGaqHzsqouzd1Pmul5zydoXu5Qkhy7Iq%2BvDSr55599NRBtMwofrezgY6pgFmZWcNVDxTfHfFWH9k6CD%2BjqbcweaYZ79SXObYWepNm8gqeuya2P%2FFsa6MYtFOzGQVFJeKZE9v%2FvVPzogg%2F3dQXtPV3IQYW4sfTYbSikJpj2DSkaUGgBAO%2Fo0EBPWvZHYAkU8i4LTJ3xg2JxnmEbAYu0JHk2FBHmT6lGf%2FIVOOgayx6FzYj9aFvepvHtUFL5HQg35quoTty0VCcmbzxNuixRjCG9e3&X-Amz-Signature=0b622cb1851d851689dbbc420a96fe92a4386f4df2aab6828a1dd30049047456&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TJH6AI4%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIFF%2BOpg2j6cxMKBGvPdDYGqhvMtdgvbWcj6mC%2FZ0NhwZAiEAmdhnjXHAZD3xo8kA%2FW9XEAU4VGgXVuKe9QVpqUQJTB8q%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDFDW%2BHHVz%2BUBRZ3MLSrcA9hBJsPkyv4u3JObNs3FkauDMU%2FrXQQMcs%2BIPlvLotsa0FT7xevOsmIZOtdeHXu%2BqhybuDV1PVVMI0cnGgzRGwNnm05PtKrxC5k%2BV03esJ2qGILzP9lUIo566HhLObpKgZ9oeMwYHlCzdLazV7k5N%2F5xxWgzy2JZ4YDqvheUfIaXN3E11iBQPfJpF680JpqHqAmGmYDXPImFIwQdRMbZMywI%2FbBhvzD0NWBv8SDBnzj9ANepJMgyPsztSpw2K3TMYfcCS%2FKMfCLlI5XG%2FiNw%2FzJICweebYJbUP%2FWNZoeg3WrAlKWRw9X0HVUeoRGIQQQYkl6%2B3LlLQ7eYU5Aw9Nzg7Nw3VL56cDzbQqiOmN5CCUF%2FYcNJMOs2FX9Dp5%2BgMm5bWLuErt7EdOjpnz%2FWhp%2BYTdzgrCrEFABZgKNB2xPW3Co4oh%2FWvDErNOci6s30Ii1dw6H4GZbr9VzdVihLsE1fgq2nNsExLdqvbfk1yz2KMYVBmT5Usiw28x%2BhN9zIgDEJrN6vZRLC40ZFXOTSvUB1R1NlNbnyppc1un%2FXZA6l0cxmNfRJDfQgx2yewe1cX92BjtdxAi0j%2B5NBfoI38xuPRrD0saZBxskQVUXrxbWGUE56mGZ8psP%2Fe3hW2ooMKnp3s4GOqUBn0Z%2Bw1yiAuMQw2wLeqteFnsuWES%2Ff%2FkNmGg4ubnCY5WuM35ltgzNm%2FUzwCH752ztmubXbV4tYi6xeIUFSNZdd5nM4n7gbgOvOEQeqm8brQjbrD47pw6z2SzNUUR7cFpvZn8W2VbtzmaaUmSlm6YwLM9%2F8Ldpgf1DaRvlX16bR3Zauv%2FB4EHwQqSysRfYt7kSxGJPd9OhYrEblJxyR1F7JEF256%2F7&X-Amz-Signature=dbd2f6db058dbf650052ef73a6c26944ee6d2ef5f7d7617b5b70b66326abab85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667FLNZVG%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJGMEQCIGN3kmdiifi97vCb8azS%2Fl2hbZ9cepQ%2FseSY1dwd%2FMaXAiA5FwwTLh1iYE8g3XILSpQI4t3cieefpqXraV3dKjHc8ir%2FAwgXEAAaDDYzNzQyMzE4MzgwNSIMvImR1CW%2FZIbIfMhnKtwDl7xRpmD6mzqwL45DqfK%2BwPed33z28gXhUZhX3NoCRhsEJf2d0%2B2Sy1oSrtQUMRMBWti%2FVwkMeZilNWZuFQq%2BKw9Ar8CzvgXgHT%2BH%2F0cLJVD5zFcG80yaAc902%2FxUqNq9fUczh8Yyq9Anm7G9nOGM0H%2FkM5pnO3u0h4UQ4K5Z4RPFBg%2Bya4BGI2qBaa9BsidA64VY%2B5TkzI%2BdF1yh8js7GW3o2LgzZEKkeJf8XySIMuA7P9vohXQKNvOASPEekq3zhO%2F9eMvhZiptTrIQ5PkBBI6kiwzPDHwUIrMLHuRgRaA9xwuLEVKuptrvPGY8f54E7gY9hOclogdFyYAaXSgImcbi9SK0ZpqIQFiOzBDB7XhcSD31FVJwIqHf2fqYZrVaDp4qF5PmrcG%2F9XQEnlD7qU6Vy7Hy1IiDbxAuBV0KBtAt5zvQVSK2MVu0fV0RNUc85MV%2BJ7uQ6yK5KLc7yeJJr%2FfimAI1YWCtosB%2FHO1MBt5g5Se%2B%2FU%2FQgMK%2F6O%2Fl6zHqK96rH9%2BM%2Br1f45M66KiS7jDqk%2FIUly1iJHipOdVGjLDIGN3GfiR%2FDqXzBBB1XtQD5F0bAnJo8ePJv5b9%2FtgpYyNMMTB79e4z%2BRCYNUIvJ0nm3OPmkynEpr6q9AMw9OjezgY6pgFuUuLijbbONvPcu9IdkjF2BlIdjD1F%2Bj0RkXV45WsGBY1GR%2Fo2nkeBWuVcH67APvyVl7WmnhOn%2FNH6rHomZWRgyEKo9idrRLSuuq36pfQgM6gRmCBH%2BSxSCrbf4yqMuNcS3a1ICZ15Gizp4ypu1chGaLLum8%2FV6zvnGJJYE%2BpPgB4vjMEF2CwMwN6Chm159Ld7%2B7xVxCnCwfP4L5O21dsiJGFNahQ%2B&X-Amz-Signature=76a92afebaa06469b7c9b5417ee8e14368c75e3d4c7deb12135506b6e5c468d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JYBZ7HP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQD0dEyRN0mSmJUaoEJEb%2FfwyGYDj%2FSbIaegoLgfojjQsgIgLRaao5RPTJJ7wIiwWkELPo%2Br5Rw5UUhnuk5ZPL2dSPUq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDIudBdg7c%2BZIHVisTSrcA5kccsLUxjWwBnL1%2FRhYvIkGiU8E%2BFpBAOTl8WxYQxT0hkU1bfZ5s89JXHZj5OdFf6Y1iir8WKbprMLkUJH%2BFCrsRABmV7ruC1C76LBIDXmzGLXE2luGsY74c0jlT8wWuykApF1pU%2BzVJkbRZHG6l3Pb3iVnsYp%2B3p5ljkAIcDhSIsDUZO60q8TzDEjYFHac8xbOPz8J0I54muQslmrLPk2Szf0KC6531HUhzv1n%2Bqyz19MtbIn63tHYr9HgFAaHOqnSzGRWSRMSVZT5hoSLtDFiFn26XKCosr1tU2O2Lb1kK1l%2F7O6Nc2Sbn%2FygqPdQVbLCA28SlAKbwDoDLiOxljkTplf4tEPlr8Seh2aHMFo6VLgR0%2BmppTiJatNwW4%2BfvIuXg%2FPir7GZO21ubhP93RFDKp4ZVtzGr5fFCE4sCO%2FTJofiAlxyAsumpxMxMhrH3Lb0qKhVAfMd9QuDiCJ%2BB19rndCSnTFp73VYMddhv6raaqBxsYskcfRwLJqXvrKwXUYhy2YuDgg5kVxfbKkhYRwT3SsmJjBXbgp1A5MGoDAVsES4QixW9FHV25edWm2%2F6GEDrsnGfVXwE%2FjvjF1bCdRbuaP6680JobCWu6HqfAiJctLYoqvzASDRjrDAMILo3s4GOqUBp9uD0B%2BAe0m9JmP908GlphHyOtOl%2BqmRc8bhy1Klzpe3pavYkGimQ5iXgPndKWG0qaemDHs%2B%2BRjD3Fa7M1I%2F1%2FYwqA%2Fk6C7jI%2Bhvr3Fvw2r23eqpENFN10Ce1mrrKIGU1bpdQ0oc8ned31LxO8c3%2FO0uZw2cDhBxXGg7bjUa5i8QTCmCzobP%2FIzgF9eE8VRa1OmbNgJO7RetfiPTzR51O6345L0p&X-Amz-Signature=1becf270da2a79243122a9eaf32b8511d3393964ec4b64925f426d415fdbb8dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JYBZ7HP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160811Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQD0dEyRN0mSmJUaoEJEb%2FfwyGYDj%2FSbIaegoLgfojjQsgIgLRaao5RPTJJ7wIiwWkELPo%2Br5Rw5UUhnuk5ZPL2dSPUq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDIudBdg7c%2BZIHVisTSrcA5kccsLUxjWwBnL1%2FRhYvIkGiU8E%2BFpBAOTl8WxYQxT0hkU1bfZ5s89JXHZj5OdFf6Y1iir8WKbprMLkUJH%2BFCrsRABmV7ruC1C76LBIDXmzGLXE2luGsY74c0jlT8wWuykApF1pU%2BzVJkbRZHG6l3Pb3iVnsYp%2B3p5ljkAIcDhSIsDUZO60q8TzDEjYFHac8xbOPz8J0I54muQslmrLPk2Szf0KC6531HUhzv1n%2Bqyz19MtbIn63tHYr9HgFAaHOqnSzGRWSRMSVZT5hoSLtDFiFn26XKCosr1tU2O2Lb1kK1l%2F7O6Nc2Sbn%2FygqPdQVbLCA28SlAKbwDoDLiOxljkTplf4tEPlr8Seh2aHMFo6VLgR0%2BmppTiJatNwW4%2BfvIuXg%2FPir7GZO21ubhP93RFDKp4ZVtzGr5fFCE4sCO%2FTJofiAlxyAsumpxMxMhrH3Lb0qKhVAfMd9QuDiCJ%2BB19rndCSnTFp73VYMddhv6raaqBxsYskcfRwLJqXvrKwXUYhy2YuDgg5kVxfbKkhYRwT3SsmJjBXbgp1A5MGoDAVsES4QixW9FHV25edWm2%2F6GEDrsnGfVXwE%2FjvjF1bCdRbuaP6680JobCWu6HqfAiJctLYoqvzASDRjrDAMILo3s4GOqUBp9uD0B%2BAe0m9JmP908GlphHyOtOl%2BqmRc8bhy1Klzpe3pavYkGimQ5iXgPndKWG0qaemDHs%2B%2BRjD3Fa7M1I%2F1%2FYwqA%2Fk6C7jI%2Bhvr3Fvw2r23eqpENFN10Ce1mrrKIGU1bpdQ0oc8ned31LxO8c3%2FO0uZw2cDhBxXGg7bjUa5i8QTCmCzobP%2FIzgF9eE8VRa1OmbNgJO7RetfiPTzR51O6345L0p&X-Amz-Signature=c7e690855bd10afeb5311dbf4c1f81d19387b0a79f711356b3906194a0893ce4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4QXQUHR%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDxngjhakPxLFzvl%2BbtzK6JS9JWzskt9Ied7mRlUgr%2FAwIhALPAWY0i2d5GuXTxTUmifknFvnk7J7JR3kNz%2Fp9G984VKv8DCBcQABoMNjM3NDIzMTgzODA1IgzXj%2Fm8Vs4V%2FvzYHlIq3AMLc7hfnbU3DRY8xglp1pZMHgCSG17lNev6MmOll1oAhxLfu5zvDBJE76z55aaKKK075h1ft3yHpYcbXDwyRYPQzAGqxzyP9qGLAKXMwclvh9fKvTHSgIlRV4zWfASwww5Bfus0%2FuZLZKGBm4w7CpR2PSXrsQR2Oe4JXVm9%2BuD1dDXKOlkW1OS2ChOatkIp14OFAIIZEQoybJ2%2BtSUH5MfLVJgr%2BJghF01d1cMRrdeqaCOTRfG8jDwEMCgdq8Ev26n6bAaYqTu7ug1fQHWk6MOot6vsDd5KNNoIRmfFtxNApSA1IAzLCE6gdTWLJta5dEJiWY%2B3kDb1n%2F8T6%2F42WHMGnYIZbxA2HBOlHlSX7spydHRgq9bMHC401HKGJXyR9ygNtTP7%2BMDukRG1ApTbi39B0ayc9L1ogpb2c5uYBZ7ebVnWsQKuFEvpxZzglU5MunJfBsoaBi1SZITwEx5Q3JXBNdbNv6aHCVI8HIc3n6XsfGKDXl15nC7oQHGCHclvPPwQy52wHJ7k2WAdepQ5YljvYN4Afzkqq%2B2wr41V8bVhkw%2Fja8UF7yz33Zox6rDVvPYDRskTIA6G5nXlRtEbNymVwbpg8FQVP7AcAl93T7sOVsbEMnOPyQRAws8QzTCm697OBjqkAab587%2BCGTsIcsn%2BXt64O9Ah7xS%2B9KDkWB1Y0y%2FbmAqw0cN2ZBsDkWZudCdQSPnWzIwxJBw8x%2FVzMUg8tXIiWpeSUtClbwKGdr2Gkzzc74HYCzvfMAUba7Vy%2BRkebAAC9%2FERQTIcCTTlLVlY15k6hlvvGXWZQD9kOdQTpXrK6OwFg6AexIF3f5Gk5qO%2FoaEh1xtw%2FiAH5D480TV4JSYl3EVutKoQ&X-Amz-Signature=c76fab91d04cb52411ae5a52ed486bf59f2b52605c5a05b1df6354d3520f3c8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUXAHK47%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIElNCtGgSU1FJQdY5YkXkBq1F6kMbMe5VGBMIAr3EW70AiEA%2FlwolR5TC3sc4YxxWQ1I5JiAszd2xss6viVL9hGzV7oq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDI9K99FsudrSYOpWKCrcA2raerwfunBj5DxUgfTeRSMhqtgZOGtDEfV2ZmDjLo2SzKiEoEON%2Bag2RoT7r29AvaobcY5HPKkzBrdvKUOydHyoSXxd4FDgxlet3yI4x9DaJ0kHRQm79nutuSjr4a%2Fk3%2BYNmdKU0eHLlc96PzWBQ7ZmRg%2Bz1SOpxxQ%2BOgKYBu91UzCBPpKwM%2Fs24m2j2Vhl%2BGwPrr%2FtsYEbveAzqnWOnuWmmlHT0%2FF9u17mtj5GFgZRAndwd0kZD6S1oEa4%2BdgLHUCr%2FEHNeDXVGRzG7K4vhS4XRuV%2B3OosgmNR2pF0r8VbbrfaPI8CF1D4TuAdo0pfCL6bGzpzmvVyQUVq8ZbeyQ4%2FWIn%2BuLrf4CcE%2FjWg0cjb4xohwzZOSltkSaIlNIYrlBYQMvaogatqe%2FX877Si7wAk7458GW4hd5Qo5MM4TChEzu665SxM1s7PNyw4WL3HStJPzpaHz6nUlZN3M%2F7ZJYPtCtzLGuSqJmt9MLbqyUr0sUp4gCj3iYalSdh61xiIWH%2FTEeN2Bj%2BWT2TXtkYwmp%2F0pykpN324zCNdDtK8X%2Fqw2tfab49w47TmybTL4YFjkFHwCODW%2FEue0JNqonMG4jwvYDSGP3xSlBFHDBjB7ApigLxzdzlLtSZmP9d5MN3q3s4GOqUBGa9oEm6IyaGPcTv2ZJzHnCjPQYCP26C0elWhqLXqOobhYDENPq4vp%2BAmEPJ6pePHo7qsJeilNv2iqp%2FvgR%2F7mD0AdjZ3jS0x6egyjhtZpf%2BPpy9zPpgh8ggcdlM1gb5PBBQYjFOzK85npMf3qA0A%2FaxPzPX3UqlumlkaNCgbsKrWsd7M1ccBH5979ym15KjydAA4sIjr2Sxdku7%2BSsKasNSZ7uZi&X-Amz-Signature=58942c3b2cf39335a529f95930ada80dd8f1b67c94cf7e12fc24c97f03c7127c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUXAHK47%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIElNCtGgSU1FJQdY5YkXkBq1F6kMbMe5VGBMIAr3EW70AiEA%2FlwolR5TC3sc4YxxWQ1I5JiAszd2xss6viVL9hGzV7oq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDI9K99FsudrSYOpWKCrcA2raerwfunBj5DxUgfTeRSMhqtgZOGtDEfV2ZmDjLo2SzKiEoEON%2Bag2RoT7r29AvaobcY5HPKkzBrdvKUOydHyoSXxd4FDgxlet3yI4x9DaJ0kHRQm79nutuSjr4a%2Fk3%2BYNmdKU0eHLlc96PzWBQ7ZmRg%2Bz1SOpxxQ%2BOgKYBu91UzCBPpKwM%2Fs24m2j2Vhl%2BGwPrr%2FtsYEbveAzqnWOnuWmmlHT0%2FF9u17mtj5GFgZRAndwd0kZD6S1oEa4%2BdgLHUCr%2FEHNeDXVGRzG7K4vhS4XRuV%2B3OosgmNR2pF0r8VbbrfaPI8CF1D4TuAdo0pfCL6bGzpzmvVyQUVq8ZbeyQ4%2FWIn%2BuLrf4CcE%2FjWg0cjb4xohwzZOSltkSaIlNIYrlBYQMvaogatqe%2FX877Si7wAk7458GW4hd5Qo5MM4TChEzu665SxM1s7PNyw4WL3HStJPzpaHz6nUlZN3M%2F7ZJYPtCtzLGuSqJmt9MLbqyUr0sUp4gCj3iYalSdh61xiIWH%2FTEeN2Bj%2BWT2TXtkYwmp%2F0pykpN324zCNdDtK8X%2Fqw2tfab49w47TmybTL4YFjkFHwCODW%2FEue0JNqonMG4jwvYDSGP3xSlBFHDBjB7ApigLxzdzlLtSZmP9d5MN3q3s4GOqUBGa9oEm6IyaGPcTv2ZJzHnCjPQYCP26C0elWhqLXqOobhYDENPq4vp%2BAmEPJ6pePHo7qsJeilNv2iqp%2FvgR%2F7mD0AdjZ3jS0x6egyjhtZpf%2BPpy9zPpgh8ggcdlM1gb5PBBQYjFOzK85npMf3qA0A%2FaxPzPX3UqlumlkaNCgbsKrWsd7M1ccBH5979ym15KjydAA4sIjr2Sxdku7%2BSsKasNSZ7uZi&X-Amz-Signature=58942c3b2cf39335a529f95930ada80dd8f1b67c94cf7e12fc24c97f03c7127c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676DPCQGZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T160813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCXVzLXdlc3QtMiJHMEUCIQDxPauqYbODyEPvv8w1F%2FQO8riy15S3exLMt5w2%2BAqW1gIgWNu1cOTgKRjTC4P5q8wNR8LYSQUmtYdGfmiPx8FC85sq%2FwMIFxAAGgw2Mzc0MjMxODM4MDUiDMcHukcIZ%2BFk26Hy5yrcAws68TrXzkmC7XNrNfLXFKOBDeUBic9c7A%2BuKdiJc450f9GB7Hd5q573z0iXu8pXo2tu%2F9bmP0q2cRPVXPBEciufbVsZ1HMs9r4GgM36TGPs8d4KFdin3t6sNrs%2B4uFQzKF44pBipclUMzGfAReh5EvIopWf8e0ixkNdJ9p46NF6NLQeWKuq%2FjGcF4DtbiBtxabbQeGEd%2Fs%2Fqgdpuoxw0xE0fcSHBYpjqI4bI7QTfQbt79bip%2FPLoJLVHU%2BDJor8Q2InoIoJe6kiqmXwFsIH1wbePMp%2BHHh%2BvDnpMSPjMocKI0sx1TXdX4avr9%2B135Z6FUHGNzB3CugURDjJY4Pc4Hfjeo%2FPtlLUNdeXe1sfBjV1sIO5vkcp6S7hZTMqnvxXJTn5t3wJUR44RwZtZhF9ZfSsaPH%2Ff%2BVE1AV1p9O0So35j9pl1hHarNKb9YPHYRDDY4EzU0jTLlyW3Mt1Afv21fqIoYUvKaCMU7TSbv0aOWLC2p0bRmU2rzyd5fgsai9Cy8JTvOeRa0dsjTXx%2FaJLuXycWW5j5ucT93Nu8Sbr25YFamuf%2BUNtdAtwzM1%2FFcg%2BGYpPoY%2BpGEEd9vaZfbnl35eJ55zBb2rZ3skK8%2FMOBDEqiQpG9P5B%2B1uWFDYLMJ7o3s4GOqUBcQ%2FpUsJ7bmOMdjRBE6L3N9M3ROGz5wl1GqpCrxMIwShL4OHLfCmz%2FJmv%2BWZcKL7%2BsJ9NeihByS0R6fLWMsJ97pKx3DmoTi9C4p8FaC0nWuIsQ4F7ETH%2Fyn03DsCogc1XbRHZcv1crMUGDqm4gmNlDtdHfD7y9fklur5aGsV1R1O5cF1Se%2FI5w%2FwnP5tisju3aizNOj20Tckpx6dEoEvj7KttiMUs&X-Amz-Signature=ecc94fd655fb63ee2f3aeeb75f048c64bcc4eef49168876c09817775c2fe9e5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

