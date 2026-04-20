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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHUJX4LJ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110735Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIA0O7pqH2NmSrO8GCdpTpmli7PToxUNRCVpj%2F92aAczSAiEArkKsptquK7%2FzgSLrWqHf%2FzqRPvXl2PYdkrOtYePv4w8q%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDPtOfaFnJ%2BWbjn2aSyrcA6zBEiHubjOgMHRvXxmKWY7n0DCihEt%2BbqoXngK%2B7XeLqA%2FhyoRj5bHM2rHpbeTWoQdOLqN7nJQARjNuFZIMhbB7Hc05DS4V46Y%2Bk%2BttKEIYfCN%2FrcArny3Snf0BkJWFagz%2FdtJOQUl6othGm0bleIPZV3IjOCIvdK6sCn2jMX1NMZ0OWaFlsFHszdbzLF%2Bs6haiAiqZeqD6nAHHQwHwlm%2BuLcQy%2Boh9f3ySoPFdNSjmFgx2tzSwWQ3cgW2DF5qRMuFSiwmFRCGPdQQkUB%2FqvE%2FzX7oHX1qc0vMx0r2EW5BNF8YkEhQyZ6mhX4wvp60oVAdpOP5BHlZDTnMmKCOPqfvtzw07EGGarJ7qRO2JM5HtTnoQtbJZAaecsfwBz5As3cy05oSoIJarGD1kb9N6kyuke99osm52aeGK7WuXuRNnmXeMV1PxW1N2lxKXTU3oQbhH56jvugzI5PTUzhu3xdmiptyM8ooUOxdgEbgabITUolyqX8Dmk3XMDG9Izq3JCZYspFndbhkDSCxctPCOk1yovTTERmNmCd3NyzMtKKsNrdL7SJJZm2vK%2BtxVGM9inE4TNiEWGD%2Bgj3GJp1AJDPCVEfKneURj3NU4wewMbfC7XFAtSjLSp51r%2BfVCMPT1l88GOqUBw3jBXT2VbgXQ9LYMHlRj%2BPaG5EeBvGsMsc75olbKcwMSI6w9I9GVsUUFXxQUji9yzfblMWtuRKDKQUsLYY0KAExyEksVrxLGkBT83Fo%2BunTyc4jY5V55cmY4GEEAW%2FjPulaBh6M6rYWOR5Schu%2BcnM6VOGUN4%2BDozfFXp3k16er3q44yTk93d9mUm%2FV4J6lAjpmBaxAc78TM1gkKFKOX2femQkTi&X-Amz-Signature=2db189612e9362c6f47f13e6a550360b25d2afee6256be1c13c36ed95ed163e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHUJX4LJ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110735Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIA0O7pqH2NmSrO8GCdpTpmli7PToxUNRCVpj%2F92aAczSAiEArkKsptquK7%2FzgSLrWqHf%2FzqRPvXl2PYdkrOtYePv4w8q%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDPtOfaFnJ%2BWbjn2aSyrcA6zBEiHubjOgMHRvXxmKWY7n0DCihEt%2BbqoXngK%2B7XeLqA%2FhyoRj5bHM2rHpbeTWoQdOLqN7nJQARjNuFZIMhbB7Hc05DS4V46Y%2Bk%2BttKEIYfCN%2FrcArny3Snf0BkJWFagz%2FdtJOQUl6othGm0bleIPZV3IjOCIvdK6sCn2jMX1NMZ0OWaFlsFHszdbzLF%2Bs6haiAiqZeqD6nAHHQwHwlm%2BuLcQy%2Boh9f3ySoPFdNSjmFgx2tzSwWQ3cgW2DF5qRMuFSiwmFRCGPdQQkUB%2FqvE%2FzX7oHX1qc0vMx0r2EW5BNF8YkEhQyZ6mhX4wvp60oVAdpOP5BHlZDTnMmKCOPqfvtzw07EGGarJ7qRO2JM5HtTnoQtbJZAaecsfwBz5As3cy05oSoIJarGD1kb9N6kyuke99osm52aeGK7WuXuRNnmXeMV1PxW1N2lxKXTU3oQbhH56jvugzI5PTUzhu3xdmiptyM8ooUOxdgEbgabITUolyqX8Dmk3XMDG9Izq3JCZYspFndbhkDSCxctPCOk1yovTTERmNmCd3NyzMtKKsNrdL7SJJZm2vK%2BtxVGM9inE4TNiEWGD%2Bgj3GJp1AJDPCVEfKneURj3NU4wewMbfC7XFAtSjLSp51r%2BfVCMPT1l88GOqUBw3jBXT2VbgXQ9LYMHlRj%2BPaG5EeBvGsMsc75olbKcwMSI6w9I9GVsUUFXxQUji9yzfblMWtuRKDKQUsLYY0KAExyEksVrxLGkBT83Fo%2BunTyc4jY5V55cmY4GEEAW%2FjPulaBh6M6rYWOR5Schu%2BcnM6VOGUN4%2BDozfFXp3k16er3q44yTk93d9mUm%2FV4J6lAjpmBaxAc78TM1gkKFKOX2femQkTi&X-Amz-Signature=2db189612e9362c6f47f13e6a550360b25d2afee6256be1c13c36ed95ed163e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCK27XQC%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110735Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIFgb0bLsthqeI630mlhpToNmMsI80oak1EX2nmONl155AiAn%2FbKXhA2a5YAMYwreJ%2FxYyARm4PrkrAwdWtOeN%2FdEHir%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMTrHwl92NkzOe9GZEKtwDt%2BMyXTSuHpSgeXErbxc0LaX%2Fj%2FnXP3k%2FU8dX4vdFnSlo2CRhe5FPua4u4095sgIuan24gUKihNEbAxaqsurD4aG9Vhsl3ZBtwCc3jZs%2BmzZo%2BnSxEZ57CHQcRObLBc9aZ9ytISJu7HJUe5b4uG52EtiKWNpIclpQmfvm8WggCYO99qoSlzvfl4b2tMnXlJnFu%2BpAhS8FEmyI5oMhbZj43VFn96Sks%2F47CiT9hL7aJdNoDKGe6FjzjdV53O2imsaYs0i08ROg%2Ftg61HS1YBcOVi%2FeaPKKzDSTqp2XyxupAWVxRnakE4hnYHt1vgqtSxdHVMWLey%2BwFZhikfve9CWLRs0jjJmu%2FXXNIB7wsIp1zi%2Fw%2F%2BUn8jUZbU2DsM1DtBQ%2F4K7kRZPod1m6Zf%2Bo95yG7H61RKFCHrEwq4ddotswoDB%2Bp%2BfScfbWUlwVLuPczRVOxwqjMpiXM3UqI%2BeRhSZmYb%2Bv4IvaTmypuvUEmXsEGqG%2F%2BAqBNDl5sxic1W6QQkEfTMJwCFDvmz4p%2BIZMefbh5eQAfe%2B1J98ZFnrbTpQofeNFFqAJ6rucXwcEmekY0k0RPg12qMfjHDQqtGdctMPsOQuf%2FLvWeg8N9YcRoZBGWIOlLC%2ByidH5SztH4N8ww%2FaXzwY6pgF7RPG6zFoMllGgXtjJ2dvkkkrAZq8eS6HMBBWKd%2Fa%2FvwrBGCrWWAaLPXVodUEJw1shSszMX1qKktCNQog3vLQPXe4dZrztP6Ae47S48GQfx4Ket1l2vava5YMRzVOI5QS0K%2BnGZY9Bh5udG79VRZgE2m%2Fl6LrVG0rEuBBHOyPg%2B64AREzun0ZaJAMrEHdwtPLMzy8qGGz5C5bVhFD4MSt8ENuYJSk5&X-Amz-Signature=213f878a81c3714b5135d9dfab71c55c8cd3d6d12e426fe86ec185beb7e9c03a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCWILOKL%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIEzt24MIv7MBOKsxRUm0Gu6ySgNDVodQlK%2FsoKD2ZjyZAiEA1dbQQx3R6jyVCgnXcx85ywqjGSWqjBXRBuXAmtoJT0Iq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDILpxcgPN%2B7kKq4ZQircA6tdMEhHhsKoSSps%2Fg6vlqVcsdBcLdyrpXszLwrY2Dglk%2BBjrnWyPyo3EsU%2Bvxnk6tDX9C7sYRCbnnGb0vw7QEwXRnoutfc0pi0suQt7LPaNgzsjHadRvff7AY0wbz5DddnXRo6gJP3W4Lq7zOhsylcvOM0%2BiBaBjVcWOrtDM9PNdhiqNSXv6giXtj0hkR0zf9rg5ZWcuBb5qFJBiLRvWUcd31XVsDOTjAK45Z62HNvDVIU%2B4%2Br2yxbHBzabsTbgOFW9Z6qCe0I14dz%2FEkAZwTCECz%2BLFMwxh6Ov1eJLrGF9y3RCqkik%2Fj%2B5vNrMXAMTn%2BsyQ%2FDNcCvWY1yc4zLchkDe0vGDB78g8XZ8LKIfRtsDGJ%2F39HTxwO%2F6GDRg7n%2BXFV%2Bzj7ADobpWBF3KouVgGQOGAXe47gGxhFgkdzaZt9EJG%2F%2BqXMGi3zl1cBR6CtpzcEVK8ZEUrazuSIB3udGzDJiVKpRD28rYByfUD%2Bid0rD28es2eDsXvPYs5hXalXc0Vle9KEYGdLUHZVHmkw%2FfN7JTsC4V78Zzyk0eAZ%2B5MYAW9SzYDNFB13qBGmnTqAmPZ3kZEKsSmipy7q5f%2F8UiDF0ki4%2BI%2F6hpkb5YwOasSx%2FUYC%2FuqaO%2BSCeAm8DOMPH2l88GOqUBidCQgT8bMmVFCk7ZbusiVHbNxP4rX9bk4fg7F2REyE9FmLjudUE3PvzbH1Bbw41qrt983CopfhLxD2hGcvchFwR41OmosC%2BUAqQrD9bL3bI54rtLXyds%2FARtLObDdn6UE73vDWlPlGSTb4MEzZzbjC98XihrTHq%2FpOViu7rE0dhhNA48jUjcb90%2FI0vLFufnCkeL98FK%2FRdo04WIPcz2Rz012Dns&X-Amz-Signature=28b46f5c94fe1bbb283d4e22eb27f1787cba44ab77a18139f83584f9f7a06762&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCWILOKL%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIEzt24MIv7MBOKsxRUm0Gu6ySgNDVodQlK%2FsoKD2ZjyZAiEA1dbQQx3R6jyVCgnXcx85ywqjGSWqjBXRBuXAmtoJT0Iq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDILpxcgPN%2B7kKq4ZQircA6tdMEhHhsKoSSps%2Fg6vlqVcsdBcLdyrpXszLwrY2Dglk%2BBjrnWyPyo3EsU%2Bvxnk6tDX9C7sYRCbnnGb0vw7QEwXRnoutfc0pi0suQt7LPaNgzsjHadRvff7AY0wbz5DddnXRo6gJP3W4Lq7zOhsylcvOM0%2BiBaBjVcWOrtDM9PNdhiqNSXv6giXtj0hkR0zf9rg5ZWcuBb5qFJBiLRvWUcd31XVsDOTjAK45Z62HNvDVIU%2B4%2Br2yxbHBzabsTbgOFW9Z6qCe0I14dz%2FEkAZwTCECz%2BLFMwxh6Ov1eJLrGF9y3RCqkik%2Fj%2B5vNrMXAMTn%2BsyQ%2FDNcCvWY1yc4zLchkDe0vGDB78g8XZ8LKIfRtsDGJ%2F39HTxwO%2F6GDRg7n%2BXFV%2Bzj7ADobpWBF3KouVgGQOGAXe47gGxhFgkdzaZt9EJG%2F%2BqXMGi3zl1cBR6CtpzcEVK8ZEUrazuSIB3udGzDJiVKpRD28rYByfUD%2Bid0rD28es2eDsXvPYs5hXalXc0Vle9KEYGdLUHZVHmkw%2FfN7JTsC4V78Zzyk0eAZ%2B5MYAW9SzYDNFB13qBGmnTqAmPZ3kZEKsSmipy7q5f%2F8UiDF0ki4%2BI%2F6hpkb5YwOasSx%2FUYC%2FuqaO%2BSCeAm8DOMPH2l88GOqUBidCQgT8bMmVFCk7ZbusiVHbNxP4rX9bk4fg7F2REyE9FmLjudUE3PvzbH1Bbw41qrt983CopfhLxD2hGcvchFwR41OmosC%2BUAqQrD9bL3bI54rtLXyds%2FARtLObDdn6UE73vDWlPlGSTb4MEzZzbjC98XihrTHq%2FpOViu7rE0dhhNA48jUjcb90%2FI0vLFufnCkeL98FK%2FRdo04WIPcz2Rz012Dns&X-Amz-Signature=77383817ac9289687c24d6fa4ea0ca66493bdfe8a9deb9c8df77b2d1b036b66a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4ZXQ6VH%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIQCv4mUJo%2FbNY%2FOKRgXIE9HfLpbkLrJ3I0trcVGJ0QucLAIgYGMCptRU%2FFS3QEx%2BLMMZxy5jNAMevWP6H9y4UAQDCGAq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDAH2BzwBYzM5IAg%2BjircAyN1zgXiMMHn2k0SA3xYCnQn3MHJw3uOkS4I7WNy05BhBNl0GhkM2fTrW7CZc9yMXIQ8D%2BgaK7AT%2FFCugUa8Mto%2BgRfajnE2c43%2BQFto6l7wilZx%2F3MkrnrIDKJOpg%2FF7xPfauHtimhhrnmjy3KK8M6%2FskhgdiRPQXSXAxZlBM6Wmp7KgQMLki2kgbB28LK2hBYp0lBBSKMmKc5nqybFjMswH2saUh9vrGfHCzBURmm8ix%2FFT5SXIs9yca8onz6zgLyt6Fl2SDt0WjqfVRSU%2BWbkuurryfW4eR66bZ3ufy0sTkUomCo54dxY90TZlvtSDUCW%2FGpB1bjUsjVDvOM2fR77br49DTq139%2BiEFop%2FNvu6SKGwy0edMZnPGCMtRiMUKpQ%2B1OoD0A%2Fq3zkrMpwVTy4j6Qnx3AJTojSC5W54hSZ5bd6lqFJGWmWrkpU3XAPNKRhELClvKPwqIL6hGf%2BrWirYQ9XQ%2FzIEZBFjvemlgmufRwaCA9uNNziVW0aBDaU%2BBbXWLkh0D551hYl64SJgmsGO0EkXmwAcLKkgFnGV8dzq41aKE7DK31692Nj%2BtsPPAyazhouB%2Fc4SCTOqTHGNvxVEffDCdPDvot3KZKKrwaSt8oQIYop1Le4MrNwMOf1l88GOqUBZy8aC6WsQWR08y69Ir2dqisJnOLLX2lV4ybO1dsLcMlffpduBa%2FMVQHbnBsOA465JBYxnesOUCosypIkqTyGB3w%2FQMYkP67mJ2NPmiOW%2B9jMfDBPDP%2B1Yjkx%2FjSvDGuTJqRU0vOKl7lBV5BSZJOzw4Ks1im7tGlo19bJkQ13AkNPbmJGB0cChRt6Lfi8pewiZNp6seVYcTsXPDTQWP9Wu39R7gx3&X-Amz-Signature=87df53c280d7ab16ca6df828ba306e8e1f4cf34a321025b989d9f2c0653ecfab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBEYYBZO%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCIFa%2BHzOH%2Fwlz4K5l2gH5JOfXJou4ubUzwo47X8qbsOPUAiAKw6zamdXQy6CmB%2B8ua7wUj%2Fre2bNi9s%2FE3JcogAEuESr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIM8ycgRRC%2FL2m7HA36KtwDN6q2ID8yqeLkgTC04DjzsMoCH3SZEXoIIQ6lfqa1SmhjkOsiXRQg%2BTE%2BvPlGQfyN3%2FjrNuV8CEswZUkcO1OzI1arFMzWaeWjBT9uQwNIZKd%2B7sRLe2KHRBNaX3%2FdTcva8cbI8x2dlB28d2Z2LRvOaJbhMCCUlzG4R%2B5jnf1gNvJtmypVa%2FLvWtGTBaYQWnZio3ysWkjS1vZ0ryDuBKw3pEgjrFbLAB1eZ61AQqEFjEAOopU7Q7iNDwoe2VLYyxpAVh7slT05XOhR8hLQ6tuRytRrr7qTiLB2U0D1BVN9MW9MYxKQGfg3rQmLl5p7vE8Q8k0ErHouc8%2F74317HRknLhaNx0SHzWzSe98NX%2BOeqAd0w7PRu3q2ALBeKNgU5hH6ZqEiEq3NPM7czVKuOQcOqrInJbb0avU7vxNyDd2QTRd0pOwyw1X5zu0G%2FYtYQmUpSqr41HHDPdi4rXVrmez6MGcX9cUJiPme4EzmrwWJjNN5K4u7iY7R9ZbrSUqgUL1dGVTcsDQ248hc84gUtvZTMu8Xrt2nKCIC54eEj4B%2F6hUgnzG8d2mtPvzZQMfyCLSFa0vZl3Clg%2FGTCG7v%2B15Gmj3ZCn7HpG7BarEkxZcSO%2BmquZ0tqWZROrnicZYw%2F%2FWXzwY6pgEHsAWwlpairYvHj9AnaoOqx9nPu8rWt5Xtgvg2npd2GOLOFi93vlF%2FwEQdYTVbeXpO8MVqVOGR7%2BrEoFdDeBP61GvSyGj0RQBHs%2B5wRaVxf4Lvuk%2BwUHI17oL1dWjS9s08PD1Bg8zv%2BQATXUmQai6%2FkXiIjTH3IWbxzXihMcFT0Lo7hYk4RiRuXO3WhbKvmnOMWAbex9GUjZwczYlHfi1ffjZE3L4X&X-Amz-Signature=3c9f4126bf6274c5b74e10c7fce369b6523c21c71abb4e1064c0ecfaa70db827&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXF5YUQO%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJGMEQCICu%2FJvINoCxOF0QxewgSWVOyoHOIP5qwnVAxwRt8Cs4xAiB8N0Kl073TwyYjzLB9TuQyfgxYgPkMpew0w2eZ8aff1Cr%2FAwgbEAAaDDYzNzQyMzE4MzgwNSIMvW6Apk1mcnPL%2BiuoKtwD3k0o%2FpcYfYybSNgKE%2BG4fRJM%2F0x0u50GXPyq%2BF%2FGXdUVeoYhLUasS0DR3wPfgk%2FMvSubapORoix%2BnelADaO8GUfB0Pf5PCqnQjwDSFlG0InBH9OTf2NiWVVLDm45ZmOnS%2BQqj8PDur3%2FEPXgRc%2Bn37zn3KyZVgBEUUl0q%2F8DAtiRsowkBq%2Bn1LLfv7DIQaPTsIPJprDfRMP5AWVFZT1aUYHvZfppM19mzYq7wjAYVEHCjTPgnXAoK1zpZaltEE73wTeGRVdXT1unct%2Fwv%2FNbnmviws9OFmbW3GhKkTogbNSi44Rx%2FQjOM2dqD%2Fj90Dyi9Js67AVfvC4L8MUuoORTpcP8gc0l85vNJbNSpMqIGTQd%2BPlkJjBtMd0JnpeaMsrGU0rUYrt73sdKtprdkiZKJNOFKZamKFX6E7WM6O4ybJ%2BEVGJWMRaLc5M5FV2khtfvaNGUipNnFc3wzlSzI1kTay97TyUFPnt1jdti7u5Toc1DLPEFhXe8IJXEkm4Q8bnyAuvtq4aVbeZi6KHO3cIbVzXkjioqbH4Ee6zn6gnUTbzhrZ5xhRyxzvakI1Lv2ji2uiYk6Sm1Xp1VGK1CQIF4OUAO3COeG1wiWG%2B1ZYrRfxmVDofIO%2BDa9kba7KIwkviXzwY6pgFqjTqANPCb0TPjt9G145tFAmkV99bVCczD87nW9h4vdz4%2BF%2FjMVVqVKsHPGxAwHw%2BaRgcvgziOpgCTsVSyQPUrtWDkyk4qJKea7OurzxQA7omCjuplfbn816wtw3GTB0glhNs9WobsO8u59msd96YJWYg0EDiUevq8FsWmukmFDmhOEaLil1IEt6HoGVldbvr5zEvlXqv25%2BzAKNSzhbO%2B%2FSiTf5lf&X-Amz-Signature=7182f3c53e7858353b12a6a7280d228946093b21592185f447d01e237f6174ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUVWTXJE%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJIMEYCIQD7qMaSO55B16F3IbYvj727e2G4Rqu%2FrHLwr9KS2zgAgwIhAOxKzEQGJpRhLIbyjA7Cgat58EO2izQjaMCBxGPeGdEkKv8DCBsQABoMNjM3NDIzMTgzODA1IgwnHJCm6OlzlDUgCLoq3AMpCOAj%2F9U1xMkD0Uom5Vr8ys9VdjkDK%2F8ijm2byS2%2BY10uTWPGYDLk%2Fmj2PiBdKfdCGdcR79dCXc0wFXgAEYxAuHAgZhqV1v4wZ3PT%2BR9T2mreELIu9ktluMqK8sCAmCkz8H%2B5wYS9QSTMtmMHwHv1iBt7eBTN%2B6QSTVK2ox5s0H%2FcVbbrW15oNEdCc7cOzFqW%2FTsmVyxF%2BwGbs9D%2BGNAlGG4c6Nx6Cv%2Fe0HDczWBzyB7BG%2Bp9tNN%2FcmNRPnR%2Frdfs2Gx%2FGHwRNs4TBammCSAibeYcIxyfjbst0hnrGLpYOaVUD2j6R4g4OSWmaix1oU9dcfqcdBpIYqk6NdeeSuSUIX3a%2Fi54hmv2ga%2BqTSYcXeo%2BTc04zx74RKAw3VZGlcW9RhdautVgu6Xe4qNFVTpRB7zEs5O0Au2u%2ByplMfFqrmZM%2FgmEQW6%2Fpxu2PbQknHkYu4tQNC03Xz1yJkNoM%2F%2FSx%2BoqgY3NaA%2BDFM08LhtAt9UdVAMlimI8tXvT9euN24ClzMwEqAQvQXRkPkDxAVW9itFCQiK9cwYvPce%2Fmth1KAUFtu%2Ff8MkkVcJkHST1lTbShXdzpe6eyw1CRpOHSSCe6F3aLgtwSg7nXcOOuPldrHxvCa2Wv4c98WoXJzCQ%2BJfPBjqkAfGHJgmS8GQ0f8q5F%2BP0B0slkQFWtzpzjStCZTgiljlUo3mzuUESQC4MK7S02NNC9u8M0bO3lFQOtQhDXvRFrxK8t1%2FAiF8WvgIm3PP95XIzusNeZqCHrX8KhqouPB%2FkWnHKbpqNFiHGrSdPaxXgaKh46I1ZMv%2FGJsT9X4k7oPJyH5g8twLi88q74Wp5O%2FD7Igjmh2NhBoUoajpkRDKcMy6%2FYqwM&X-Amz-Signature=57542d14e89d75a025246ae27c34fa0431c974a915b4a7a899121e10c5887a1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUVWTXJE%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJIMEYCIQD7qMaSO55B16F3IbYvj727e2G4Rqu%2FrHLwr9KS2zgAgwIhAOxKzEQGJpRhLIbyjA7Cgat58EO2izQjaMCBxGPeGdEkKv8DCBsQABoMNjM3NDIzMTgzODA1IgwnHJCm6OlzlDUgCLoq3AMpCOAj%2F9U1xMkD0Uom5Vr8ys9VdjkDK%2F8ijm2byS2%2BY10uTWPGYDLk%2Fmj2PiBdKfdCGdcR79dCXc0wFXgAEYxAuHAgZhqV1v4wZ3PT%2BR9T2mreELIu9ktluMqK8sCAmCkz8H%2B5wYS9QSTMtmMHwHv1iBt7eBTN%2B6QSTVK2ox5s0H%2FcVbbrW15oNEdCc7cOzFqW%2FTsmVyxF%2BwGbs9D%2BGNAlGG4c6Nx6Cv%2Fe0HDczWBzyB7BG%2Bp9tNN%2FcmNRPnR%2Frdfs2Gx%2FGHwRNs4TBammCSAibeYcIxyfjbst0hnrGLpYOaVUD2j6R4g4OSWmaix1oU9dcfqcdBpIYqk6NdeeSuSUIX3a%2Fi54hmv2ga%2BqTSYcXeo%2BTc04zx74RKAw3VZGlcW9RhdautVgu6Xe4qNFVTpRB7zEs5O0Au2u%2ByplMfFqrmZM%2FgmEQW6%2Fpxu2PbQknHkYu4tQNC03Xz1yJkNoM%2F%2FSx%2BoqgY3NaA%2BDFM08LhtAt9UdVAMlimI8tXvT9euN24ClzMwEqAQvQXRkPkDxAVW9itFCQiK9cwYvPce%2Fmth1KAUFtu%2Ff8MkkVcJkHST1lTbShXdzpe6eyw1CRpOHSSCe6F3aLgtwSg7nXcOOuPldrHxvCa2Wv4c98WoXJzCQ%2BJfPBjqkAfGHJgmS8GQ0f8q5F%2BP0B0slkQFWtzpzjStCZTgiljlUo3mzuUESQC4MK7S02NNC9u8M0bO3lFQOtQhDXvRFrxK8t1%2FAiF8WvgIm3PP95XIzusNeZqCHrX8KhqouPB%2FkWnHKbpqNFiHGrSdPaxXgaKh46I1ZMv%2FGJsT9X4k7oPJyH5g8twLi88q74Wp5O%2FD7Igjmh2NhBoUoajpkRDKcMy6%2FYqwM&X-Amz-Signature=c94c406bc0c60826f78a792e4e2c4ae5515145aef82090a90306c7f95f599a96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RKIDRH6%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIQD6n4bNuNRCPwXdJiJ%2B2PeP66xZDKHNiSbf%2BcaZ8umEvQIgIduwB3JKIzHbjDf%2FLU7wqeCWI5IsUKtLWqgQ6f50ioAq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDCcwpqJSPdP4x91ydircA8gaFgXWpYTiAg23yEYExom%2BvbOXBoPp9UlaojrSovmOzOg6lqmhNu8dhyJPNohLnnPntx4AxNwutZD1r8cNXnybogm7AsWIEisX%2BqdnLBvI%2FxUNX7Ihc2tQXea9LAhrA%2FHh7%2BgaqckIY%2BvK3DIR%2BET9Cf7%2FXvQvovqcRTbU8euWjA5hqKhRGIHSLeYUuROBfG1P4odOMoc65MauErvY5KAwCpsLcykPc2x0aE5FuJ%2FbNjpdKrAEape%2BEjBSZ75sdaqAo2l5lNf0aY5qT7qfvuYCX6WYBDnXX5W%2F2eeS8Ywj2ECRkRyUP6KtDI0g2SdEhEnLhs7IE4Er%2F8eO8FmK3Lbubha1NCXUt%2BpSSw4dWBwm8vLSjxcHRENAVoMnnvxzNKcVCp4Mu8yqexU%2BQzuCKW3fAiWtxs4NEfH4%2FTDcsM%2FvJEvlclO%2FFJFFzFtaWNJaHZa5tfADfG0dVAcU9xTas%2F5md%2B4YyvF91TJpYicn2zhmLjB050pN0so9GUUAS4kCoAuf%2BXpSepKUSWh%2BbdqKvtGUtV55wGjoujVmmhyWuUKHDPQ%2B%2BJ3mGVpiUfoCYApTEh00V0usY7GMjGlWjbJYUVPIFenHAPWazySK5GmhiYctAUb0WUQ4wGKywcbtMKP4l88GOqUBBK9JlaDYPwgvIrnqnuLb7AGVRQBlaog35qU1qfXkGb%2F6SMNxiOrXNuPRbCsoflbtHcvdf1S8gYqAxl1nM9FRyam2xTtzKEPdu4hz8YK31udOyH9r8QoUHXLnbaRKSkxB%2Bp922Fgqas9k8MA%2F%2F7G8w5UU359Fe1ZqDw2CHjsT%2Ff3c7N%2BuTDiELBO%2BbFvfPrAtJ8FT8b1e0MU%2BkQcLwRj5wJrU%2FYke&X-Amz-Signature=5b0368797ad2180aff7f89a10ca023ade016773e5277121d6de5eac692d22a4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLK5MFBR%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIQDkPoI%2FgVRhru3bqeHL4%2BX8CAzV6oU3BrThjgFlVLyLlgIgY0rlKGul5%2FlKLqkjp3g66cVwM8UWKB9yBcmjFctZGcsq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDB9h%2FCHZcwy8NsoxmSrcA22pegmvv%2FjgzzH4FjPW%2BZboIMsAVo%2B4s2EcscSbQMDksy5cCrC4%2BEhHIZ4qzNItJHJKwCH6i3b3oTmhznO4ttlGoZ9cH5ZwUsAcE00T4CM3xDJ06rdh96xYrRoNTtivCN5mI1E7ydV%2Bog%2FOVZSnhL2HLQLn7YhxKHgpyPt3qYZyOidoV1iJQG3hmm2oDXsGqPijb8tA3Wkz4yaaqp2ulLAWbnUCccAee6LCWe%2FNYBAzdhqjDdzyX2oCvsnt%2Fmz9PNAbWflNeU%2BERRNgSPrGUdGML%2FwKMeILAC6skkCrfLGBlMVu58ACzVo7qTqnT5%2FmxYL%2BBEq3%2B9c4YQN9w6EQ4sacoaXdfIOlrkeJhVOaLRt9WdUxk8ppyuqxNV5WA3Muq5ly%2BvP4pLNaRJz%2BHNW9P%2FjBkeCBriOZO5UCAIEyMaxq7Gv9wbqmZfAnXQXBiQLjEe5YlaiCzycSWRUAvUYAcaQ3z8asB47yMsn2%2BKJ3m9a3OrYYBCqf%2F6CdaJwyyrC4NFKptI3EiYceKA%2BIYONArtKTo2DK%2FjfL5pTIekXKuLm%2BQFJ%2BpyrFnh%2BvQ%2BzxiaigV1Mdng7xtf4hkddY7G7pNDucdR1qMumdBblzeJqGZjmyzZVMeFau%2FQJXM5kuMKT4l88GOqUBerIzvuDQsiCBUfKsZWZ1A1EoK486Z1cc8N90%2BucSRCKOQAS%2FNz6jUKWJoKEHE551FIOsAWDMtb8c7882vp6c7ekDNGcDhL1sD1%2Fa4gcKhEwQaotJUJTcIjJShncEdIJleLQe8Jsjm2D0b7bXnO9Z6HdY%2Bl7IO9gFL8NVQSGK8vhLa7TzkoLpfry7VA%2B4wTExDrHgrGBY7iRIrRWQro0kAUq5I%2Bbd&X-Amz-Signature=26b759ce32d6114855ccd62e614007c6681ad6dfec82498891da3475a41c4624&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLK5MFBR%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIQDkPoI%2FgVRhru3bqeHL4%2BX8CAzV6oU3BrThjgFlVLyLlgIgY0rlKGul5%2FlKLqkjp3g66cVwM8UWKB9yBcmjFctZGcsq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDB9h%2FCHZcwy8NsoxmSrcA22pegmvv%2FjgzzH4FjPW%2BZboIMsAVo%2B4s2EcscSbQMDksy5cCrC4%2BEhHIZ4qzNItJHJKwCH6i3b3oTmhznO4ttlGoZ9cH5ZwUsAcE00T4CM3xDJ06rdh96xYrRoNTtivCN5mI1E7ydV%2Bog%2FOVZSnhL2HLQLn7YhxKHgpyPt3qYZyOidoV1iJQG3hmm2oDXsGqPijb8tA3Wkz4yaaqp2ulLAWbnUCccAee6LCWe%2FNYBAzdhqjDdzyX2oCvsnt%2Fmz9PNAbWflNeU%2BERRNgSPrGUdGML%2FwKMeILAC6skkCrfLGBlMVu58ACzVo7qTqnT5%2FmxYL%2BBEq3%2B9c4YQN9w6EQ4sacoaXdfIOlrkeJhVOaLRt9WdUxk8ppyuqxNV5WA3Muq5ly%2BvP4pLNaRJz%2BHNW9P%2FjBkeCBriOZO5UCAIEyMaxq7Gv9wbqmZfAnXQXBiQLjEe5YlaiCzycSWRUAvUYAcaQ3z8asB47yMsn2%2BKJ3m9a3OrYYBCqf%2F6CdaJwyyrC4NFKptI3EiYceKA%2BIYONArtKTo2DK%2FjfL5pTIekXKuLm%2BQFJ%2BpyrFnh%2BvQ%2BzxiaigV1Mdng7xtf4hkddY7G7pNDucdR1qMumdBblzeJqGZjmyzZVMeFau%2FQJXM5kuMKT4l88GOqUBerIzvuDQsiCBUfKsZWZ1A1EoK486Z1cc8N90%2BucSRCKOQAS%2FNz6jUKWJoKEHE551FIOsAWDMtb8c7882vp6c7ekDNGcDhL1sD1%2Fa4gcKhEwQaotJUJTcIjJShncEdIJleLQe8Jsjm2D0b7bXnO9Z6HdY%2Bl7IO9gFL8NVQSGK8vhLa7TzkoLpfry7VA%2B4wTExDrHgrGBY7iRIrRWQro0kAUq5I%2Bbd&X-Amz-Signature=26b759ce32d6114855ccd62e614007c6681ad6dfec82498891da3475a41c4624&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WR4XR5NZ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T110742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLXdlc3QtMiJHMEUCIQDH1DfpNSLLCbEw0J3pIxMwzA96k9wnsDQU3q43d0d0DgIgDGo0boZPwnUQzuYLdFIy6dUwxbd85nW7yZt4QBqiwYoq%2FwMIGxAAGgw2Mzc0MjMxODM4MDUiDL%2BRdhGLgNiRfXbIESrcA5G%2BsnZftxQkevv%2FgShN7Un%2FE049M8ql1SLVl5YPBwdwRUIY2AUfaFsBRgomqZ8K8N58JkoL6ElidPZ5j0jOlefT7PppuM3HurgDI2U%2Bkktd7iJDh2cykiIcyR4%2FVApxRLZRjq3YOffZcom1HTbtKbPih%2Bt5S1RmmAURAe7j%2BCb17u9oIUP3ujohwL%2B%2BkHgfpi3uGb0UiFfulnpr1OXXto1tmtgu1s6en%2BDjNizFQWAIjCqZyttdIZvqXnvFTv9S8HkTajn9Fov6xsusXdvnSvL%2FlPwinWX9R%2FQldCp6MYetPw5nILGM6VXcpZJuGp36vse4WXtOMEIfilMzrlFXA7lNGy8%2FZAhxkIrW9Vpc8n2oh0KQqSNLpGUdjpdVyUban26c%2BQjQAXqGMoNkgMCPs3YWJ9OJ6nBJK4ZFz6kTCOeM4RD%2FvDpgiyH32He0%2FKudncHPygH5bm26kyzN3vuVf0uN%2FNn8WrOMLXHsHwWaqT5K9TvqJwJ8BOpPopisONtcmoVWawR2x3jvXbrCyCnbMFDwEqJD9B2jvn2UHzTJfCLGvg872elSM4vIdRr73vc2SCex%2BQVEFWU5xLiI5UWQ0b3tnhking5htCStW3KzPfmrX6%2BoTs%2FvRjadcjKCMNL4l88GOqUBmUlx19QKnklJ%2Fqpeb4yj7cFReFvMScVOS3vUBBHwRTPj8ySmhjHkCGmugs1MxNHkJBtufqp88twZ31%2BsqQ5FxdfxkTNyxDRsTVtbmfwKabf2fOmnY30GpazuiAg%2Bf0GbFeK5RmAbUocN0epNsXH%2FwQswfR88JH1%2Fy0glb7VipKlTaGjsToi3otAkMZpUCL9vIps2o%2BBhu%2B41aqOuYdVNUs0JEHRD&X-Amz-Signature=56a609f367c63f2a6df823f64af0461c3ea0b67bf59d5c2fdfd5241a1cc43d7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

