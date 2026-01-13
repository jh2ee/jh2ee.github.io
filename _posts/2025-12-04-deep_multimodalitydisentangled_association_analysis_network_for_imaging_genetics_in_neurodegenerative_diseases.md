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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNXZIX4V%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCHvQAiqqEDsppzrBp7Uybp4v9N6Qt6%2F9T7fKFZFqIlMQIgLCW9ygATYnvHf0BkORPMf0poQMrI1hSoseAL0n3aFwYq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDO6UW%2FIOMKWmPoYxWircA2uNqqQ%2BxXf%2F%2BCE1m6%2B%2FBPj7HTL3TL1PB6fh%2BI0hL4PbpFWsOG4%2FLje1PtyTFTAxsPSmoE5xLBcHZqGNSiID5c9owmB28bROOtQIFcOUzul%2FOLj1jfjQ0qY70PAhQBzoQuJcGJeCW44%2Fyz%2FbkH9SEDCqGvF5MP7p8MjX3OCSkOgT7vxEEh%2FnI%2B2gUKM2ROwq6VkIty4Nct9qtJ2X39Xsw5i8lKpi2FgzvW9gucAarKgUeS6lfOGIOUcJeyvf09%2B9WJmxyqnSTv06uc9tsdXJG9E%2Fp8fcgBcGvTtj7HGP2rAtL%2BJdyWn%2Beq1EJUjq%2Bo3W4%2BB%2FWe86IVsWzglYEhKPa%2BJb1PcOOysZ4tjH486izy3ERboClD7FzjyltHOiyu99wb4vk3jrTYYfgiJM6zR0ap%2BxO3qocRub%2BT3ZSo91j4WhpwOw1HiCSZ%2BehExQUjkpo1abfmelC7njGTQ6fkyHT1FMl7AS6%2F0C%2BWmfds2qoxcQVVxL%2B9e%2BNx4PHtHTvjp8OeMLoX2Z7L9pGlQzk%2FhxNVfVx2%2FIzykJRJsPQl0D65LyLrS%2Bm1IN0uNOzSOQ1ymZK4biUlMUqX8bIaHh9ckNRBQoC8O8CVt5zIn4UUxZDDpfs%2B3VGiXqvUsLG0ZGMLDVmMsGOqUBvkIckmteUd04qaSk%2BGy913oIgfIgFFd6UM%2FTPQe%2FpV9JbIK%2Bj0Jk3mLvx4LEFjMpvAE%2FoyCYx0bqgiScJTwrr1Y896327ji72KOUax7UAHZgxA4ka2HBG%2FnLjvm0f0ad7Mthflhg1iar0K%2BLZjg0UULFlB%2FGXZGxpNfzmTOEwTrocjsHBNPBxyXEv5E%2BXe9c4i7KgElKoJ48i6gWldX2dP9cnbGp&X-Amz-Signature=4e5ce6f4c4459938c83d85a03e89aea84a4d1f960dca237d2d29273f003ada81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNXZIX4V%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCHvQAiqqEDsppzrBp7Uybp4v9N6Qt6%2F9T7fKFZFqIlMQIgLCW9ygATYnvHf0BkORPMf0poQMrI1hSoseAL0n3aFwYq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDO6UW%2FIOMKWmPoYxWircA2uNqqQ%2BxXf%2F%2BCE1m6%2B%2FBPj7HTL3TL1PB6fh%2BI0hL4PbpFWsOG4%2FLje1PtyTFTAxsPSmoE5xLBcHZqGNSiID5c9owmB28bROOtQIFcOUzul%2FOLj1jfjQ0qY70PAhQBzoQuJcGJeCW44%2Fyz%2FbkH9SEDCqGvF5MP7p8MjX3OCSkOgT7vxEEh%2FnI%2B2gUKM2ROwq6VkIty4Nct9qtJ2X39Xsw5i8lKpi2FgzvW9gucAarKgUeS6lfOGIOUcJeyvf09%2B9WJmxyqnSTv06uc9tsdXJG9E%2Fp8fcgBcGvTtj7HGP2rAtL%2BJdyWn%2Beq1EJUjq%2Bo3W4%2BB%2FWe86IVsWzglYEhKPa%2BJb1PcOOysZ4tjH486izy3ERboClD7FzjyltHOiyu99wb4vk3jrTYYfgiJM6zR0ap%2BxO3qocRub%2BT3ZSo91j4WhpwOw1HiCSZ%2BehExQUjkpo1abfmelC7njGTQ6fkyHT1FMl7AS6%2F0C%2BWmfds2qoxcQVVxL%2B9e%2BNx4PHtHTvjp8OeMLoX2Z7L9pGlQzk%2FhxNVfVx2%2FIzykJRJsPQl0D65LyLrS%2Bm1IN0uNOzSOQ1ymZK4biUlMUqX8bIaHh9ckNRBQoC8O8CVt5zIn4UUxZDDpfs%2B3VGiXqvUsLG0ZGMLDVmMsGOqUBvkIckmteUd04qaSk%2BGy913oIgfIgFFd6UM%2FTPQe%2FpV9JbIK%2Bj0Jk3mLvx4LEFjMpvAE%2FoyCYx0bqgiScJTwrr1Y896327ji72KOUax7UAHZgxA4ka2HBG%2FnLjvm0f0ad7Mthflhg1iar0K%2BLZjg0UULFlB%2FGXZGxpNfzmTOEwTrocjsHBNPBxyXEv5E%2BXe9c4i7KgElKoJ48i6gWldX2dP9cnbGp&X-Amz-Signature=4e5ce6f4c4459938c83d85a03e89aea84a4d1f960dca237d2d29273f003ada81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAPUYTRB%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCID5YQsiTDhC3M4rZLsXeTYg7TZbng9xGvgfZhylbmqZRAiAgkoQPKuxrm%2BugblA3mzJZTHOZDArBKK0h1KBF39WWECr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMA5EA%2B3QjlKfkiGL7KtwDAX7AjSno5DsLmHGAPTaNTePsBWkNvcztmhqlcJ%2FX9to0QXQxCET6fta95k6bndkEzKOirwbzxw%2Frs3%2B7xkP%2BnQ0wjHeociEE%2FVhXsVzVHyGHHrq4r08VuWg%2FYCFH9336wY89jQaovrXCBlEdQ%2Fx%2F3QQ9ZX3gyxnfIr0%2BdppZNjkTFesjb0gsg814FzizokCEJO8w6wbXO4fuQZwQQOLVYut2sN7XeLLRQLAgnLNGzMtp73ClXXfeP41rIEkSyWkwHFAmn2BWp1x6i7SrZ8LY714iu2RuA9C0TSeu6T%2FqSDn2IEJgU0IqL%2BB2v3p0ePRP17HvgWPqbvrVdBCLXufbDx0AEySJ4U0Uf80CwmUW%2FtDLXwr7xK1UB5PLYdrJ5oTEPcSOu0VbHc0eI85fi6Mmmvr1zPXFauzuLKOFvVOH9y0nNEe6HwzgB6yzGbWAeqU5aJHB2PMconY0xJOuJSOaRirmAZwLgQc7MJSbJv6XayxudEr8D%2Fm5v1NPZ2bj4acCXkTi%2FTmwaoBX%2FMZ0W%2B4tSJNmo7pK4o2XvIMPLtvt2nVQsyXBIn%2BGY5o7UM3IH76VDsWO6aPexEDRgXOkShbVvd5tSksIrHh6yIWUYr0gDuBXiEnMaKgNM%2FW%2BRRYwndWYywY6pgEbhEbrnhJip1MVBwu1ARjEgCp%2FRonT0oGhr%2FE2eI39m1Fm1z2qbp4top7pT0JijCjXjQ3xhU2kXLarjFHQYNewb2N09X0UE%2BX2sgCK6MdXHqSrm1cHQldHMBhEElXFcYoIBlxJxzJB66ySfF7JrKXgC1PHKwTr0oTtjJSmaNG51TT680%2BL93SRsdxu5iqmUS2edc9uLS4MUlRMj71O9j3QapMQh2a7&X-Amz-Signature=14dbd1a674c3fc00e27a795128fd760fe8d376ff937a62cc3df48ec821629e35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZ3SGFLD%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDYsLH3rOc1aWtrnvz5Td22yrnE5b22UjEl1%2BKqG3w8IAIgeSU2SiaIalECCtqR8kVGTf4OjjnnXxUcOYERsurEMwUq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDPFBOYua%2BLDYmiZVjyrcA2hAgmsrsl5JgFz0FGl2%2FC62%2FIQJJ3fOekbUvXkPcBaamyVTWhneY%2FpQJd54FQ0uXLxrxMPgPBR3c87qHV%2Bo9ExHwIRWVlpwDHBHN7NBuOFfHeAe%2B9O%2BXRovQ1cdVwKJNxU08EIa6YY1zOW%2BZi%2BhIVOjWRgigAPrlT6Zmi53swxkv8omNGG0LHmmfu65kPRtwdlXwvmrbgN4FwUG9lVmHKY4MQf%2F4GOkGOp11nZn%2FojAVZcAo%2BsEVDnMxDIt7SqSvkrMUJ1hx7gAsOjYVSJAuxrETTKIBmny9TcGSJQ%2Ffc2e4W6Y%2Frc8rWRc0z3thKFnzTdXM11PnIAGbhOq8MqqSWjUHsMWne7pU9%2FBTGXKXoaQ7ozQY%2BRNpPMPDUAtNDR0QEghI6WWqrqo5cVmG9AnaGyF%2B%2F6r%2FyMshYoXBRe2hsnXCT8pxQFzdO3bV9uwkn8zyffl8HEGH44Kd6zn9wt7MwwtudEJ5qddn%2Blo3YhLYNGjSIZ%2B%2F8txSx72WorcMLMDio%2F24IJBDWGRBOijwW7opCQ0dmWXGiS6XH68TYrmoKGMp4qpFp7dNrT77qxnVz5sePt9GfVs%2FA6EUy%2Fh81LIn6EsEPJtZ8b55Inqsb5RpQ1Lif37KeOKvFejYxDNMKfVmMsGOqUBq1hED4kAS%2FghQQGv0afuoKkHaN55zOGLT2hY2YaKwMTRyX0gT%2BaNKIF0An4oXiEnMw0cUuEKv97uc051NxvgwyPnuJ%2FH6bmTTuNZRFeL%2Bmw92epj46UjWr44XooFpryAsRUTZokE26rH6MrTVpYfyjKtuLLHrjwiRIFxQwpUjzDlkmJguxCNGYGxcqCV6aI9tSWc4MJvkUAg4F3C52byAuqB8OQD&X-Amz-Signature=1572f622f7626e0f0a6d1081ca4c81666b565079ea6fd23be73df011303c35b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZ3SGFLD%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDYsLH3rOc1aWtrnvz5Td22yrnE5b22UjEl1%2BKqG3w8IAIgeSU2SiaIalECCtqR8kVGTf4OjjnnXxUcOYERsurEMwUq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDPFBOYua%2BLDYmiZVjyrcA2hAgmsrsl5JgFz0FGl2%2FC62%2FIQJJ3fOekbUvXkPcBaamyVTWhneY%2FpQJd54FQ0uXLxrxMPgPBR3c87qHV%2Bo9ExHwIRWVlpwDHBHN7NBuOFfHeAe%2B9O%2BXRovQ1cdVwKJNxU08EIa6YY1zOW%2BZi%2BhIVOjWRgigAPrlT6Zmi53swxkv8omNGG0LHmmfu65kPRtwdlXwvmrbgN4FwUG9lVmHKY4MQf%2F4GOkGOp11nZn%2FojAVZcAo%2BsEVDnMxDIt7SqSvkrMUJ1hx7gAsOjYVSJAuxrETTKIBmny9TcGSJQ%2Ffc2e4W6Y%2Frc8rWRc0z3thKFnzTdXM11PnIAGbhOq8MqqSWjUHsMWne7pU9%2FBTGXKXoaQ7ozQY%2BRNpPMPDUAtNDR0QEghI6WWqrqo5cVmG9AnaGyF%2B%2F6r%2FyMshYoXBRe2hsnXCT8pxQFzdO3bV9uwkn8zyffl8HEGH44Kd6zn9wt7MwwtudEJ5qddn%2Blo3YhLYNGjSIZ%2B%2F8txSx72WorcMLMDio%2F24IJBDWGRBOijwW7opCQ0dmWXGiS6XH68TYrmoKGMp4qpFp7dNrT77qxnVz5sePt9GfVs%2FA6EUy%2Fh81LIn6EsEPJtZ8b55Inqsb5RpQ1Lif37KeOKvFejYxDNMKfVmMsGOqUBq1hED4kAS%2FghQQGv0afuoKkHaN55zOGLT2hY2YaKwMTRyX0gT%2BaNKIF0An4oXiEnMw0cUuEKv97uc051NxvgwyPnuJ%2FH6bmTTuNZRFeL%2Bmw92epj46UjWr44XooFpryAsRUTZokE26rH6MrTVpYfyjKtuLLHrjwiRIFxQwpUjzDlkmJguxCNGYGxcqCV6aI9tSWc4MJvkUAg4F3C52byAuqB8OQD&X-Amz-Signature=40a04cd40aab2458ee11243ae5b899ca832167b88a3ef7215f2bbeb681d9a72d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJMBHQKZ%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIGtjqSdsxeTeluxCo6pE0oWIl%2Bh2TCU0xCZpbASFpW2mAiAryr8J8TEQFRSmHDI59Xwnohmb1kzTzkjI9n2%2FKGIWIyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMxW0SvQOpxqP704x7KtwDQYFu4CA146WgmzT1qsi%2Fc9%2BSp4hmCz1qMmWlhPjAa9ab2FVkxJIGgyF56tfg%2BVfAXnUUircQ2ks8Ql0krHiTTBu4QnWmKRtPxn%2BC5vB6i5faDiEQMoQZ%2Bmb32A4XpkEwPYwGgfOZP8Yve5eE4MExZp7oPeMqpUVpGRVfXhEGB%2FgZ1l41mTmD8UuLsxkFoEJQS3nA5P5WPEcTZGENQIG4lMdROwtbfepyEokbu9C%2FzjXx%2FMSungHJ7s9nWVhpHx6IY0W1oOATOAbIPMCYl1DnhkQYIK24VG5QoiQJcOaC8gvE%2Bby3rWXy7o9BrQ5KyehR8OxK4YR57HUs5co2Owy%2FNs0pM0hjZRv9Dc6QIpODGq%2F8BfTqxFWsvVJyulMKTcrxWeveZZhxsXsjDw3FmG086p5EvAahdRMhAocPq%2FhGz6tuQvEtOi2Fnngn9IsjnIM0kdUM2qw2RCo7GfHuzUuqsamE11vQfwyibFvPnJ7T0JN6ZhSDXvdQwGl%2B%2FZLuSnn4Gjueg0RG0krmmSCj8AXoRxCpwXigKc%2FKvz%2B9NeXpxkx%2FKkSt%2F4v5POh4GcamKTMdpCW1Ad0NvVgTU0nFAi3h2wh3pu2Z2RXVScDzqQYKitVXkvXd%2Blr78kl7kQcwr9WYywY6pgFZ%2B8g4NufUrTPd%2BoRNR5L1r2kvqlELp2YwmO3Es2ZFGaaTYoHdPAThFR2FC57ywdP%2BTE0A378Vu97gmMUD0MmMLQ2cYTvex61eptLUy4i04%2BLhY1nV2JXHkEei1Cb3lr66TsKLcxQjCGUp0L8RZQC%2FKqXBhYKP2y7edzVR8kKwKsf7tbcCntLzRCb67eKNKu6lR1gWQpbtbL4OKikICJX0U7UU%2ByXt&X-Amz-Signature=f8cdf875459f04b8743848be47612dbdc017892d56339489ad6ca7c7b667c57e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYCKPPGP%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQCjMZ%2F60tjtROp3s3rNQ4VaESmqUZipWgWVUXORGRv3PwIgUJoNo2aQcTeMtH2nyWgYcmFR9D20tBTqnRV1JcjlGc8q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDIcAvHj%2ByGFC4KMJXSrcAz9MvVTbp0JvtaA9kA7BHPnwMy1XHsRs4nD5DAdhq87jAs2ssBAkFcOFpzBrW5cEApwnqgzQp06L3EqCJORr%2BlZgJEl1VfqnuvBiVN559G%2FWka1dejW9M1RVYYMxSiL6FCqmVPyO1Q7miHsYwrBvRCYJEw1PF2gUzLXgeJh1SuFh1nqqS3GWFO24guVBdFTVAk9TQX9SmwdqrGfcFV0aGtNrXr4byn2kvXOvT3fJwml9yk8r3MZuQCK96PO%2FPAdp%2FjkNly%2F2tNzjdwqUaxCpyq7xrXAY4sAqDBGbWG%2FjGBMVJ9xjemcZU7OpXWWxh0A27m1Y59JHBVobIZX7YhxlmQJOnjos27UCV69zBrpo24S7Hr%2BHFT0AzdIHBS3pM9jCuIQrQKvK913RV%2FD5MD147QEJnuV3UiRLeMjL0oHBDTCiaWB15O%2B4%2Bz32Ke3Mx5mT5qNsA03ekEgyIO86fJ1g0ubuFmS%2FerN31f3Un8mMaFZh8Y2GJ8x3g85M7Qe4uViDdT%2Byf1sI1emqLgUdkHjpqATkR1L98dOD3zRrGhVvw3VusmKOOYTMf6DLheAbuYATou8ZZhxcmYzKGtW5%2B0A7n%2B9lRG86mR%2FCtcHzJQfv5WBXpv4tXGUnqYa3JiC3ML%2FUmMsGOqUBlRXvZeYCcne%2FciChpxGGc1U%2FjFc4jG38jMrY5zn8mHjlDOeRf7Y20LP4EBlucKHsYmA8usRKsBjToeXc5l%2F%2FVwLBX6EypPg4u8%2FeYlfTq4r6jz%2BZI4ytsyp2qxEApIl4wgxjSeDtma%2FvfXma414722VLTzGFrN%2Fp%2FSojF8I5DmlvX1BiaqZr%2FkiO4foe9VuCtnJAVFulN2KuitCSF%2FEhLf8%2FoGhy&X-Amz-Signature=b6e8f072bb12f7496ffbb1108f630ce7747c497bfd1a79932a994c964faa9de2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HSIFVUY%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCVhJFJze%2Buj05zGoDLm4wRSc1uT34r4%2BaMeKlQfN%2BqJgIhAJHmB3dAMeCCqpe5rHoqu5tuRUnw7kud9fTp01mUlKvsKv8DCAQQABoMNjM3NDIzMTgzODA1IgztiOICsJ03C%2Bz4yqMq3AMoIuEMe5OvwTFdMQAhpB1HurjtFLT1MD2daVZ2KzUnj10XLXy0rJBKvcJ%2B%2BVP4xurEXEv7njGgPEz7wQKYmJNJY3WrB62cvvmVWEZ5cdSip43Uq47W2Q3MhM3UDITZdF%2Bguw0tYn%2FSp5gp20heopdObdwt2xzY1jhB0HXmKPsdgXlpiNcZDvGlEB%2F6Z%2BjiMw8I1BslL92629JhKPbg3LZNH3X58dXKX7tw361sWDVld3kOmcufaE1B3OE%2B1qbNB8cRrms23xLzsXnNWRKhNtUanctUGavOv0YfkQ%2FaThz1p9v8ZNQv59t%2BRaVkPqZy0nJNhFP0HFFj8vq8Ucy90FL9i%2BQhcnz69I75kCu8H8dmHJ0rLRQBhpLu7Qpk%2BCY%2FZvRJSHOA3Tdfn7ct7wZii%2FzvFQH%2FzYvmPCmvBp1Wk6Mabckq22m1yF3SWO94cPPKWydRLH3L6LskBPABED3fxJDpyrpOJCzFmnomttCKnMtu%2FUc%2FpiH3C6ZX6NYv4n3drzf%2Fj9dbWDuj%2BK3otc0uHoJjGriSjnxVt4RuimkJ0Egmzv1Y6wCYpOwaUJ74q%2BvwCr1yzeDcOPrOA%2FWiomibOTGwplKMEpU8Fl8CnHqc3cM11CJa9TWDI5RxfNpH6TCi1ZjLBjqkARTtF4DZtqGmLoBfMgvFKJFksA8yq6LCsXDFe6ETgBWASWNXK4ns6guqym6QcJdXCxYYVzk8uFL8QqGtm90BY9Oki3sDr6oa7HICNNDh%2FWGcPZ6935VFYdrdTFyZMA%2B%2FeTRH%2FNzkrQ3aEdoMX78nTwAeoOC%2BFG0ik48C54vANUidVF81GXrGgPxUzerFTEUGZ%2FvfhAIXDRiSIxqAXIDiQ9DGYyQF&X-Amz-Signature=5cb659ae28c6da3fbd5fc7a5e9d1028ec599ace967a20802f1d7b6ece4536b90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJURH7KJ%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIGNr%2FGVKt14r1FUQHNnX%2BY1ZidL6M2nfe1En1dEqEJerAiEAw5Uo6dMaNNzeQUCa96yK%2FE4gDOnZq0AAVSyrdQDS5BEq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDKhZfbp467087%2BqQ7SrcA4u6FFPoUbn9dL0%2FrCAbAU5i%2BpXrz8nEzD2x47CGbuzHEWDbHx6NAXuGkKnJsvdPhEfgvPAzP8BLYnpCqNiPkoom4q%2B%2F9vAoRH6J4gUK1iuTbLdcQaUtunZzKN5QHlUlazcYmt6WO5UJsVYOZ0k4ZRy3C7EJBp0ECVi%2F3NpQvjyNTOU0Nhs3slqFLAIZMIhgvC2yqYHRkdxCMfCUz7RjYf9%2BLWh7WsK0Hwq5Wlx5ouYp4ijCX00Q0CxKL19A88wtlcbTbjBohfPqg9XfgmBVNYqHhM6RrAgRm3q7n9LRhPEtJTwqTRGYLhtgP%2FLJACYITaxteOF6KPc6tDFNL17HhDdcA1Kte5NYLbXKPMKjARVEj2cNq4I7EPoWxA1%2FXamY4qGU7Nd2Yq3ruR1aGNJ%2Bd6qELSt0o0zcGOVwgI5O4vOLVq0zyXCVf3iLmaR6Qr9ZHjm%2FUK1aeMF1qE1s%2BgIfq2lAh%2BSMT%2Fh7aRkJJTtXd%2Fdl4FQsVy6poAO97lf2%2FWhTv5m%2BbjzH7ojld5a6tDQ3XJ1xSJE6g%2FkJxsErX6fphK3hUczsOkIy%2B0BmoinjyDZ%2FRxw6XiSrYP2E%2BiVKdLCXTAnNd9882RAHM7Dpke7k%2BzvzH%2BN9ocqo%2BvYdgS9fMIvVmMsGOqUB1YD61i8lVfF40jvGSYyphneOPdYoOpKYPADsUQ4XgKJ7gq%2BkcRl6vUrj%2FszttoqiVxFDvcNnhXlWluvFihYlTVTMQ8qv3YPrX%2BA75uFTxxVUALDN17w7mKKg6lmDSlKI7GQ1y62aOCb53S9DozeOieKaLUYiKDYLGTY7svvL1UgyqT53Nk%2BdV%2BYYNa1p3x2%2FHEysvnDZHFbwJJo6bDjvkMmWDaV3&X-Amz-Signature=0f8a46e8731f4c8d6cb1521fe76da85f85ce6d3025fdb4c80d370eee9db90be9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJURH7KJ%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIGNr%2FGVKt14r1FUQHNnX%2BY1ZidL6M2nfe1En1dEqEJerAiEAw5Uo6dMaNNzeQUCa96yK%2FE4gDOnZq0AAVSyrdQDS5BEq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDKhZfbp467087%2BqQ7SrcA4u6FFPoUbn9dL0%2FrCAbAU5i%2BpXrz8nEzD2x47CGbuzHEWDbHx6NAXuGkKnJsvdPhEfgvPAzP8BLYnpCqNiPkoom4q%2B%2F9vAoRH6J4gUK1iuTbLdcQaUtunZzKN5QHlUlazcYmt6WO5UJsVYOZ0k4ZRy3C7EJBp0ECVi%2F3NpQvjyNTOU0Nhs3slqFLAIZMIhgvC2yqYHRkdxCMfCUz7RjYf9%2BLWh7WsK0Hwq5Wlx5ouYp4ijCX00Q0CxKL19A88wtlcbTbjBohfPqg9XfgmBVNYqHhM6RrAgRm3q7n9LRhPEtJTwqTRGYLhtgP%2FLJACYITaxteOF6KPc6tDFNL17HhDdcA1Kte5NYLbXKPMKjARVEj2cNq4I7EPoWxA1%2FXamY4qGU7Nd2Yq3ruR1aGNJ%2Bd6qELSt0o0zcGOVwgI5O4vOLVq0zyXCVf3iLmaR6Qr9ZHjm%2FUK1aeMF1qE1s%2BgIfq2lAh%2BSMT%2Fh7aRkJJTtXd%2Fdl4FQsVy6poAO97lf2%2FWhTv5m%2BbjzH7ojld5a6tDQ3XJ1xSJE6g%2FkJxsErX6fphK3hUczsOkIy%2B0BmoinjyDZ%2FRxw6XiSrYP2E%2BiVKdLCXTAnNd9882RAHM7Dpke7k%2BzvzH%2BN9ocqo%2BvYdgS9fMIvVmMsGOqUB1YD61i8lVfF40jvGSYyphneOPdYoOpKYPADsUQ4XgKJ7gq%2BkcRl6vUrj%2FszttoqiVxFDvcNnhXlWluvFihYlTVTMQ8qv3YPrX%2BA75uFTxxVUALDN17w7mKKg6lmDSlKI7GQ1y62aOCb53S9DozeOieKaLUYiKDYLGTY7svvL1UgyqT53Nk%2BdV%2BYYNa1p3x2%2FHEysvnDZHFbwJJo6bDjvkMmWDaV3&X-Amz-Signature=baba20a05cbcf4d88c10d253dbe041be6f559ac96349e827f8260d1ed0b6a7e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5BOWLKI%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIE%2FFqd%2BBkIbT72bguVr%2FuHMgCkhuYt3hf8j8fp9QF3Z%2BAiEAs092ltJJhSmt%2FlBgevh7n3Ps2lKyvE9uH%2FefVEbmExwq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDCSWeHi4FL6yAgC%2FlyrcA1VK1pP1jzPcodI0Urs6JM1IRLOeXt4Z5MIN4IzzuJ1lfN71Pbcqz5QvK5wi1xLzQsqQBY7ju%2BEUvRIamVuN3%2FZ0Vh%2Fwd3nd7ylVXa1RBF7%2BsxXFb1tx7ZzgzFLSTrDfgnrxf1qNuEV8dMmWHdcnUyNOr7FCBgISYUKv6bHDhbYQjG%2BDV3E5ygaw1k6xjatpeXnq1DK2ePCXb3fi83KjdlOb9KUYrwx7%2Fb0E0FtVi8ocbYBfjxV9bUiMRr5RXDAC426B553tqX2eStG4G0iP5aqbjglWroSeyQWd1hKpbiRH3z9iz3rv2eOQFrG0o9r86wZtLD4VP2e2y9L2NuJiY5VSZKTk7xn%2FPqQezYWTXfkH0NbBbXGllpuzMjJXzO1tuaAOyy7VKw%2ByfzMNJCzsDqScddbMb4nyfGN6fvlh1eeFOjgYLpe18Cb709JgOym4J%2FEhbX%2BAhANhy4bvcNWz5xobM8yaNhdVy1xYong0o%2Bn3Vr%2FcMCnPWjPT9kETmBj%2FRCMjKfd03aRG0MvmHLmelQyNBpHZ%2BYvNKx4zGWR%2B9%2FGj72KNKNY2yfLYRVcE6VoS9mPZ4jo9DlRpEXqzm349KKkFgn0ilg103hxYZMQ6e9bWabDE1yUB18veXFXNMKPVmMsGOqUB0L3WXYT3DFKLyk8Cl9OJhgra5Wx7hgA%2BaDa8lS4lVVZyWzU2DCUsbanRgoeqQIsh2nn1Hh8qrqhjxcuCkA64VJZejRZ87faPWt0X1%2BBrbwva6d%2BDicQWgdH84QI44gmsohJh26znVOsxWwQAimEpJAdD91lbNBOfj64%2F35edobXJZVZDfi3i6uN3W2PfVWEwq2d5jx4l8%2BzFwe33j0ws3%2BS44XGU&X-Amz-Signature=89d6303a2e5092cfc35d86276ebd9a4c707fcc2f76b3904d6a1b257f2e85afe5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ABRRQ73%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDzaW515PXd0RESn8Q0KpjblayNYSdeevKjlznBxMpnSQIgcquEaz%2BaMskSe39%2FRRxUJWl2W7e7pmpy9fCC6cfYT9Mq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDLsBUiaNNSn8rb%2BzGSrcA5ZiJWoRW6XmbfrrTw2MVkxGZ0816J0yvah1emAVfEg8M86HaNFgaz%2FzyWHRGsUeCrjLghqOL5adwHMimvMJw5LT%2BDx7AkYc2xqmEBdYw2BwLc%2F3NzLXqtnquF7At2xqPXVC%2FlMxkJjS3nuxhpee7HYKqTScdboITQhLhcjdYldRkUPHgS5%2FdTDssuWjrpXfX3i6rSO7EYApI7DZCIk5beAm1lN%2BcC6uCzBvawO49z%2FNPSisz4OB3YYE5HKI9okV6An4FBWbrqDZG5KCYi4bfXUf%2Bb7oEtGfNf%2BtBZ5C%2Bx%2BC1x54mO6cLzjTzwjkoYSCmIiaBOmBxEihmvb3DSH9TbWFrwSGFpqzcTuwEdmGT59o97UKnV%2BHAwDWBsH67mpMEawtbAtUFHMvGLA7h9AKZe5jbzu6J19q6bFpW3eB3FpiRJZvVmjN6YrFOcEzjDa53w0v23Evlu4QQJvuTnA0eTTbIt2D8984m2uWql%2FhqsVBpRvX%2Bcwb0ls5aqNaS0jGI31FyY9y%2F7Y8O2Vxt%2FlOeTLpdOyNFkKU4Ah3jukz0t8svBNIgZ%2FTFgTqUj1krnTlrKvsekFjnubTXRDJusK4xI9zUaqoB4gxW7HWVDbXLmwVPIkyWT%2Fyq4abo1CHMNPVmMsGOqUBUddWwR8Br6JmdxzIKOaDOG2WHINFTRygw6xbtCYTKBRYV%2FoOph12obyFeliun9w2wdhBpqKsSmVsEea8LaiFilYeDCG56YR2ehEIS0cnUySN07uwpoCF%2ByooeKWcEfZXi4P924F9ar0b0wkLEj%2BHgV0dLP5Zj9K68YqxNDkeRNRMbOGT8K6fSl5ub91gsg%2BN5%2BfkGmFLfJ1YCIR29ErZhhEt7XmC&X-Amz-Signature=fe6e4194e9bb1546ee5fd2191bbc918ff81b18a13fe4c88a0a39ca9140a134da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ABRRQ73%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIQDzaW515PXd0RESn8Q0KpjblayNYSdeevKjlznBxMpnSQIgcquEaz%2BaMskSe39%2FRRxUJWl2W7e7pmpy9fCC6cfYT9Mq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDLsBUiaNNSn8rb%2BzGSrcA5ZiJWoRW6XmbfrrTw2MVkxGZ0816J0yvah1emAVfEg8M86HaNFgaz%2FzyWHRGsUeCrjLghqOL5adwHMimvMJw5LT%2BDx7AkYc2xqmEBdYw2BwLc%2F3NzLXqtnquF7At2xqPXVC%2FlMxkJjS3nuxhpee7HYKqTScdboITQhLhcjdYldRkUPHgS5%2FdTDssuWjrpXfX3i6rSO7EYApI7DZCIk5beAm1lN%2BcC6uCzBvawO49z%2FNPSisz4OB3YYE5HKI9okV6An4FBWbrqDZG5KCYi4bfXUf%2Bb7oEtGfNf%2BtBZ5C%2Bx%2BC1x54mO6cLzjTzwjkoYSCmIiaBOmBxEihmvb3DSH9TbWFrwSGFpqzcTuwEdmGT59o97UKnV%2BHAwDWBsH67mpMEawtbAtUFHMvGLA7h9AKZe5jbzu6J19q6bFpW3eB3FpiRJZvVmjN6YrFOcEzjDa53w0v23Evlu4QQJvuTnA0eTTbIt2D8984m2uWql%2FhqsVBpRvX%2Bcwb0ls5aqNaS0jGI31FyY9y%2F7Y8O2Vxt%2FlOeTLpdOyNFkKU4Ah3jukz0t8svBNIgZ%2FTFgTqUj1krnTlrKvsekFjnubTXRDJusK4xI9zUaqoB4gxW7HWVDbXLmwVPIkyWT%2Fyq4abo1CHMNPVmMsGOqUBUddWwR8Br6JmdxzIKOaDOG2WHINFTRygw6xbtCYTKBRYV%2FoOph12obyFeliun9w2wdhBpqKsSmVsEea8LaiFilYeDCG56YR2ehEIS0cnUySN07uwpoCF%2ByooeKWcEfZXi4P924F9ar0b0wkLEj%2BHgV0dLP5Zj9K68YqxNDkeRNRMbOGT8K6fSl5ub91gsg%2BN5%2BfkGmFLfJ1YCIR29ErZhhEt7XmC&X-Amz-Signature=fe6e4194e9bb1546ee5fd2191bbc918ff81b18a13fe4c88a0a39ca9140a134da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663A3WDFHU%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T121911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDaS6NE3dfGBot8meU4UIUF5Ft0hqkr9b%2FFIOdN7YsYSQIhANIARDQ4hTnDFylCdX52rBCVDy4uc86nFCh4UeKSUWyTKv8DCAQQABoMNjM3NDIzMTgzODA1IgzLvDsTBiaR5xQnHFkq3APuBcll8w5S6KtIKAq7%2FQVZjmniN3tPOUdG35236nPgOH0sOiD2oKpoOn4hdU%2FoJNYyvKjz%2F5GI%2FDi3r2zFc8q%2BuGOX5uI85nvGmHFGxQHSTa1UzQgge65K4ZPWb12BJ0k2Mrz5YDow9B1HnTzkuC6TwGi1MTFELKh5MizoVOXt0u%2B1LhkSn1MPWnXEQl8aEfgpxZvbXjOmt1xP4x3ecezPhFZDKhP8RBZ6bCnJesHCQr2sGLNE3kLmQ2FHYSzhZxWI%2FZaGr3n3IcMiodLSHE%2B7KS43b5A%2FoaGWZxG%2F74cSlIHfkoZSbOIJp3dlw%2FRqCjyx9qveCwWay12ojk7ttZIuOWYiHzK4oqoc8uZSeONrxEDNK9eZe9JJ2pCuOcxSIwGDptVp1yr1IttEm3wPKQJaj6Oertiz%2FSnKdHmKpOpL3XAF8OLVZE58eCt%2Bp1KE0xhCbcXnLob8%2BSwC%2F7whQDSRBg6BCSXCq9GNAWP4E%2F%2BVpfhzQZ%2B4%2F9OHRLX%2B1soreSfNfaIowbB6b1MCv2mRYAPfpguydEtaS9VadQ1C1sX1dCY2xV%2F2LgbGGkJJWhP1qBwjFcb%2B3c1X%2FzNkpTPRO58zArudMxKdcfvozpHBH7oT7uvlu3Qnd5qRVbWblDCH1ZjLBjqkAbK5b1dX5Vn8cv5dp6tukh%2Bz5UlW88QhVHMeJGV3W2O8l8KF9kH%2FvZlQaxB89WgnnBc%2B%2Fiu78QEuRtmaIZguWJq90VbffrvM6xwNFPQRxerALvyDJs86QRK0GpDNnck7%2FR3zOmbTQ2iSHNo7s0JiyxBPcagTcEwEubSYBzr%2BYl6wnlLtWG2k4coqxf9IlpOJ60XNbnWoOwW83KCTTUch5rhBlYjF&X-Amz-Signature=0784ab6d2cf228a4caa38d7fc2323f0e2cce9382e58351f1309ca4e91c5adc44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

