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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QZXVNBC%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124352Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCICcyxcG8dEJdlfCohOOdNhwA1Q%2BP5rdvPXQyzPdGjNTAAiEArFH8jfdSWus0l3WwhchhHMzD3i%2FJz6AHBaybkv9XTcYq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDKPr%2Fg6DoHNZ3QCTSircA4dARReoZVDobSjMAzfsM8SvqH2R5WEIzrfHJzclquTkHbUmjRbN04WG5CBwiOOL%2FU79oriDRxUp1mKltwhhYWJ5h3rXxEBrKktDwxmIUWn14hAHuJ6ERDQIa5fW7%2BLwVDChN6jbeOieRcvc13ajiAmsu7m6ft24qpJfejikg8oFsOZ6rYK8BqqFQBBjNUxJdWtHxoUybs9GdtA0nwAxUGM636S%2FLhFxh8SoNCJmZzP24sz2BjMLUxmRZQHjHrn%2BMnrsb%2B1EeDAIlCBgdVpsrFi9mCmB99maKfZp48vsNcR53%2BQkqff8cls1rEPEp%2Fg0SeqVUBBDA2tUswpsnzd%2Fh0596vV%2B7GbKqMc9HXn4V%2FY%2Bz5Zum1X2ifiqZZCxdYqqLxJRi61qN1cFiR6FTUfBF4UoXB0kdzR7huNiIzTWxNmoEDdpAXkumxhmIgM3w6F6571pK2l4zJ4of3PAjCWtP%2F9QAs%2Bm1tfRnm5lHWr%2BQqRke5B09q8K4q60tFMTYIOcHvWofEveRYC25%2BS47N%2FS28wOhK%2BQsiHe5npYnL%2BgZasPgrkjny0xOLpMOtQP%2B8%2BerGxc6JxH2EdEXGyZTWYjMYmrJ2ENy7ZC8%2FCnjQ3rWGiveGmcJMlzKVt9FG%2FUMOTMqc4GOqUBzKndzXZp%2FuhyjjS0bzEnD7hHBXslnUeGW1eceVR6%2BtP7PR9UVRN7VaC8saawIkISCPg9LO%2FrpE3Ze85ZNKyXtzanjPVjtuMXqrcTgQwE8MsX9V4%2F6y4DcwOPE7Yn5xhR16gB%2F85mMsr9L8wlecZi0d3qG7w3nDHhXuxK7EYLhAOl0i%2FvJKogM6Pvka%2FUl5F%2F21VTbdzgdBPDc7IQEycmdV%2BJbIGs&X-Amz-Signature=2238d663430ad0b90d186f9b898b478685e70b12852e9ef655f52f5138ca8bd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QZXVNBC%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124352Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCICcyxcG8dEJdlfCohOOdNhwA1Q%2BP5rdvPXQyzPdGjNTAAiEArFH8jfdSWus0l3WwhchhHMzD3i%2FJz6AHBaybkv9XTcYq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDKPr%2Fg6DoHNZ3QCTSircA4dARReoZVDobSjMAzfsM8SvqH2R5WEIzrfHJzclquTkHbUmjRbN04WG5CBwiOOL%2FU79oriDRxUp1mKltwhhYWJ5h3rXxEBrKktDwxmIUWn14hAHuJ6ERDQIa5fW7%2BLwVDChN6jbeOieRcvc13ajiAmsu7m6ft24qpJfejikg8oFsOZ6rYK8BqqFQBBjNUxJdWtHxoUybs9GdtA0nwAxUGM636S%2FLhFxh8SoNCJmZzP24sz2BjMLUxmRZQHjHrn%2BMnrsb%2B1EeDAIlCBgdVpsrFi9mCmB99maKfZp48vsNcR53%2BQkqff8cls1rEPEp%2Fg0SeqVUBBDA2tUswpsnzd%2Fh0596vV%2B7GbKqMc9HXn4V%2FY%2Bz5Zum1X2ifiqZZCxdYqqLxJRi61qN1cFiR6FTUfBF4UoXB0kdzR7huNiIzTWxNmoEDdpAXkumxhmIgM3w6F6571pK2l4zJ4of3PAjCWtP%2F9QAs%2Bm1tfRnm5lHWr%2BQqRke5B09q8K4q60tFMTYIOcHvWofEveRYC25%2BS47N%2FS28wOhK%2BQsiHe5npYnL%2BgZasPgrkjny0xOLpMOtQP%2B8%2BerGxc6JxH2EdEXGyZTWYjMYmrJ2ENy7ZC8%2FCnjQ3rWGiveGmcJMlzKVt9FG%2FUMOTMqc4GOqUBzKndzXZp%2FuhyjjS0bzEnD7hHBXslnUeGW1eceVR6%2BtP7PR9UVRN7VaC8saawIkISCPg9LO%2FrpE3Ze85ZNKyXtzanjPVjtuMXqrcTgQwE8MsX9V4%2F6y4DcwOPE7Yn5xhR16gB%2F85mMsr9L8wlecZi0d3qG7w3nDHhXuxK7EYLhAOl0i%2FvJKogM6Pvka%2FUl5F%2F21VTbdzgdBPDc7IQEycmdV%2BJbIGs&X-Amz-Signature=2238d663430ad0b90d186f9b898b478685e70b12852e9ef655f52f5138ca8bd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCV7OA7X%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124352Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDoYrgyLLmkPIjHkTYiBoOaGKFJJFDeKZIEf5LfXBOtngIhAKA8m9Old6IxRqOp3hzXdEKysrvLc9BRsG2quOI9dkjuKv8DCCUQABoMNjM3NDIzMTgzODA1IgyrlQ231WTvTqgyV68q3AOO3sWo4fNzNEb8i%2BVKkODd1sK19YuU1nVsYKxtYk2A1fNduOfigxx5YbzEU102iPNfPzbZqMgJWGbriRpodrT95WaWjpGCWkKF3bJ2t%2FSX5EYLsDICxxB2d2r4tL8P9aWxMt%2B6Pp4s43WKxlMvjQHtBkvV9cIfx7ZeF3e1edi9TP0c3kpm%2BLLv38U0LQPTCAe9fL62H0FUldxr7HPAujAUu5zGPUdXluflwcpIdcEht57VV%2ByqG9TIGMczhq9wZY2cjnZWcf9TmGFIYTpA0NIlWY3kF3KM8VH4QvRSZmjjHcjuHkH3pEcVqs2dNpF44QX2i6e%2BfzOTu%2BWMtF7v%2Fed6HViylj%2B8cWfmiCUNoulRsdtQwc5k0QYPoFCB7XwS%2BmwSVNyalMpT%2FM10dWkbDz4avNjMAFSGfElbP8dN6ejLMaj6JGLd3bxcgY2iB9HBZC%2F8qkrX%2FnHCiyVR8DFPpqypaMc%2BvVo9I9DDgkUIjhe2go3LZBAgKaOTGG0%2BoaK9AJ91Z9v4otfzoRd0%2FK%2BN9r7SO0Eygqk8v88F40UCw5QuoAjO5prPNo8szyElXvmrgmYRgIUGH%2BrnIl4SnizJJbbZcC%2F5fDkBXKmbDB72uZhEmxPVAw1TpG%2FigH3TBTCvzKnOBjqkAfiboazDbM%2Fyt3mULVeOySjKZ5DdLycVrnGWyR%2FaAQuUdmrCprtbn1CsTdWRXPWgH7icQ3QVXdNI51SOkUXncSJX74%2BMVG2YZoqKi%2FEAD%2BpSfYCEJ5F1qajDDLVrx6WGRESHvpx6%2FlgTUjsOl3%2Fg5QLzbGA7ROabXmDgM8A5P9LwDAbCY0ZL778HMIiMU5JOeg7eiOerK11MLzAamAWMpO0P%2FijB&X-Amz-Signature=c017a67d78f5c570f74beec3fc2d0aafa7d1f8cc0fa85215a9370ab066dbb5d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DSPJO34%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCPG5tf6yVn7PM%2Fd47FQ9A0vRw5dSGSRWGNC%2B%2Fl5OACuQIhAJ21LwtPAZV7hF66or3mCnhoOJXsa%2FZmJ%2BKOx2asP1C7Kv8DCCUQABoMNjM3NDIzMTgzODA1Igx9QzbkVtRzSd6JE6cq3AP7YJStmseuRQG6DJpKEMgIoVsQq%2BOGDaaDZpA1EMJvdotiwSYXkrrXxCpjbca4p8ga7hDdQPpQruxxz%2BeE8LDFhYZxjpjfn8DaGnHsBxXt%2FsG2FmKob3gJbVwZPCwZWHuq3U%2BncXG3qfYgtoOrMvNgnRYAzAGbK6viCTwZm6qZUUXOcy7%2FbDc9oPseK3cJJE%2BynqLLsqo5kEz2W2wn2ankptbmUsEe21AyyAwg3vMK2xFd8oHIRb8t6J1guQMUR0%2Bd9obVRM5hTDB3tmX4HeJP9%2FtYOEkIQ5SFSEsJYHTjdBhyfCVb%2FvykutRCUhKtrHRb2fvOGJzLLSDFxbDkC2YQk1bxGFrP%2F5o6H%2BN35NixH62qi3oXcYB%2Fl1rZVBu5PmVDNxZMhHLCePhPbqdOp2QcnuQ%2Bkd1XTVG1nEy4Z699%2FHh43NevvxBGHyqNW6mdca9gEJiODXg%2FKsALC1yeVKBMq6MFQIeA%2FmPRdohS7NQeQl2s4i3TyM%2FD1QvfrDOBMQopUJ2pyTmG6w%2B7fZ9vs%2FlsIqNBQeW70Xwj6hhMlOjaWIFVEABDcgaz9Wk%2FvPqtymgy3tZRjOxvhlY7AgAs9WhHTg2bQ5cITgn2RbwJZEUd4oiXHL46lDCny1ZU%2FDDnzKnOBjqkAZtM2eTZixaOV2QoFOLtmxponS0xuQeGSwgAGb%2BoFD%2F6zy2M5lQenLOpDdWlXjB0zGx7lopMgmfP5DAelrV2Tdzh8ujxzJTncAYEvtpRRPGaka3q7fKkk4rbSm8S8CD%2B7dZDNkdpUMFxVjCBt4bA%2B9jOJidQs0AGGmwX2%2FP6uFi0uUXqDv4CwtAZU8TKxLdkbko9Rxm7QXGgWc%2FITccXdxtPdYfB&X-Amz-Signature=7bb03402f4b533e1d16d3b5ff72a21f0691013b0bf94c8f3b26a08d548f9e400&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DSPJO34%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQCPG5tf6yVn7PM%2Fd47FQ9A0vRw5dSGSRWGNC%2B%2Fl5OACuQIhAJ21LwtPAZV7hF66or3mCnhoOJXsa%2FZmJ%2BKOx2asP1C7Kv8DCCUQABoMNjM3NDIzMTgzODA1Igx9QzbkVtRzSd6JE6cq3AP7YJStmseuRQG6DJpKEMgIoVsQq%2BOGDaaDZpA1EMJvdotiwSYXkrrXxCpjbca4p8ga7hDdQPpQruxxz%2BeE8LDFhYZxjpjfn8DaGnHsBxXt%2FsG2FmKob3gJbVwZPCwZWHuq3U%2BncXG3qfYgtoOrMvNgnRYAzAGbK6viCTwZm6qZUUXOcy7%2FbDc9oPseK3cJJE%2BynqLLsqo5kEz2W2wn2ankptbmUsEe21AyyAwg3vMK2xFd8oHIRb8t6J1guQMUR0%2Bd9obVRM5hTDB3tmX4HeJP9%2FtYOEkIQ5SFSEsJYHTjdBhyfCVb%2FvykutRCUhKtrHRb2fvOGJzLLSDFxbDkC2YQk1bxGFrP%2F5o6H%2BN35NixH62qi3oXcYB%2Fl1rZVBu5PmVDNxZMhHLCePhPbqdOp2QcnuQ%2Bkd1XTVG1nEy4Z699%2FHh43NevvxBGHyqNW6mdca9gEJiODXg%2FKsALC1yeVKBMq6MFQIeA%2FmPRdohS7NQeQl2s4i3TyM%2FD1QvfrDOBMQopUJ2pyTmG6w%2B7fZ9vs%2FlsIqNBQeW70Xwj6hhMlOjaWIFVEABDcgaz9Wk%2FvPqtymgy3tZRjOxvhlY7AgAs9WhHTg2bQ5cITgn2RbwJZEUd4oiXHL46lDCny1ZU%2FDDnzKnOBjqkAZtM2eTZixaOV2QoFOLtmxponS0xuQeGSwgAGb%2BoFD%2F6zy2M5lQenLOpDdWlXjB0zGx7lopMgmfP5DAelrV2Tdzh8ujxzJTncAYEvtpRRPGaka3q7fKkk4rbSm8S8CD%2B7dZDNkdpUMFxVjCBt4bA%2B9jOJidQs0AGGmwX2%2FP6uFi0uUXqDv4CwtAZU8TKxLdkbko9Rxm7QXGgWc%2FITccXdxtPdYfB&X-Amz-Signature=c41df5bad17c63e189e10822a4c7d0b1d19b6e21271b1322eadf988a4f239b0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PLB3SS3%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIQC5GvOb2rsi4NbwexQQjCNtn82FjF2CA7q5peYznDXHBQIgXNXfvi9Et5WkPlaQHOXMESgn5Vj0luLWyfytznNk650q%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDKqBnoSRGv9vQuuUNircAwtw5Dzgle1ke7cDGeVRqiZbpZR23QAv%2BP%2FKBGWw%2BpFdAyiZQoGWvlnz6kfcDAYkFCbcnF9WHbYoVW5s8ij6CwmfLiG4h8NsdenZd7e5Kt1Pv9%2B32D04YxlyU05ZAgSpM7WoX8tz7MIjRM49NNhoXV%2F%2BsoHwYjkvI3BVecI35TBNfmyvkbuqFtcPk9kWSTNB6plrRMWTJU8eVHXFnjU8VJ8uTcnTYUE7unQd8K7rytHmCa06LdlTpu3WU7xO3plE0K5UyrgIJZnjol31I9M1Ka0ChZ2qhsUw0ZIXCJowg87iFV95oxJWEiEx1O9bCJBMHrlCtQEimvfg8DD%2FNhc0iGg4h50f9WjtkXR2x1XC7hGU2p1Z5DUsZVMDJjTLQ96BNbziODTGcXC%2Fp%2BmEInItrRX39Lk2p0CXudI3tlLsI4yzupkqGXxZ8WIIQqLMP8k3kt06XACKojwlSW8RoRyJrRMm7PeUc%2BqjbBiWNqDGbiIirRzcOTb4dFHUY%2F10NqSUCBC2BCRaScu7cC32nigsTCbOQSkvkk%2F2E4TFm7sa70xEVgaX3mw10uY%2BYw099QsWEpa%2Bik0z8CH3p38RuQN%2Bu%2BLtpnDsVqO4SIF2ZD5X3%2BeX3DxfSKXac%2BTbFUa7MJnNqc4GOqUB8PmGLB4sxTf4uPaAHUi9xlMAZxkaek5wxAJ0ZGfMhCC%2BKabcdsCGPpi0Mk7RiGHIPNkvTaiYz97h%2BobJmyG5Qa2PIJHNIaAR7oeWJ18wqJxtW%2FCraHJ%2F3jPgKcyHnHQeqb9NP5xrjNXkoH5R%2Fj%2F6L7tI%2B6AMyH6aEP%2BGwFQndxBM4KuoxPPA1KQbC2zu%2BTZQmTGecRjGdEgLMhslG3f%2FflC8bLqV&X-Amz-Signature=153a8e61a81689b20b18a9859e9e15855b75cf43f2c9eef76d326ed93d543478&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RK6JCHIL%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIAFfbcYTHgEFhocPSQRPWgZQJ6Ja5J3O6AePzuqnZhKhAiEAoU3qN1y1vTbaX6OVosLZA%2BINAFRVGaQc10fFVYp2sb0q%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDNlnu6KpIxUpkmZpfyrcA53%2FzFjOJPbWoc3T1Xc8ecgGJpwMEKzCbh4zVXs%2BKlPM%2BU%2FnyM0FPul8S1oTyw%2FAljVnUbFkkRB7QYTZIQR5ejFC%2F49ZeTuPX4FXi8x9phnpJmSIKXBQcwYAbqH9B2PxaioUBpi3YFdxGHy%2FxkytUK306EvPoD%2FKNDoxp9VFLHHdfQJFjp%2F%2BLuUJab4HFzEnXr9BVRhqKNMOA2nlNGvjb1GqNiL4a8ncPZNjdoBpS5GcbUkznCsxMBmOH%2BJl4FvEGCFKivzgN5%2FSulPP1lv4xW21Nu%2FcgKLeXJgOBkYtAiRFPMl7RxBuUr0N55ZaG%2FapwOwRRi0SUkNIbBL4owC1m563nGJk9YQ3IEwuEN%2B5C6rya6Gg9AlVtu5re8%2BKJuZbQkg9rhNzGTp6j%2Fwk%2BhgZ%2FwiVqRV55BEaojT1%2FAu6nQy9z%2FM7eQPUJDTZ1OX%2Fxj8GrQ63IdF8A9cVJZwFYtI%2B%2FobEPKiB4XUlmnEKKNZhtKWQx3Ac%2FdBLOSTi3Yc7YVREGIFeJ4pkd9Gr8p3n%2FZ1FPjvrXZtaJcERCKaCzCqy7w15zkMrDevA07udBJa5r4Ph0WN0iIDgWgzz8j2oQBDFRGGCbL7eof1%2BQP1Lvl6vnbgHvyE3ZmVX3tF5jqNGMJfNqc4GOqUBDwdNJu7shVc6Pwofnfn7xz8GsNoGbmrpEZeMRFhB%2BreF16uRJkmv3W1C4qomIed%2BtgE0RWk29pcpWjh22AkSRTR4AXaUpTUSywfui9SnI8oi3c4xWAwxH%2B1wBu3bY4F3Sqq%2FlqvQe7u9dnChHnOXERuuMVRd74%2FZkaLjyw6tgzRHBAtzoXCGCoWDSGNNkHw2z6IDw4BAcxGeBL9gXPEkJWq9xx0g&X-Amz-Signature=d4689d655de44d9d433894818966eafcadc1d20670f5225da2f17bf7ca18e2c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYBBIMW7%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124355Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJIMEYCIQDdmhlZD64i3xtsEclM7owqX71XuuYgpofjrfrKDFjyggIhAPExWIJEyqQGfRP9AM5wzkSlZhrvyUxZbNkGj%2BvdhaCcKv8DCCUQABoMNjM3NDIzMTgzODA1Igz2D1EgVFB1Y18Vpx8q3APByYkR%2FP6G8MfiVA0mMOheyRcF0pe%2BFVOEQdhjdHCzI5kgBcc221nHzISsPR7%2BYX%2FaLLJgW9JUJ5NyLc6Jea2fj9QBHkgk8GS3nAVRZI1OYwH0bB18pV0dwg8EsVX80xfUKpM9sfow52RW5dHrbcffV06CNrl7nUjm%2FOzhxDNuIuWUH8SSenW4ReYSCn5TuixfRNGF6Ib0F0XrxXudx5D%2B2wbzn68FtFTZ4hulWUzT2ZJc7FIwhQK0Sse2sE6A1KmdvMhIM9y1tZ8bpANHthW6DWbxUPzRKFhv5s5LEhHsT2DokXLs%2BtBj6zf%2B%2BuBwCbw47xbhhezrvTfQf5X7J2%2BOe2AjRQJk1Pdfqg0CNxVbc2pxi5lLV2GQEqXXbugCVqZFcd87oXt7vlBgZ1W9QmURjgGrCNDnXoAhJD6TbrS1x9kadH0Nd5iaS1q94sFaefM0MtfgrUIY5ewU6nFjwwFqMAtBoI04CLTwCe3Rl2zjl4jxoh8%2BXLbJFlRy%2BT8T2txHsXHQg44P%2Fc52Gse5q1dqh5%2FVPRepTqYO%2FIUVvnwv3XBGYJTDLt6iUMP2Cz0Jk87Afq8HLJa%2FcfWiIOa%2BNU5YUkAUuZviTh5jEaEsdmn2hg%2FNupf1S8THbo1TATClzKnOBjqkATHIUhG1726NtGRHTbKbpw%2FZB5gUwhilnPtuSsIZ%2FZYU4uIt5NFLHh7OT1tzccP5jVQlUZxLawy1D%2FnCPTVP%2BqXtMD%2FkeaewVCmlboYkzA%2BQOfX0NYi8tyZu8c2kf2ZyyV6KxFe3D6ZEqqQVlZBKOAj%2B9Dcp1gYYJAC9WZTkUPLtEUV60pgXxS6ZknlYkNfO6MkDWulcQmlOnuiixkpEu0LFeicH&X-Amz-Signature=023587bac1e10ed71e05d34681ab7cb45f228d0b110790171a6538a614768146&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667I6HQYFY%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIBBwce20GdgY5WgwARF3BYbgjjgGa8Z1wO%2B%2FJgfX0ayBAiBYbdV5FDZkLoGzUPETJzYTIIO7FknofGrjXTFAFXrn7Sr%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMtzAnjry3U8dMVMOVKtwDmkNTbvJxpsvbVU2nPY7L96xAD2VBl9RELZsfFneQQ4tXu6iSi1wG6yTb8MdNWRqTQOH0FkwHFDXtRFhmwKJE2Zmn1OrCMqD2dMDvKS785pS18mgP%2FLb%2FcU7t2tATLMWewvSuXnyDz7%2FzPgpIQDe%2FLqRgxlNLI1JQfyAL0TwOW6oNO1YDXhdA4qzRyR79eNCq8QoeTbcDU8HkT0sl21ghnwGeOMVExcmfdPvn9LyNLfeluDA5cFFm6qzXR0KFcW9SDt356h%2FXxdcUElwUl67HpRj0%2Bb%2FZfMnq3KttkjbLiJ77Vht9B0STvt3hzbfLxXXkV%2BktV0OT21EQdOtabtFJSRwhfmRE19hwlUqHCRVAWrIAkO8hRv4Xe8GPANJs4NhCztUeoT7wrTJy45j0lHnQLf5F8Aratuk99UKy4gXMU01S66bqbtcrIMhEgFv%2BdHQagZbRv5gJjMWOwIqpZ5rvZmB3ofeHgBepbx6d9UahBXI760PF79sPOZspox48kAOTXFGo88GHkDF0Fu3kqNBYXzZqm%2FMTqXU%2F%2F8zU48SlT%2FZWSOnyLU%2BfPssurmcxDLoAOlGokotTs%2BqPmli1Y%2FJM%2B1eiOz%2BBQhPaIICuHah32apKbmM84XWSd3rUNbgwyMypzgY6pgFVvXT8DszUpxGi%2F1QTNsef7tJlsNCDuB2E1E7ZKsuUmWct0lQV0uqjrdFVbKvQxhWM14kBNUGHY6Cg2b2YtDRh97CNPSzNfZytUOhEpnW1EmPn45PhRxqOwCIVKKtxph04WDCV3AahV3pttOoddmsVSFiFx9k4YW1Cw0W0JEYgjPdBVP%2BT3sBg7Aj12UiArmvAeRIIBkpJ%2FzJjZor8opTV7lRzOCey&X-Amz-Signature=d184c9409a05b64b3486a29a1bddf7b7e7a3a50db91033d8feef2c7b33f50eb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667I6HQYFY%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIBBwce20GdgY5WgwARF3BYbgjjgGa8Z1wO%2B%2FJgfX0ayBAiBYbdV5FDZkLoGzUPETJzYTIIO7FknofGrjXTFAFXrn7Sr%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMtzAnjry3U8dMVMOVKtwDmkNTbvJxpsvbVU2nPY7L96xAD2VBl9RELZsfFneQQ4tXu6iSi1wG6yTb8MdNWRqTQOH0FkwHFDXtRFhmwKJE2Zmn1OrCMqD2dMDvKS785pS18mgP%2FLb%2FcU7t2tATLMWewvSuXnyDz7%2FzPgpIQDe%2FLqRgxlNLI1JQfyAL0TwOW6oNO1YDXhdA4qzRyR79eNCq8QoeTbcDU8HkT0sl21ghnwGeOMVExcmfdPvn9LyNLfeluDA5cFFm6qzXR0KFcW9SDt356h%2FXxdcUElwUl67HpRj0%2Bb%2FZfMnq3KttkjbLiJ77Vht9B0STvt3hzbfLxXXkV%2BktV0OT21EQdOtabtFJSRwhfmRE19hwlUqHCRVAWrIAkO8hRv4Xe8GPANJs4NhCztUeoT7wrTJy45j0lHnQLf5F8Aratuk99UKy4gXMU01S66bqbtcrIMhEgFv%2BdHQagZbRv5gJjMWOwIqpZ5rvZmB3ofeHgBepbx6d9UahBXI760PF79sPOZspox48kAOTXFGo88GHkDF0Fu3kqNBYXzZqm%2FMTqXU%2F%2F8zU48SlT%2FZWSOnyLU%2BfPssurmcxDLoAOlGokotTs%2BqPmli1Y%2FJM%2B1eiOz%2BBQhPaIICuHah32apKbmM84XWSd3rUNbgwyMypzgY6pgFVvXT8DszUpxGi%2F1QTNsef7tJlsNCDuB2E1E7ZKsuUmWct0lQV0uqjrdFVbKvQxhWM14kBNUGHY6Cg2b2YtDRh97CNPSzNfZytUOhEpnW1EmPn45PhRxqOwCIVKKtxph04WDCV3AahV3pttOoddmsVSFiFx9k4YW1Cw0W0JEYgjPdBVP%2BT3sBg7Aj12UiArmvAeRIIBkpJ%2FzJjZor8opTV7lRzOCey&X-Amz-Signature=9a62ba92fdd6766a40e1db61b630514b06da6caba1f419791d067e0bb608e0d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNOEXO3Y%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIChsPZnR%2B6m2TzO%2Bk8u%2B%2FD02dID24k9kNaFLHiwwLV5XAiAxzOis229FZb0fu8iRVBO7Cy%2Fdw6Sq5%2F2lS34mZMCbdCr%2FAwglEAAaDDYzNzQyMzE4MzgwNSIM4rxKT%2FfjMMnAivPNKtwDRBtOFM1ZYJPe8%2FgLDkoCLjlgL7FsutzVUqU2gtbGGBe8LnBgS1pLLCh8J9yrM8PwjipmlyAvS3R4niGKZPJMi73gxglV1%2FyM5AbPldYyMRw%2Fd8XGRnpL%2BXnbh2xSm95nJgUqnqEL8Tee7MiRijzfQzcw%2F4lY90pKRXM0%2BMPQUJg2h0n2m%2BE5Wqr6WFJIFVOTwSL2k9WxmdUIFYUKdUViSBbRComJaR4498DDWNHpEGnPblfK7ezo3PnZOpO90mxODjcCqlP9hyuBM2ZsIRp2LMyQVg%2By0kfpeY9QfWlT2zpVna2hE5XxMq4XwH845fCMbIExe2zWmvWWYPA7JAcm9W4WbwyCyoXil6PwuxFUEKY3VWGd1%2F8noW43KpcQyY4%2BWZY5%2BizVwq9DNLb%2FbaKJxMqo%2BhnKde3Wb5o9dcdNzl7%2FQnJSPuFKZwosgKbVK%2FNEkMF49JLP0ZawKZZB7UN9R%2FGeWRT8akpLvWM6wvLGV4jo39%2BDAK562UTWYlmc2H5hr8kMPBlwoLpEIp5SmJCcz7i85hxX9ZyVUE3w3MgbgWYWt%2FP43FUGutbFQGvEWud0UFS54PdwIV5Z5Tk03wd3q39vSV1mf5YoiKOnWWDRm8jR5MZ%2Fge270Cdwy4cwg82pzgY6pgErZzjd2KKpnLAKaYPMV6AMY3PLEr%2FGVbmAiTCnWastH4XYbzatvhVAZLveAKyfohPmgDU8GrqTeK8BemrwFrUvlsD2ukbQQRm%2BSmmbcwNiqNE6bs7uKQf5uNLSlO7ym3UTdSG0TwnIkBEaDAINo1svWvo8whiZStmxwp1BHnp5GLK04ZdEQw2%2BFsUqvDNZf64WKgXccA45leKE%2FEfdDfaRMhbXcZxX&X-Amz-Signature=2a54d97ccb1657f89a478caaefc74588f8b4adc7da28b5181af918fff12d9f9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3LFJAI5%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIHlsEqf6LhK0sb9NraJqut3rKKOJ4JUGLFl8z1UQ5G3%2FAiAkLQpU%2BH0l0%2FPUZ2Jcs3JZZqo56QC6uwW%2FNloHMtzyzCr%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMeDgUcTmsZE%2FA8SoOKtwDO6odRBm0SmBMbkoa3DBlyFAoNXoU1mgSShESv04R%2FVwsvmxrqIAjpJcY3q14iWoDKuQAnk%2F%2FU1X0S1zWAlNqwPJFM5zzppbYVFn%2B%2BkjHrXve1aKaNPqJ%2FuNQnf3O3n51nMiZAz4mkx%2FUkcONPdsJzfJ8S%2FVIF5CDpxuAJJThHZxDd1x6W0P7cufV0mRKXwGrIIHdXki%2FUkK4cYteonFy2XcPAjUbXGsyBZOJc%2FsSI8vpuIq8P3LrXOBrN%2FN2V%2FIgREr8vZRh5V%2B37qBLop0Drf8%2BnURVYOq0a36g1fQvrZf0iio%2FDo4ZxlOlwTYtFvM7tDUANPeOqDWbqAXOePJ93NjpFhuyHqPkHAxzBBSwEeeYZa%2B1lU4uKkYNATh1xpg4DGJuMFiYPb3OXB1uXPGc3verdoSB7duU5rdlIR5gNxnmJyDyfRoB3xZtH2Xr0wVekpMB5e0G6ElL0Bf7oQlxVwezq5YpGXBIFLHeh3Rb%2FGuvICx90wDzGC5l6zT85Y7ePbQdH0yzgdHCd1JM4Og0PgxDoug9hbwLtRwjh%2F11OVTIC%2B%2FV7hEpaWJ21eCXMifNrn8U2aVgW8szQe%2FQzXNwsNoBudvmfGTkmmJFn1XjNawOnjnDnGbIcGeQagMwiMypzgY6pgEMMkFOYOWJJj2WDTzMRV8IvOTjjPLfdsk8IsqubErNvs50NP3lWnxSFUNE8aJopeScODBAwQk%2BQLzIviCKB6oc1s2PPFchM3HBUXYy%2FPHULXBKfJrOuSy50RENp1T1yIXeW14ANdZME1dQzWbv4kgqUnV9WxT4P5p4QWPfZXz4Rms%2BEJ2JFEpXej3%2F7pOsoUUBK%2BwdF2PaZi0Ob5vkcJr8HRKhZINB&X-Amz-Signature=c5e99857d957e62477949f42f6b018c08928be1a2652b277681d54cce31cc1b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3LFJAI5%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJGMEQCIHlsEqf6LhK0sb9NraJqut3rKKOJ4JUGLFl8z1UQ5G3%2FAiAkLQpU%2BH0l0%2FPUZ2Jcs3JZZqo56QC6uwW%2FNloHMtzyzCr%2FAwglEAAaDDYzNzQyMzE4MzgwNSIMeDgUcTmsZE%2FA8SoOKtwDO6odRBm0SmBMbkoa3DBlyFAoNXoU1mgSShESv04R%2FVwsvmxrqIAjpJcY3q14iWoDKuQAnk%2F%2FU1X0S1zWAlNqwPJFM5zzppbYVFn%2B%2BkjHrXve1aKaNPqJ%2FuNQnf3O3n51nMiZAz4mkx%2FUkcONPdsJzfJ8S%2FVIF5CDpxuAJJThHZxDd1x6W0P7cufV0mRKXwGrIIHdXki%2FUkK4cYteonFy2XcPAjUbXGsyBZOJc%2FsSI8vpuIq8P3LrXOBrN%2FN2V%2FIgREr8vZRh5V%2B37qBLop0Drf8%2BnURVYOq0a36g1fQvrZf0iio%2FDo4ZxlOlwTYtFvM7tDUANPeOqDWbqAXOePJ93NjpFhuyHqPkHAxzBBSwEeeYZa%2B1lU4uKkYNATh1xpg4DGJuMFiYPb3OXB1uXPGc3verdoSB7duU5rdlIR5gNxnmJyDyfRoB3xZtH2Xr0wVekpMB5e0G6ElL0Bf7oQlxVwezq5YpGXBIFLHeh3Rb%2FGuvICx90wDzGC5l6zT85Y7ePbQdH0yzgdHCd1JM4Og0PgxDoug9hbwLtRwjh%2F11OVTIC%2B%2FV7hEpaWJ21eCXMifNrn8U2aVgW8szQe%2FQzXNwsNoBudvmfGTkmmJFn1XjNawOnjnDnGbIcGeQagMwiMypzgY6pgEMMkFOYOWJJj2WDTzMRV8IvOTjjPLfdsk8IsqubErNvs50NP3lWnxSFUNE8aJopeScODBAwQk%2BQLzIviCKB6oc1s2PPFchM3HBUXYy%2FPHULXBKfJrOuSy50RENp1T1yIXeW14ANdZME1dQzWbv4kgqUnV9WxT4P5p4QWPfZXz4Rms%2BEJ2JFEpXej3%2F7pOsoUUBK%2BwdF2PaZi0Ob5vkcJr8HRKhZINB&X-Amz-Signature=c5e99857d957e62477949f42f6b018c08928be1a2652b277681d54cce31cc1b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFT2XBWZ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T124358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLXdlc3QtMiJHMEUCIDDm8PHf8548kGDrRpMd2gRsLS%2BTYKjxupSiEOGkbc0XAiEA1%2Bv51MFJvQgh3OVfGRNBrRDbyRwVnTwd5T87b5dR3tkq%2FwMIJRAAGgw2Mzc0MjMxODM4MDUiDITqpROMpMWIT%2BEArSrcA6Q0%2F%2FlhcQhLlzb3cCZzpyoIvwBibRouvtqyJcGRAsyfNziywZQ5ZlWq0djsOqEIcopbSnivdHmCGjo%2F7ewPOUtDf9iMjbSHEEmG912ILjBFWdZYF0k25aX6VYRj8gnBD%2B3gAvMlsJ9vPP%2BqdCJm5VEWnVugZ6Xs8g84CWmyVJhjjV4CE2yTGLUiKjCR7%2Bn3ldMHn7eDbSAo8gEaYD%2F8Ju%2Few8KleZOPV7f%2BDg9EWR9tVtEo%2FnZL8BfPoRFq2MPCy0nXx9WhKLVgVgnsuoZgfF%2F9p30nD0XQqCBmPnUDcMaE5GYDi%2FjOCVwoaIvCsSP6G62vZ4ffH2ZGQWf6tL7SApd3Wf7VeGGBbElMQIZt0hPu56JrHJkZcwntu%2FoTTu%2BNjjhHqwK1IkDoNWGob4dw6bAEmdczOXJTy0oelyaqeSLWH6096O%2BBggH8aHsSZNpGQM8Y1sUowwpMnmZEWFjeQETp4DJ6y%2FPSRDZVLcx0ZUkhsn2JlywHEoWOEdePqliquf70vqLvEuomsIXPh5OKyzGmaycP25MdAvc9yT2kO45tRtre%2B0iVqEpkqdZVenGE4dtfByEV8rrLesXmqyTMNXLpbcmzeqasyhIylM49JAQDKLiMMpSOUYjeNI3WMMDNqc4GOqUBXydYEdu2QSH%2B%2BmgJEFiGaNs6ynFDMRA8K3Olb3fO%2BKEx9peG6mIFLlJHGqZByvCBItZwwBEPeDIfJdgRMDiki6XwihBrCbR%2FFoRslqs3RYOu7kli2q%2BJDNIHw1wQp4TYL44rIHuHG8QH9ilqR9GitwF5c5CvUlKIFZgn%2BC4CaVwTOja1lnSvNN3kWt0I0iqdylbYjZrA2RQonXDZrwD5KDA9i488&X-Amz-Signature=9fd2fdf548881f10716b8bc344871b85d70db4c788d8e827b0fb8c258af33a69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

