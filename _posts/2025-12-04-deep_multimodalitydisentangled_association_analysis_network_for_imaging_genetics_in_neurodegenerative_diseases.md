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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBA2UGIY%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCVNqfEHjjrTyueqprSnIGnbYYGPEzDnoRPdw6spi9IaQIgXP0TaJC9o%2FpJ7pGIZ9lMG9%2F5rzqdtV2G6jldDTvVROMq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDC3LPYEpRljrO5ejFCrcA6PY9ovXSXBlhCYU7qt%2BH1Xefa7HugWaJzPz2ikfC%2B0xoZ5G81Pm84qnoLujhfNIpY%2F4fs7XxzTzk%2FHKVPWPpdgVHBRmwOKddxGWw1yccJdnOe%2FNiDhwdBGykDHDTJUyoRHCnW%2BfIojU1PFS1N1xyoVRUycR7p9zJgHOZvuSb5GfESonQMieGFW3Iq20nwspA2%2FuJ2q5iRucOj7m%2FKVPmK3IruNFZZjZrZXPavALjFg3ool69JaHWd0rv5TAn8pq9zFoEiTCtxGELbp5XIEYf1LBr1XvU8GXFtI8S4x9cFogbnmpw2vES4Y7l50mThou0%2BMpGVzPn9PNhJiDyIq%2F9%2B%2FfGfrs0CI%2B1cWDcJ1O5gK%2Bt3YKqtpzJCJSK7L4Wes1dyQxSBMqg4zV7c29a0n8nbrXlvWeyxKpE380ypHI%2FIpNUD%2FkIUMrYCkybcMGH5VlN9KXoHfWvQAmQo19vfqq1Tlv5ua%2Ft6XkmdjizqFTXuweg4QfOG2NgehGszc8i4HSwvOGxLLMOdhRmbOELk8623lRBgV%2BO%2F3D6GCdXE5xCVGc9WAQbU5fZoqTKmVC8%2BZr4%2FdMttuLkt3fsHzbf8USRTYWgHakag4IGc6vI8QUSv2ZUSOLRuJao07R4GOIMKy5ss0GOqUBm2mjEadYv3wbpd0VooDb3vf%2F%2F7MIOVoUKim%2Buv%2BWdrXTJKmNxT4QGNAoCC0gTTz%2FytFUL%2BvG6BqAV5ed5oCZMupqildqFiHdj1aKc%2F6MaoB9ok%2BVCV3mWi%2BptCKfkNG2IRqHopjIOGYthX54ByW6wb%2FxBq%2BySl8VqwwFRWAABDV%2FO1MSWw4T3rGrxbKfXN5BLpbyJttxE8uUOiuI%2Fx37YOdPyncj&X-Amz-Signature=869883c1113de36474bf60fc5e91736010c03f57439c99b96f34fdd52e6ad06d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBA2UGIY%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCVNqfEHjjrTyueqprSnIGnbYYGPEzDnoRPdw6spi9IaQIgXP0TaJC9o%2FpJ7pGIZ9lMG9%2F5rzqdtV2G6jldDTvVROMq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDC3LPYEpRljrO5ejFCrcA6PY9ovXSXBlhCYU7qt%2BH1Xefa7HugWaJzPz2ikfC%2B0xoZ5G81Pm84qnoLujhfNIpY%2F4fs7XxzTzk%2FHKVPWPpdgVHBRmwOKddxGWw1yccJdnOe%2FNiDhwdBGykDHDTJUyoRHCnW%2BfIojU1PFS1N1xyoVRUycR7p9zJgHOZvuSb5GfESonQMieGFW3Iq20nwspA2%2FuJ2q5iRucOj7m%2FKVPmK3IruNFZZjZrZXPavALjFg3ool69JaHWd0rv5TAn8pq9zFoEiTCtxGELbp5XIEYf1LBr1XvU8GXFtI8S4x9cFogbnmpw2vES4Y7l50mThou0%2BMpGVzPn9PNhJiDyIq%2F9%2B%2FfGfrs0CI%2B1cWDcJ1O5gK%2Bt3YKqtpzJCJSK7L4Wes1dyQxSBMqg4zV7c29a0n8nbrXlvWeyxKpE380ypHI%2FIpNUD%2FkIUMrYCkybcMGH5VlN9KXoHfWvQAmQo19vfqq1Tlv5ua%2Ft6XkmdjizqFTXuweg4QfOG2NgehGszc8i4HSwvOGxLLMOdhRmbOELk8623lRBgV%2BO%2F3D6GCdXE5xCVGc9WAQbU5fZoqTKmVC8%2BZr4%2FdMttuLkt3fsHzbf8USRTYWgHakag4IGc6vI8QUSv2ZUSOLRuJao07R4GOIMKy5ss0GOqUBm2mjEadYv3wbpd0VooDb3vf%2F%2F7MIOVoUKim%2Buv%2BWdrXTJKmNxT4QGNAoCC0gTTz%2FytFUL%2BvG6BqAV5ed5oCZMupqildqFiHdj1aKc%2F6MaoB9ok%2BVCV3mWi%2BptCKfkNG2IRqHopjIOGYthX54ByW6wb%2FxBq%2BySl8VqwwFRWAABDV%2FO1MSWw4T3rGrxbKfXN5BLpbyJttxE8uUOiuI%2Fx37YOdPyncj&X-Amz-Signature=869883c1113de36474bf60fc5e91736010c03f57439c99b96f34fdd52e6ad06d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ETKQ3RB%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQD9Y5Vr2LCmgVVPcnoncJdyM5TmXovO%2F%2FZLasPr6YKVKgIhAN0B0jAvATJLFodSUivRdjM%2BNEIs%2Ft54YfJajSEY7eheKv8DCAcQABoMNjM3NDIzMTgzODA1Igx6nRPCoO5sj4uA4gwq3APC7%2BMjoZYh4cFyuUVtKQXJyidAxLXBO5vpwnl%2FbGvtXbREZxaUzJwdXgBGIEdf1K2w87n98RZb5p20NqJDgiO%2FITCavTrdGoEbK5kfuwX0EnV612f9keaz62HvAAxh1AzrA7ghmk44ZmNja0Cv%2Bv31rwBEq%2BZbFrY3h4Ume795WcCBT8Wr6h4j4cOdFVNaNvw71GDmQ4N11U0ZHULkSXuLergm0EMURkajpMVRuQieWzKU1XNjmrXzBi7mi9ouwN3OP9V%2B7tAmpvGxSmlpAtcDcqJhkDgfh07hFFjKYmux1gO6ITozFdqJn1JmXmstV%2Bv3m7oxJFIU07Pu3DMa%2BeKmQadNF3dHQMsVI1IfI6HHKU9%2FG3qESi1nYVDKd2W7VyXbK4LtQom1MYHcKuNUtHNz6DOp1X03uxgJ%2BTZWqf8Q12a03pdlmosRDV4U%2FVKJkonCY2yIdzTDEYSx0PPZJCKAZtGOvjbNZGF%2BbR7tzQisvKUQsyjqyzzcrQVlPz7wkNMkQTaDuaSBoxbHdfmuNp3%2F9PjIo4vUdxKBREADKjt%2Bn0TBjbaQ4uE%2FUbh5tvZKGNZoG8PVNkookpvpfq23%2BSyE8V3HDpqPegUf7%2B6JBOL77mpJhEMGBMOXu%2B%2FwNjDzuLLNBjqkARulpR0FDZcvhvffQvqfx7Yjs7J4an6Fds%2B9mEc08cAcJb2VDf2yljYL5YjZcv0tP9dN%2BH41p3x38rKDpSw0YpHrKPWstJh70UIBS%2FOloJ%2FhwHckRh5Z5YWqRbTC0BmvzbvhVCB4kCmrsd%2BkOx3fbP%2FiHjPFDtL9xY%2B2mRTqmrdxqLfychxK6ML9fsa33JoYGB5RsjCdSvz7Pd%2BYzRTtwrMXflDx&X-Amz-Signature=cdad4f286a80e3ffb44c80ea1cb07bf7f80885a190871ac5ccaef6e03e8b0bcf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LYDRWCW%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQCR5p3Ifxb9vvwuJ9UqJ4P9IBZYgKSkdReHfdX%2F9F6F2AIhAJlipUBq5yabcxLTaK1wbAR%2FbvLuR1OAhEMu1Cikrd%2FoKv8DCAcQABoMNjM3NDIzMTgzODA1IgypMWS8lqHcZEEflE0q3APjvmnLYIEPfnAKuiHqklb%2BfsQAVrrYMCLvuuJ81ieGQiGfyHQwrQF5Or%2BkavuH%2FX16rLbfHxkRSaMi2%2FY%2BBt1O6CBNZLK9h1aKWGQYQecYVN4IEWQ1oXu%2FwirotApD8eEUmX%2FaNwXviDXCmxwDjIoozRl2aHVgHl5Xvmd7r%2FBNtufKpulI0kxM6XK1rGfL4wnW893EbclMFcSrgsx2r%2BHtHwpcOnw4aNsgTXU7y%2BuwRgzpAzzY4LnmnFtmPB4gMYXo4NAm9%2FmGa2q3qxwNLcfT8tvoh%2FtFBPsbfh5Sbcs7ttElri0Vn4e3YeF%2FfaAgjKczB%2FvdwMbelY3eDO%2Fafc5WI%2FTYMlGqAmXoyele2UcOvv67EiKW2wI0Y%2FtA7vXN8x8OEegB1nD9jf3Zo8Bn3h3WfvsTfOtNcyXHzpE7Ombsjr6Q%2BHjPy%2BEPfulFSNS8fEO%2F4R3finJhiPDJNARVs1kYwu5ahyo7cQvNZcV%2F8l3PvuQowi2jNhet5GAt63C4%2F3GylsbYwr2F4kZiNaih43qdsJvB55w6rm89gQ2xmzEopReCehlDjR5Rxg6jHGL1Ug5SmL7HLW7GGYnbJGMYTCf8foi3Ol%2Bp4yPGPMZ8jZMIp04P%2B%2F391yRLCWvBwDD0uLLNBjqkAWRhUJhy0XfxwRdRkTnKYZ%2FYCNWGEeVxjnwBDqKtwHAmJtD4cRB8HZJRcXYgDey18J8yaiD5vLAmBLGMgzGkMf%2BGfq%2FDtFdG64v1lCPxuwpUw2U3OmTZsn1F7VSKDLt4SKK9kDx4eOJh9O1eIhRepP6mveqj6OSs5p1uvT2ze4mzb76%2B6MVG3rPmO5MCvyGVCHE0LEPXcx0EYbfBRnaLGanS%2BjZG&X-Amz-Signature=6232c4cee6784d82e52964bc7eb1eb5e5c43fa758be6d93e51c69bcb8c45622e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LYDRWCW%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQCR5p3Ifxb9vvwuJ9UqJ4P9IBZYgKSkdReHfdX%2F9F6F2AIhAJlipUBq5yabcxLTaK1wbAR%2FbvLuR1OAhEMu1Cikrd%2FoKv8DCAcQABoMNjM3NDIzMTgzODA1IgypMWS8lqHcZEEflE0q3APjvmnLYIEPfnAKuiHqklb%2BfsQAVrrYMCLvuuJ81ieGQiGfyHQwrQF5Or%2BkavuH%2FX16rLbfHxkRSaMi2%2FY%2BBt1O6CBNZLK9h1aKWGQYQecYVN4IEWQ1oXu%2FwirotApD8eEUmX%2FaNwXviDXCmxwDjIoozRl2aHVgHl5Xvmd7r%2FBNtufKpulI0kxM6XK1rGfL4wnW893EbclMFcSrgsx2r%2BHtHwpcOnw4aNsgTXU7y%2BuwRgzpAzzY4LnmnFtmPB4gMYXo4NAm9%2FmGa2q3qxwNLcfT8tvoh%2FtFBPsbfh5Sbcs7ttElri0Vn4e3YeF%2FfaAgjKczB%2FvdwMbelY3eDO%2Fafc5WI%2FTYMlGqAmXoyele2UcOvv67EiKW2wI0Y%2FtA7vXN8x8OEegB1nD9jf3Zo8Bn3h3WfvsTfOtNcyXHzpE7Ombsjr6Q%2BHjPy%2BEPfulFSNS8fEO%2F4R3finJhiPDJNARVs1kYwu5ahyo7cQvNZcV%2F8l3PvuQowi2jNhet5GAt63C4%2F3GylsbYwr2F4kZiNaih43qdsJvB55w6rm89gQ2xmzEopReCehlDjR5Rxg6jHGL1Ug5SmL7HLW7GGYnbJGMYTCf8foi3Ol%2Bp4yPGPMZ8jZMIp04P%2B%2F391yRLCWvBwDD0uLLNBjqkAWRhUJhy0XfxwRdRkTnKYZ%2FYCNWGEeVxjnwBDqKtwHAmJtD4cRB8HZJRcXYgDey18J8yaiD5vLAmBLGMgzGkMf%2BGfq%2FDtFdG64v1lCPxuwpUw2U3OmTZsn1F7VSKDLt4SKK9kDx4eOJh9O1eIhRepP6mveqj6OSs5p1uvT2ze4mzb76%2B6MVG3rPmO5MCvyGVCHE0LEPXcx0EYbfBRnaLGanS%2BjZG&X-Amz-Signature=3739d23824f03882fd3d564cf20469711d1e9dc6fea639a05d189e11496c4926&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667N6L773%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQC5UPfBiW%2BeNwvIgepQbtAXGVylRhK9vZWdzWFBjMjBvQIgGByX8lvK58%2FOqrC30dxOt2u%2BizPkC4JWJ8g9ZTDAan0q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDIYOi5Nxo0B4dUVqcircA4mVZzHRADFplqwKU828OcGT6k%2FZef2pL%2Bt%2FidRabMBITGq97ZAfE9CU7Yc5PhvPklV0HXlrPuc26q5hn%2F7D5AStU3Rra%2FegUiRLu63S%2Bre9RerNtUX%2BJ5HwK6nO70k6YlM6wkhNBxCpVUFe2XF1f9LUTdp2C6uDczdQ0UZrPXBWlw7QdPZNVNTZC1ffauKjuvpWVVNAt1n1lcunFCO6dvrvqzPWTcjQItWOIqfO2y%2BMztKGp7OGnlZzv0CqWLXJEgqsxz6X2fpomgqt4bLGMipTuJSVtW3Ma0Nu3lJcQRJcqe%2BQUg8y0RG11E9gj%2BGau99qspPtBuJiBktNavnpUneDh3CrDzyjxcDeMOTDJrwRJQDPaDbwSVMSAME4rHKFpYEhx%2BcQRD%2BjzhwmqPM1pK6d2wMUIa%2F3bVt0ltraxsUe%2FS4L4XBP4d8pgYNKIzTbEeiQqQNYhQyS0vEhyYBLLs85DZr6btwIBdUC9WiJsI11x5oZiSt0nAlCj218%2F%2F7AyWiD%2FWvJce1xOfm5E%2FXX%2FiSzIf0RhGbq0ESt4EwAGXZkdzjK4ezzGpsqHowowifPgqhXwyhLSBA4%2BUyVPxGsrHW%2BNS9eHuRlgELmpsyIhV%2FbpqcclMzClvx6C6KQMO65ss0GOqUBSqe2IaY11STmcQOo1jmy%2BXRKHL41VXB19VtzWKWyVVsC00TQYgGM%2BV9Sy6jZ4sXTNpb0je0NIMY8%2FkeUg31Ufb3TIA2zFg%2BPX9wY3ryL3eqzmvPBVXg%2FyW88JBtDGOfkSMEt6U6AM14SIZfJalSwg1%2FJ2%2FBtNOLsj4jQyQlJ8ISLpmLGkRrHqhPMiGhG3vAC0OJKmwt4GIn1xygvd7M38%2BsixHzT&X-Amz-Signature=5fcb13414c4095572c887220de5d562326245b72d25eebbf296de0e8568733f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GTITEG6%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCICSnxPRrPs1oVKz7uN3%2B43r1tEx%2B%2B%2BRe%2B0uwXrPc24AnAiBmaBHNVmAD6IIP8ieaXlnl%2BDmv9jIa%2FKjsgvm4WqdHpir%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIM9etf0yqpKkr7YzjqKtwDX%2FFW7nMFTCc44FfTfQco5LNiJEhmH5GxIRK71jtT9W4APh%2BYp4AIfSzmxuiB%2FNhVC0i1D7QyjbX2oboZ9j%2BDrr62GD4CP1GUOJqtQNd30z%2FskPTCdW%2BkilFox7r3togDmhx715Zk1KZdq%2FznsaR4ceuj7Z43owuL2a%2By0comAyRHVUprNXBigPjf63mjXUuCzbxR866uqTyd8V21m4LmyK38XM%2FawMrA%2B7%2BRLC%2F3gK82GaXxVVofCdahxoIckNk7a4OTeYQunU2qicm5wzY7Q%2F78P4UaRhz4Rn9iAViI4Po3OjOeUctBAqA3TTi7z56pYbPaSEdP7wuRJ5aopGyj9409TO704VQjBtyE7wvoN3zAf569mroG%2BlAsDvIoCjDbhZiis7WRymFtvmbQPHjt%2BZbRpAGZNfSmNEBpzXYejQlt2VVTbo2Q9SXVGVcKKkNE6m65zgrkYu6KEWloC8WGXmEpurejj0PS3Ees6yaO%2BJLEdoeoDOkWEBjLaQn2WoGpZbXYZC9sJL3UFRl%2B3iKuLdRUpwboT9XnHpKixPEQwnpnI68s30L%2BBz5k5dvjo1qtafvMfDSwAJY%2FDm8xRSjH6bj9%2B1i32kC8Bc6eQfgF0%2FP8%2BBngdO%2BsloPpeIcwirmyzQY6pgE%2BaUezuwufv2HW5w3o8zQ5TWxeJ7urWFWHpTT3n32cyLlQVwAvwoarFu7QKjp7VlnIbjh7oH94tnrmc3G7G3RkYvmdyN5DBCEtsBeROV4pCDDcWt3WHrq%2Fp%2B5bz%2BYa7hjZv6FjZ2XzjMJr9aLGqnmVge3B1ml%2FmqpbSwHfLRzRkDyr7%2BfWaNwsVRRMHL4Xhsw7XRELxxMTd3qgWLH4QkhVrRoNfYT%2B&X-Amz-Signature=c46e0c151d8657442bb27a26b37c5d0cfb008a2030737aad5239b6b127b38e34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VITS62L5%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQDRh6TtzGvs1TtprHGE%2F94Y5wJ2n%2FwB5nFAC9FCkhsBqgIhAM1NYGU7dIsBH0DJ9rL4hkMCdCCpQLL7Cj1x7f%2Fu3l3FKv8DCAcQABoMNjM3NDIzMTgzODA1IgxU8zp8xE5uK1zp54Qq3AOiQBd4ozZHR3JoC%2Fr3KFmkF2ODMp8tS7Nzfo8wul2c%2F4GVQbAZ%2F2HkdtJvIsxoVtRVOaKQnuyAo2bkeL7TCzPACybYhK04u6%2B1VNRkdjDiyHxbJfp%2B5VOjPBJcDMa0bYgCOinOUBfUbDFuRuRkNRi7UXWQq7YcokPeXcJX0lgibSJGdXJDMyeYYC088L%2BT5kdlWTk%2FczEwFZcoH5PQRH8%2BWvsl7eQiUnDWRhe29FLNq07BNCQWsSEG20A78%2BfJy5DIOtYpZ5jCSNXpWOgHZLGgvnIeA9ij%2BkVKF7kdMoGXMF%2BfkclFCwBohQTJ9oiwFgr9gOR%2BBZwPke8IhiPZTGNsB5nLDU7va9CbCRfzI7CqStbmD4hAWC1bvag8or%2FhgSk5t1tbj9gb4NDT%2FQ5LBg9VQYTLWtlGiAHnzuTALppKenRMbMG059HuizcULkRIB8fsdXeFlD%2FWtXvniwB06D3YTBPh%2B3WrJg%2BlCA%2BwMoznS76hMtdEnWF7eeDd6KjMLEmzzBgD18%2BLgwALieGTkue3aq4PqaKjVcXMBJVnbphCA7LySurS90ndVe37ysUVxQ0NvzQ8KL5LEMT6Vo5MaQ4ClGyx5rnyiPTcNfiepdKj8IfeB%2Blj%2FdngoatXYDCfubLNBjqkASo9sAv65NjUosn661kK3G4VIyiocGecN60OdBAlErRRbZx7DSB5TV0%2B9qPaun4e%2FbvWtgooyPBG%2F1AxDiq%2FfDF2BQ57kc%2F7gFInD9kHY%2BF6q75KLneoTETe8b%2FSlP%2FudpOTzr1pVHx2Iz%2BOGKU0Yloz7oHrAySLj3Az0k4TAGVj7tdAqtgP1lhRBh%2FpEtOVt4J3tmFIuPRWoLrmc15CMGNMcb6P&X-Amz-Signature=31dc81dffbab2f1306243b6bb645c907a783551400f6c87a8adeaa2fdb23d1c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EHLXUCH%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIGXSBdmvXgyyu1aMQWp9cjbkjt%2BORl%2BxhFg2v7%2FhyEqjAiBUMoppWzW%2F0M%2FJo5ih762wAoDYdTOtTBXRpedWOqX4MCr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIM2PmuXa8jaM9I6Uz%2BKtwDlEvHQK3nL0MEtN1P%2ForAUmr4ur1vUu4CdwQ%2BUC2jNhlACWwT0GGYbPPGohaUmtBpU6B0gJF22R2cJjMYaorL9PvmaAlx4B9%2BfujNmXq3rEYE1VtEe1%2FJeMNWYBKbWi74yyiiAx7PpvBRIA6KR7aaT22Rv5jl41d4YevwIhXTG04yX3NBSWU137Ncjsafm3jqsELmgAZpT6KjBV%2B8wmM069fILvPlnVtIsZQ8Wid0XyCcKu%2F8jH7yLrm4YPBXydxIpZDx%2FughA4O5c1yz27%2Byq8G3Q%2Bdv22hlpbNQAsymQd2ycNTAtABRwnss2EVJB6F5Ts5YuI7gCJXVUQfk8Lo3wxdZsC9cFGFJE3Ksv%2FhWO%2BL1Z4oke11CbY%2F3dnR94sNmdg5yLfXDzQ5Gu9CY%2BgRGPpsyDG4zxR77Ui0euUQ6kuuK0keEzv3qQ04n75l3NnZbJyOXkzjHXjZ1AQbIxI5MXK6N09qxbD5drnos1%2FjDAEb76U3ZkwTdrE3lByVQzc%2B1tj%2BPfK0V7%2BEZj5ZjGjkgsViknv%2BPYsBAkPCPijS7Iaxqve1QP71zD3DzZN%2FmIoU1jSA%2F5gvtD0NVdElxMiWjAM5rWhbLVUzMZAASpk18dS%2FrJ0kyUDT5zh3PaZEwrrmyzQY6pgHp69Sy10ccNHdvPaXUPMEqNk21ej9G8dr3AnpNFB5zt4xdZZ4J6nPX4NmplwE0o57jCfMnsZcQTyUYHQERnDPYA7Yxligru1z4KsjI64ijT%2BNvWCRQuSnAz70LBLGrujtD4%2Ba2uG9u5L3kCdSfNjajXGxSZqnDSbbe%2FvcUxmZOQ9iZwWnMIWMB4nxwv%2B6ct35MTgXCrrplQv0WO9sectq4Ob%2Bh8CV0&X-Amz-Signature=04ae2526e7b1e383f3aef7f1bd72a0b10f6b47eccc9405a3a740565281979ee3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EHLXUCH%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIGXSBdmvXgyyu1aMQWp9cjbkjt%2BORl%2BxhFg2v7%2FhyEqjAiBUMoppWzW%2F0M%2FJo5ih762wAoDYdTOtTBXRpedWOqX4MCr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIM2PmuXa8jaM9I6Uz%2BKtwDlEvHQK3nL0MEtN1P%2ForAUmr4ur1vUu4CdwQ%2BUC2jNhlACWwT0GGYbPPGohaUmtBpU6B0gJF22R2cJjMYaorL9PvmaAlx4B9%2BfujNmXq3rEYE1VtEe1%2FJeMNWYBKbWi74yyiiAx7PpvBRIA6KR7aaT22Rv5jl41d4YevwIhXTG04yX3NBSWU137Ncjsafm3jqsELmgAZpT6KjBV%2B8wmM069fILvPlnVtIsZQ8Wid0XyCcKu%2F8jH7yLrm4YPBXydxIpZDx%2FughA4O5c1yz27%2Byq8G3Q%2Bdv22hlpbNQAsymQd2ycNTAtABRwnss2EVJB6F5Ts5YuI7gCJXVUQfk8Lo3wxdZsC9cFGFJE3Ksv%2FhWO%2BL1Z4oke11CbY%2F3dnR94sNmdg5yLfXDzQ5Gu9CY%2BgRGPpsyDG4zxR77Ui0euUQ6kuuK0keEzv3qQ04n75l3NnZbJyOXkzjHXjZ1AQbIxI5MXK6N09qxbD5drnos1%2FjDAEb76U3ZkwTdrE3lByVQzc%2B1tj%2BPfK0V7%2BEZj5ZjGjkgsViknv%2BPYsBAkPCPijS7Iaxqve1QP71zD3DzZN%2FmIoU1jSA%2F5gvtD0NVdElxMiWjAM5rWhbLVUzMZAASpk18dS%2FrJ0kyUDT5zh3PaZEwrrmyzQY6pgHp69Sy10ccNHdvPaXUPMEqNk21ej9G8dr3AnpNFB5zt4xdZZ4J6nPX4NmplwE0o57jCfMnsZcQTyUYHQERnDPYA7Yxligru1z4KsjI64ijT%2BNvWCRQuSnAz70LBLGrujtD4%2Ba2uG9u5L3kCdSfNjajXGxSZqnDSbbe%2FvcUxmZOQ9iZwWnMIWMB4nxwv%2B6ct35MTgXCrrplQv0WO9sectq4Ob%2Bh8CV0&X-Amz-Signature=a977440cd06f3810d5959dfd9782395f7e1cb8c65360e78766f33e166206128b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIGW5A3O%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIHffup%2FTec24l%2F1YeQtGzjxhZW5qWJPpdpCi0eYMibpqAiEAuFd75cEVd5icHNLMjrnQZYnrohTRtyCq63BCmUjXqL8q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDHEsCMniHG8%2F2aih4CrcA1KkiWkWzax46GT%2BTGzhVt1sdk0Cgtb9wS2R0qCx71wxAZJHhpdFF%2BcuHCpbY2GAX3xoMurknqzxRE8qL908cQ5%2FBK4CVRdbES54ypR6znAJZe12rx9L6UxYnLZ1tRP5yNyIhcjoSeLUvMfnSmQWC0Kp%2Brfj7PnH%2FDHzgmoLJURRp7kFbde5ZBKitbZU3tRyxfwrowE%2FagqJE%2FhFIzL%2Fb7tMnOcgA4wamQrY99CyBo5qBxyAltBtE2OlchQsjq%2Ff93mxTP6%2BMfsdi9eTJ8ldy0NoJf%2FWFGXd7y5mOKNJoJKGih%2BTzJG5Wp%2F9RVx8WlTXlri0l5%2FmAR6bJa8uUGyYmrTydHzO7Ldr7dwbiZD9cn7jGCvNN3cVBL6gypxe7KgdcUIjkrM8QTNwHMBp8QFZ8qdoNdkxxEmdwL34R0b%2FB0Z2D3kwd02FIMBlgLcqVV1b%2FkK8ZQ4nSZZ7A8inIMxo5HVqb64L%2FcgazQ4Ev1g46sCJmblCHrzqOud%2B1iBj4VaLrDMJG%2BtUB2Vm2V5EByJhJmemc60F%2Bq7%2FeXDb3kdy%2BAu4VGfbWMPluJPUuRaHLDaD%2BQcFrE%2BGe6XgmBBRMBsulVNgm%2Ffw23PRf8zeqnGD97f6cOq6FPZpmbDiCnaKMN65ss0GOqUBMdXXEPVKhVIL%2FzKRo%2BlrTJJ%2FoxG%2Bn%2B11Sr3RZj7y5PTxRjjSt66qCdgIaTAwU%2B79zFI0boA5hUMyNdwrYTJ%2F8SUKMenm2CngjwBKwrJtBb57mEOrU3bvsRJcZRzIkbJ%2BvBEL6ppM4JHxTZgp8gGSZo1Tv9mm0NY%2F%2FuBVNzwYg0sMxvAlDVS4TaccuwKxuC3QkJj5ZWvIOaRDcDz3VJtyOyWata%2BT&X-Amz-Signature=0f637ea593a91eda44e2df8e37670949c821cf81659a9d2955a354e5746bbc59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFGXT3UH%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIDfLdU4laU6bpPyAJ%2B0rZfVQiHYwDGub2W%2Bj0%2FHQgihbAiARjNjkZUTDX%2BAbwmTC%2FdcQcMnXEPT%2B7k4EuW2zFT37wir%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIM9926VII7t06nt%2By9KtwDBbc5pK%2B%2FcBHsqRNw6Z%2FKTCngxYA4bzVr02lHyCzLjtwsPZ%2FQ7fmBWBCQkWJu4BXXwBo4JsWDrORojq07wt7f%2F2JBLKFsFDKED55AI0PnV9Yqf2cLdTpsL48JtNnUGGn%2BnRW1%2BaPozjmwlRlSjIfhxGNn1EBmgeshBw8IOGkXMUvPiphOJ%2Ftpx3UtYhkt4PLcycZ4L8FOqqlQSBt4bIdH9MHTtYjLaQVSRgb%2FBObgJS%2FXetcr5Y2R%2BdpMIRRKio1PqiBTGDUXoFWOBJTdVYcX%2FRUkuVAgk%2BksGyogi9qeLzxxZqyBt4s1QvWV0bcxn7MHtRebqt7c5WQK89AAy0xJyXgxhkwlQhhkK7o%2FqGLSFFQBIC6TrJHdhj4Z3CTvX7P7pJiF8Exm%2FnAK7n4nguATjBiT1GbwPo4rnwgN6aPU%2FJd4dIurlezYIIurCYNWjoQGW3enltdtN3ExKNm1eMzjZeDc3lI3gOfrN4dD22WgQBh3OFDJK%2FeoPk0Gat9UKauKTpJtbFaz9gFffKueMKfrB9%2FSWuW%2FQtz%2BTfq1%2Fpkq7fomP17A8ygh5sbxMa8w2kqaiT%2Fj3QGzAHnsYAxTNgqJWqQa2QzuBkzDQ99frwfDEmwGKYbgFSW5sXT0q00wvLmyzQY6pgGyzQjvgdOkQLnoFxokKz96kcUZHNPFUdeBY3RodBLv2ZRZGikRRpRi4bd%2BfsgwJc5xo3Byu0xUaSpBdbiRSOrzhJwsdEJ8QKmN3eEmu8hayXyYfEX%2FxGu28Odhkaj%2BrT6C0KrJPHdJH6gLrK7FbRQuJO%2BNB%2Fzw5IuSpqqZbLyD49qPvfe%2BMFryhFOC5id9KnbNDQR3S6FDPeTVAuSg9th%2Bt4f%2BJKWX&X-Amz-Signature=7881e67d7696d41600c93309f0da3bd0f2989509a425605b3fe985065bf82540&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFGXT3UH%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIDfLdU4laU6bpPyAJ%2B0rZfVQiHYwDGub2W%2Bj0%2FHQgihbAiARjNjkZUTDX%2BAbwmTC%2FdcQcMnXEPT%2B7k4EuW2zFT37wir%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIM9926VII7t06nt%2By9KtwDBbc5pK%2B%2FcBHsqRNw6Z%2FKTCngxYA4bzVr02lHyCzLjtwsPZ%2FQ7fmBWBCQkWJu4BXXwBo4JsWDrORojq07wt7f%2F2JBLKFsFDKED55AI0PnV9Yqf2cLdTpsL48JtNnUGGn%2BnRW1%2BaPozjmwlRlSjIfhxGNn1EBmgeshBw8IOGkXMUvPiphOJ%2Ftpx3UtYhkt4PLcycZ4L8FOqqlQSBt4bIdH9MHTtYjLaQVSRgb%2FBObgJS%2FXetcr5Y2R%2BdpMIRRKio1PqiBTGDUXoFWOBJTdVYcX%2FRUkuVAgk%2BksGyogi9qeLzxxZqyBt4s1QvWV0bcxn7MHtRebqt7c5WQK89AAy0xJyXgxhkwlQhhkK7o%2FqGLSFFQBIC6TrJHdhj4Z3CTvX7P7pJiF8Exm%2FnAK7n4nguATjBiT1GbwPo4rnwgN6aPU%2FJd4dIurlezYIIurCYNWjoQGW3enltdtN3ExKNm1eMzjZeDc3lI3gOfrN4dD22WgQBh3OFDJK%2FeoPk0Gat9UKauKTpJtbFaz9gFffKueMKfrB9%2FSWuW%2FQtz%2BTfq1%2Fpkq7fomP17A8ygh5sbxMa8w2kqaiT%2Fj3QGzAHnsYAxTNgqJWqQa2QzuBkzDQ99frwfDEmwGKYbgFSW5sXT0q00wvLmyzQY6pgGyzQjvgdOkQLnoFxokKz96kcUZHNPFUdeBY3RodBLv2ZRZGikRRpRi4bd%2BfsgwJc5xo3Byu0xUaSpBdbiRSOrzhJwsdEJ8QKmN3eEmu8hayXyYfEX%2FxGu28Odhkaj%2BrT6C0KrJPHdJH6gLrK7FbRQuJO%2BNB%2Fzw5IuSpqqZbLyD49qPvfe%2BMFryhFOC5id9KnbNDQR3S6FDPeTVAuSg9th%2Bt4f%2BJKWX&X-Amz-Signature=7881e67d7696d41600c93309f0da3bd0f2989509a425605b3fe985065bf82540&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUEJI6JS%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIFQ0iU1F2RQi80ZeH42WNSw%2FO4cFMdcF8M0HqXmLZHJLAiAYDez39vc2z9YAqucu2TIIKfbR0GUqR1OyLa4BPsq7%2Fyr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMUuyQs6KnYZYskG6iKtwDNrZGk593TPXzKFXBZtwSw60mBvuKiEsWMI1HgQooz3318HI66aU1EWhMx2xieLLS0Et1g1pet8y4xgGaADVFelwfrdKsYQhov47AQTZDphjB1zTHWTNYpuFNY%2FHd%2FturIWzuxDPHmYZhKX9jyM23O%2FR1atd86URUXUOZ02lYX3qws1W2IdrKZOP2lfSzZfPJ6oCvIZkE7uftrnF8aHKKCpSbkKbihi0PBFCRMeBloXcItxGb0nK73g0YN3ASf7kUEomhKsVuO50i9ueLc6OTxjHZtDrVewlyMJZ1RlaMppyG%2B%2FduQ%2BEkFllJp5yRkkk4tnX9TvYsHpBbKn0Ko0MioBGqIF04MMpELgU%2Box%2FDQd%2Fht%2BG8w5r2aqPf3%2BLR%2ByaBuFG22FwgVDUr0AGEIe%2BvbX9Xjxxa6mCZVb1xbgkY7wjchBnyvK8dY01ECq3Kpxn3Uriiq%2FoBbZpWRPjlSdFIccziNojDqM9C3Ooi8%2Baq2mV6vkKJDQNHWhu7IcWfxXlN6cdOq0l6qD2%2FjWa4lGrNzQ1qpVBXrWuhnm4U7zdX6hJ7zUO4r9tjcqS7BvIB8vl1abCqYXxt%2Bu65bD6kJKC5aCjMMU3Bzahqr1%2BUCov6bfRnGvNzFeSpGrx%2F7KUwmLmyzQY6pgH85Kpe%2B%2BkJmsp6zP7Gloqkf%2F0YxFseEBs9So%2BRrfLMbq0tSfbanX1notKu5VkovzpFSaDdZP6DMgTEieQIUvT3uyJi%2B55AIP1HLodx55wKewjHT9ocAu48JDP2BBYt1ZzLuJ0Tk7LwO8qRv%2BMfJeaHZqfeRzykQntwDKdk%2FQrOnR%2BL9gdNOvoqXxN%2FGDawDubW6ReYqqbGUnUcuUNPpGfYFWooB6Tm&X-Amz-Signature=45c2d5bb5f867e460b72a56a89d476750a053be3953ba5753c28396601cc931d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

