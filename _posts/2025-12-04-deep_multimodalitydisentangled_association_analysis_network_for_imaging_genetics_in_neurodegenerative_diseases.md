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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676APHOZF%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQDaHrbov8AjbRT24n5UCf9naxjckj%2B3dNTJJdFb8bWRTAIgIG1n0YfI5IRUql77eqdASbkVlM3%2FU5ITgfXq62Cu8WIq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDNCY%2FD2SZN%2BHINjvLSrcA6GYQ1S0gk5knLhaBAHVRVURoDAHRC3%2FKxZSgeU%2FTTeVJGU1DYP9WZPSQ17tlC1xRZWRlXFyjf7OLp33udV4iTM26jSY69FwJPJQHuOt2U50bhgBN26g18VM9IfiDX%2FdozromWlkXJA9ZxbNz6Cnvs%2FjtvwA9GRwuK1kSUDdCn%2F4nU7CO9%2BA69iRUjXoyaz5pcojidgwYf%2BQRMN6uzqCeW%2FT1uIKxXhVSAEo%2BmYqeLummwhmH6f6fpSUsOZvQpPt5PPbRKX1zabymw4Q04EzYT1czV%2FxNtt3d%2BY7ok9CWQdXfdeUoD90GFnjucKcLd%2FAy2TUfulKKshwJxjD5s1A6fm5DY9Dqdj08kRWyuML22%2BFqa%2FCUw%2BDJXVmJeKxYRy7FbgraEEigHftgbr3HbvLiNLAd9BkO4wa%2FRyq4xp6CdD1Lh%2FT6q7XtcjvUcHrFIEbwXL%2BaomdzAdvQJBC3EXlq%2FT5cjiN4Fklc9EmymdhU7X8tT0ju7ZlGWEtj2rEQ68hxslMwuRcQOULnHdiqcptZDF68bw8CkrNr%2FG3hIcXUaDukDatpnIXd1REbeHeons7RkXqgA0o4GIuiLAlZjKJc8aAHBzu%2BVZqus5Tc8x2uWmWCF%2FKFolDoAZbxQaXMP2OwM0GOqUBZiaBjJWa0IxAu%2BJMV0fWakFVy7WtjlAuqco1yliNPGk5eO9BPur%2B6P15%2BDgwTLNvssXRpbkNg%2BmBDaT7H0DRBh8GPo%2F0ErjjanezvI%2BKDlbbFS1kxu29%2BNHXKc%2F%2BFKJ5O3KqHTJhclGa1jjD4fLG1T422VhS0xNtquL8MNZgU%2BDpFeDhqfpEKGy5PiRgJjdK8jbsLebPEHMzkzb9IaKFZQht3ORF&X-Amz-Signature=c92019036126a45b50960cbefe7cc93cb1db714de7078d8ed985a25eceb11f34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676APHOZF%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQDaHrbov8AjbRT24n5UCf9naxjckj%2B3dNTJJdFb8bWRTAIgIG1n0YfI5IRUql77eqdASbkVlM3%2FU5ITgfXq62Cu8WIq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDNCY%2FD2SZN%2BHINjvLSrcA6GYQ1S0gk5knLhaBAHVRVURoDAHRC3%2FKxZSgeU%2FTTeVJGU1DYP9WZPSQ17tlC1xRZWRlXFyjf7OLp33udV4iTM26jSY69FwJPJQHuOt2U50bhgBN26g18VM9IfiDX%2FdozromWlkXJA9ZxbNz6Cnvs%2FjtvwA9GRwuK1kSUDdCn%2F4nU7CO9%2BA69iRUjXoyaz5pcojidgwYf%2BQRMN6uzqCeW%2FT1uIKxXhVSAEo%2BmYqeLummwhmH6f6fpSUsOZvQpPt5PPbRKX1zabymw4Q04EzYT1czV%2FxNtt3d%2BY7ok9CWQdXfdeUoD90GFnjucKcLd%2FAy2TUfulKKshwJxjD5s1A6fm5DY9Dqdj08kRWyuML22%2BFqa%2FCUw%2BDJXVmJeKxYRy7FbgraEEigHftgbr3HbvLiNLAd9BkO4wa%2FRyq4xp6CdD1Lh%2FT6q7XtcjvUcHrFIEbwXL%2BaomdzAdvQJBC3EXlq%2FT5cjiN4Fklc9EmymdhU7X8tT0ju7ZlGWEtj2rEQ68hxslMwuRcQOULnHdiqcptZDF68bw8CkrNr%2FG3hIcXUaDukDatpnIXd1REbeHeons7RkXqgA0o4GIuiLAlZjKJc8aAHBzu%2BVZqus5Tc8x2uWmWCF%2FKFolDoAZbxQaXMP2OwM0GOqUBZiaBjJWa0IxAu%2BJMV0fWakFVy7WtjlAuqco1yliNPGk5eO9BPur%2B6P15%2BDgwTLNvssXRpbkNg%2BmBDaT7H0DRBh8GPo%2F0ErjjanezvI%2BKDlbbFS1kxu29%2BNHXKc%2F%2BFKJ5O3KqHTJhclGa1jjD4fLG1T422VhS0xNtquL8MNZgU%2BDpFeDhqfpEKGy5PiRgJjdK8jbsLebPEHMzkzb9IaKFZQht3ORF&X-Amz-Signature=c92019036126a45b50960cbefe7cc93cb1db714de7078d8ed985a25eceb11f34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662EOJ2D5P%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIFbTpnRN74ahNneQo%2F69oAmemU8WMVq0WJmm7YvHKXhCAiEAiXInu2FBUJjiL8Df6DeAWBqpdkVsnKAVX0EbYlWuiVoq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDNZ8uvhhJ2pV0q0EGircA4LTHF36B7RZMod9BMXr3hcuGi3ZWBXsHlwpmqAV9KuiIORxFMNPmcFE4RHQW5ioUw6pZk0SAT0g0th2tAU3qot5ZbInVIxbS4slFkSd5izLcuzfxNFx1kqa%2BRD87Xam%2BkYbXpqRMHAgM3q7zd%2FRRD%2Fi1ob2iDIvBVfMDU0ewANxyi0r0NQovKJ4wLndItbE%2BFQvw5VGTiwiPTAlYXR%2B%2F3pzkiMf91DLUhyTmgU%2B5cUygcYzPI8aW%2FWtJhG4sxWpzahrahzxFHhx4no46HGPEXj6E2yf0uAof8dMkKqbAx21MgVRmSX8cF5EBqUEt%2B4I6T8cW6lB5qqLWfaVbfLQKTKBC486R2%2FsLxVpEJUShn9Mp3w7ZAfM46w5nQ%2FIUlsUzAxc3GqA%2F1qQEotaXgCrkHC7pbWRhucDoyZxADgfqCbJsV3TZUzbxwCjx3tl38n0aDIUN4inn7B0Z3ICBK5TKa68XsLBW33UqT3aT8v56Tcr242v4eJM7sFNZoXa6tXaTu43%2FhBaGd1XkdgS7HuXaR5KmklwptnUEjsirCvlO2%2BTBAKZwQcLkFPwUDGEwh1Xi6V%2BpOwBxZuIDHxSeBQKHMh2w4aRpQZFUDFgoSPQ4fbn0MEGzM2LOpIJw75MMM%2BOwM0GOqUBB9GE9nYZwWMqBWoVzatm%2FpUYtwEeQjEZDLc6gmHoAvPS52coEsfgZAJlp6lZZ0sI6bNm1XoN0vjVj4WVmEDIH%2FKtEMPvDVcN6b0Lu2crC0SF6p9bfLGCqJvVdwJJXImaQqxq2Ox38aX7QdK2RoRCPIlCWW%2BU4czlDGP5gIwP7XUSRfA9J0gr%2F84fgL8IFWedI%2B0GhwMBLz8SUOv8Y5t%2BC2hi%2FFtv&X-Amz-Signature=6d7c49b3744efd79af1ae2217f6d6105588117c3546d9d886d6433bcd00f2818&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZ7HL7K2%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQDtXhQ07xb8BAHJd2lvOM%2FYzX3QgYnnjpEFBPhhw2T%2B3AIgJa1BR7XD8bzxtpL0L0Ah7Bd2koMXDd87%2Fefo64uR4TQq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDCQceiUnwhMyIYpiQSrcA8yltR%2Fw%2FHo0mNWOKUnNUFg8dzw%2FMUb3x6WJ1RkCFEbReBMj2wRfLaSWB29drX3dE5H%2BClR6sLCcuFfUkYTQikxs%2B25nVXAmffkontS9%2B2acnraJKrdzQoXNv%2FEDwd2iOj2h9V69WEU6n7jqglY%2F45YKpYzskIWD5Zw%2BDjPmFbZhtK7pBMkbKCFsiIun%2FeB8dudlQ3EukUVA4%2FezbKDt0n%2F1Y5uVdhGVn%2BE%2Be7%2F%2FSdWf9P%2BWVNrGOmelAI63tPGoA3xybuNJwEBRqj%2FToQtut8r%2F5%2BdMGzK6UAcCCGdyycXAcTh5qMj0gVs0T3P8NdUM26uumefDs0FW1gA3M%2FY5a%2B%2Bu4%2BPKiKXjl3BfSllLa15jb6ObsP6gW2ft5ABVpRpPFO1y40JkholmvbQ2q0oh6%2Fc930b7YgteBKc8j0fDudGQw%2Fp5lrvxId0t01%2FGWYxhzeHEH4Os8FAgYYs7D%2BSQvdcVW54CnYP9MD0IDReNym1a%2FGxA4Vz1CuGatJCR3%2B2VQaUQnv6YF%2BMEm03qkBViL4eDpA0ZLDLWNMRIoJWU4xx0eBHaW51mq6s5xw14rkvMYRIzQM%2BZ1zAZPNbLqIUs8VO2oNx0SUwPoUiLJ5lFDa%2Be7CNZion9hKjl%2F1ldMLiOwM0GOqUBkWXzGnQChgAv9%2BZhC6%2FK3r2SULRLeDfrve74DW4iLf6b2r5fixmnDmHf%2BmILfZAzlVHXATD%2FSryu%2BPZaGSzQhUPwq4a%2B2W6whsqz9v0xtUXm9zow2i1YM%2BSsl90G%2FOp42Oiz0OQ6RBXRt3h%2Bv9waou37ts8bvgYiBncQDB3jEVWoRvFy6RcXjQ5R1ZoLVmtKS4iEfRxnzpckj8CWlAIkBnvMTDza&X-Amz-Signature=33a1d038236d308e86c1e4f54b6aeee205519a8749b78d33634eefdabdb80465&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZ7HL7K2%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQDtXhQ07xb8BAHJd2lvOM%2FYzX3QgYnnjpEFBPhhw2T%2B3AIgJa1BR7XD8bzxtpL0L0Ah7Bd2koMXDd87%2Fefo64uR4TQq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDCQceiUnwhMyIYpiQSrcA8yltR%2Fw%2FHo0mNWOKUnNUFg8dzw%2FMUb3x6WJ1RkCFEbReBMj2wRfLaSWB29drX3dE5H%2BClR6sLCcuFfUkYTQikxs%2B25nVXAmffkontS9%2B2acnraJKrdzQoXNv%2FEDwd2iOj2h9V69WEU6n7jqglY%2F45YKpYzskIWD5Zw%2BDjPmFbZhtK7pBMkbKCFsiIun%2FeB8dudlQ3EukUVA4%2FezbKDt0n%2F1Y5uVdhGVn%2BE%2Be7%2F%2FSdWf9P%2BWVNrGOmelAI63tPGoA3xybuNJwEBRqj%2FToQtut8r%2F5%2BdMGzK6UAcCCGdyycXAcTh5qMj0gVs0T3P8NdUM26uumefDs0FW1gA3M%2FY5a%2B%2Bu4%2BPKiKXjl3BfSllLa15jb6ObsP6gW2ft5ABVpRpPFO1y40JkholmvbQ2q0oh6%2Fc930b7YgteBKc8j0fDudGQw%2Fp5lrvxId0t01%2FGWYxhzeHEH4Os8FAgYYs7D%2BSQvdcVW54CnYP9MD0IDReNym1a%2FGxA4Vz1CuGatJCR3%2B2VQaUQnv6YF%2BMEm03qkBViL4eDpA0ZLDLWNMRIoJWU4xx0eBHaW51mq6s5xw14rkvMYRIzQM%2BZ1zAZPNbLqIUs8VO2oNx0SUwPoUiLJ5lFDa%2Be7CNZion9hKjl%2F1ldMLiOwM0GOqUBkWXzGnQChgAv9%2BZhC6%2FK3r2SULRLeDfrve74DW4iLf6b2r5fixmnDmHf%2BmILfZAzlVHXATD%2FSryu%2BPZaGSzQhUPwq4a%2B2W6whsqz9v0xtUXm9zow2i1YM%2BSsl90G%2FOp42Oiz0OQ6RBXRt3h%2Bv9waou37ts8bvgYiBncQDB3jEVWoRvFy6RcXjQ5R1ZoLVmtKS4iEfRxnzpckj8CWlAIkBnvMTDza&X-Amz-Signature=66a1dab8b6397dfd76f9e5459a2720b09f4d13b183973c9f4266996bb07bd0bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPV75MEC%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIH6qrCgQSfdaBmt%2FxD%2FxEUlauGIRzENR4KYYJUIDhGYNAiEAoTei91VXXJHmXmxUWzA%2FzHJaKL%2FqIXBA05%2FEnHp0a1wq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDKMct5TRSxxuiqhGASrcAxR9wQocaQP%2F%2FjpMyLAMhgPgZyJt4wrcxhBu63XOlwqg9T0FyM3%2FN%2FKsI328SPcAgWc7FUl59qlc2%2BOULN5q9Py70NduLhcFl2v8KT%2BxlSXAn7%2BMEcO%2FiO0oJraBk9Ko4K7lc%2BvLbGmAcPP5grfvwOBpM7rmKGpAgoeQ0BeVXyZzwKAzDJhQ5V5okjbxb3CuNG20dZkJsMC93Cbrbr5PJTqtAZr8bUFXRw%2Fl0QmZ1SgGDd0%2FC1pK%2FibqIkdlEe%2FKHLADWeb9vzU7yxdq4Ob3xez0ivXhYGCO1acscS8GK7kPsJphqUdmtG3tXcMjxrfHUljjsoMHWZr3OUhBMXOJFbt8darLMHyJzv%2B7Hu4wZ7uVq0GKfMPH%2Ff%2FekkbzcXNMsE%2B3px%2BuS%2B2GSo%2FCbseIOnSz%2B7QIg77mE2%2FA64uXTNI%2BfzA%2Fqsrs1ieH173v0D1vWoh2YjUoYhQIPGv6RgdfRC8JSL4e8uFSPIf6HU1P4fBuHaQmkATIw43%2FKhaR4Z4%2BhPJ7ZtEhs%2FAQ2laWONgubKh6PbzL7g6FSMN1WPUhrRB6RpJawotP1ddg723ZJ2Di7OFDj%2FaqMxAsuJjDJ9xPWUFgxBY%2F7ziH1tkYIrK4BbL68Xjcwy7E3Wb%2FS3S%2FMISQwM0GOqUBUM8gpL%2FH7FdUKGA4Jb7vYiZN7g0uAkiJv5UgVWbGQW3rFEy3M9x9ZVNfivueI4SBOijvi6aUdxjcoEf8tE3Zch5VB9KlczFJmq6k6LlPEb8S5RT7O6DvnbLRjNB2OaBVhkgS6od%2BZe3yYcDmR%2FIswJmR6kn%2FvKPRQ%2BQm%2FfcKDk%2B4RSlw6TpJmFlHZsg%2BybB4uGK895ncfz8%2FZ1Y2lRDGIN1OWS0e&X-Amz-Signature=4f814b1100bd2b678a9f640bfcbe919d346d03c15fb9bd2d799eb3738376f320&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UO7JL6FC%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQDY4k8bAPFkfxrw55JrMxjxK5ZkiBwkd1ewUkgOFwolQgIhANOLcFNyeUPl5GgM%2BQTdu%2BIQgXfPrP4l%2FnMCsGfIi%2BqDKv8DCEUQABoMNjM3NDIzMTgzODA1Igx%2FHW%2F4MSzXeuVXwPEq3ANDFSQ0xV2pypipSPyzP0gF%2BQuAmhqi%2FKryHuPovLZ3%2FWwtbpyxYdwSKUo0zM0W5zu3YEt%2FGFKNxxPxzh8dTCFmfsF47Sc0ffzfHR7QCWCrtaR%2F%2FDwKCk1x%2FIkgPw0J%2B2c88jaW8XVYeIPe%2FspHRrs3pKZvTQ%2FFsbimeeS12rKimen2%2BdA7UKLkblYNk0SDwJKskC%2FbEzXXooeo8vN8uaev8k4SeaSeUmSYb9wKkQfSBcHY5jwK2k8%2F%2FS6m11upuXIQORA1qNR3dSzLtDi2umQ1aPawghvxZAnaqK838n%2FfnlDqGO0u0Y7dRoaQ%2Bwc0gIMjIXXPDPlYUCEOv3wS3Q9S2BO3hFjhypyXgfPfspyH13FEeNsi%2FsuPGzgefqM00dIMAcQKBdh%2BixsNy2m5IVisfsEOsrZawaJ8nC2JY3I17HLXZFKg5Xb4z7wmO%2Fs%2Bbgek3px3hj6eJVOdlgPJQ0ECvCOaurz3p24zL5rmVKq3aKAR99kRNAFAoaseJasny8%2FswYgiP98MVm%2BxYVNGqFqYm8GSdWB08lNGTPJS6XUix%2B16HJEvb%2Bc0sX%2FjkVr3wpSZj0W%2Fo2VLRsiwOFJTixFrhB7ORffOg0LSGx7LKKJ%2BIFp4flegJwXMdhjiBDDWjsDNBjqkATolbXHhdclmwFPiM53O0Nu6ZcIA%2BnMgn32ljklhtfexpCTX2kBsVnSMctg9rCN1nKym%2BBnp5MMutlW%2BPNvl7g%2FIb%2Bb8BlNYjqQLXRYBBUSvhHTcQzAWNMIYdjnDHEKbPi5v1XCHWOjx3tol2TWGy88lyjWZ9wLF8jOz6GyuiEWogxaa11QL0AcjpvUAYNYa8FqoIBzv7mxTM86JPhXXo%2BsQZpuH&X-Amz-Signature=8f656017a96533ea548caffcecc7b2615926b5874f6e9bff93971f5316b49e59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QY5BNQJ4%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIDa1VETix%2BAb3dKx%2BdBacYMFRAqmuHbPOMqJCwy7PHLrAiEAsQNx1ZzHwAKE%2BeTckNBRJvZp2bHvPtKCe4%2BlS9Hoscgq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDBSWsrnV%2Fk4Qbu4W8ircA6yhbZ2RaaTq5JidlcPtdXzaA1Mclj4wySiiIB1Gw2hWy9JS9zBP%2FMlBRq0Bk8QSrXWBGYzSjpHr369PFrXPYJzWxfJ2VLVpRtK0wY21DWzOjoGS6ldllq1WEmcHcRdoIWtzFPTOB4M5NdZCBUPjZyJTpZyJYDxjbf6ak62qcwxFPM8DzvC1VCwq31e5M6G0os1gtTHfa3vwmyFurDFZ9%2FilNBVgxEb4QAnyT%2Fi5DTmQ%2BsyaEA88lWhOmgh7DXqnzsGUnC0eY1ZUIm1GQEY5udxL%2F4gAnUHafst3t3%2B5LEYlIWSV%2BlyEVC4Jx6xxV1D0VNf%2BzwflXUO%2FzbYoxuB3XLKq3xwuyzeJ0FdLAaz15zxAtmL38FiBEkkQ0uz18Q6UIyovP6SPbLW2HKz2r%2BfxHvO%2FY5zLfweqYv11Iwux%2Ff5CFMlVdreka9pTy3%2FWrXvD88YcDT3UvZUqrnNYP0HOOMU5OPx%2FmN5yfCs2151AZyCj0c3AhGqjDHpYNN4xsHoaWd0fhZvOI%2BUUXzqXylZjzQSmKnAN1516fcf8S5siDFtoxl4Oo2FEsovF6O6GQV2C1yrlfpW7qt6uoz6YKi3WhB3aRdb90zrvmxcVIc2kz7ica6dMzmz2huibA8UrMIuOwM0GOqUBGoSeRD2y1FQTK1QQIczKv6jzRhM4ClpVAtSVbsB1F0VyjIi4LZECPcPKcCv6PphPLyZmTi5TQdgrPDphEtSMT8hk6u8GYCv90i7zh%2FWEJAv6BLMK6CgsNtzl5BBwjDXOvvxUFIp4%2FcSE7ExKUYl4bCC3qdj2Ju1r6wlb48bTwzdrn206zj4YDAzLpDilwqDR2lL%2B0noN%2BTVh8r2R2%2BJk2mrSTIBE&X-Amz-Signature=0e1c7a061053042cf4d3de57ba84f7cb96114b740749c45c213c9b93fb15a243&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5K6NIGX%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQDa6jdOcHp03ewFq0clKfnT2r%2F8Dsxp1bN%2F3naErPcr8gIhAMdqAe43X993g9k963uzVz4e6o6eLAwZK34sZdBM02KIKv8DCEUQABoMNjM3NDIzMTgzODA1IgxJGCHL1%2B0NcSTlQG4q3ANFkOLhGBKKug4XVk8P9TFiOscmecxsMkvwF214UGZbwvrPMSBqK5%2FQECXEEZpfJOgAQMFTkoqIkO11mKMeYsFUTj7XJo353e5kNwUsj66OcoS4aMaMm0F7SCvsgjivURX7t59LzYi4Rlsi9Gfi7n68GpwvSQH89un25mW8RQNdDTLSpvVkYiwNzHXqJxDgFeizcwPfwLiTP0ztIq6Q8u0I9hBBxqzmxG%2FlidA5LgRYabT4Pl0xHHSBUYKF%2BYAqYnBflKbadc509oubN9N70tECElIOTfbDA9SL61TJUVIjeR4KbgJmb3ND4pWAJ4VbNPhbz8O3SiJPEkzuV90A3Sa0y8XkTwA3dH6eXmAVqzyAx9XKIbXjQT3a3WoogsNv1c9PxRnj0Lz9wTAMtcgzf8Hyq%2FCUi2RvQO9dIEn%2Fni94r5%2FTEEGwJMWqPSE2PiqwqTHxLj7VlqcSkXBhfGV9yzrbIkZYw6W2qnyiRKRv9lx%2BBGMO%2BTqCCMLhUkRMfIQTFRBtalPA2S5Q95vi1gDrKGgOBEsNrnRCwEtV4zjNVn4lNujO%2BAzbiaF0VYBg32AaFLHt9mTjUjQNbuel%2Fhn%2B%2FlgS5XFJOC%2F4qCEajKjQ0ZLc%2BRHe8YtEfKqhIssjBTDKjsDNBjqkARlLyossrHGwJNkH7gEgCg7szqZ93bWNd7msdrV7K6IOKjWMRbgwXCIeaRxevKt86UkxzNA2%2Bxq9964ELCoDMQjPQKLOfzZsqXqGet%2Bdr0ulsYz5KEvVw3BhgyHfZmI%2FFQxB%2BUC6xBC90NOHF4cL%2BJviSGg9dmqbBymskmYuxJh2xqXIs8SqdiCLnycDA%2BZQ84gdn36gN476YS6OXueQmlBqhsPB&X-Amz-Signature=0912fde5823e5ecaf41d8d33d264a99a3f5361b16c461ad1a1cb356353bad947&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5K6NIGX%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQDa6jdOcHp03ewFq0clKfnT2r%2F8Dsxp1bN%2F3naErPcr8gIhAMdqAe43X993g9k963uzVz4e6o6eLAwZK34sZdBM02KIKv8DCEUQABoMNjM3NDIzMTgzODA1IgxJGCHL1%2B0NcSTlQG4q3ANFkOLhGBKKug4XVk8P9TFiOscmecxsMkvwF214UGZbwvrPMSBqK5%2FQECXEEZpfJOgAQMFTkoqIkO11mKMeYsFUTj7XJo353e5kNwUsj66OcoS4aMaMm0F7SCvsgjivURX7t59LzYi4Rlsi9Gfi7n68GpwvSQH89un25mW8RQNdDTLSpvVkYiwNzHXqJxDgFeizcwPfwLiTP0ztIq6Q8u0I9hBBxqzmxG%2FlidA5LgRYabT4Pl0xHHSBUYKF%2BYAqYnBflKbadc509oubN9N70tECElIOTfbDA9SL61TJUVIjeR4KbgJmb3ND4pWAJ4VbNPhbz8O3SiJPEkzuV90A3Sa0y8XkTwA3dH6eXmAVqzyAx9XKIbXjQT3a3WoogsNv1c9PxRnj0Lz9wTAMtcgzf8Hyq%2FCUi2RvQO9dIEn%2Fni94r5%2FTEEGwJMWqPSE2PiqwqTHxLj7VlqcSkXBhfGV9yzrbIkZYw6W2qnyiRKRv9lx%2BBGMO%2BTqCCMLhUkRMfIQTFRBtalPA2S5Q95vi1gDrKGgOBEsNrnRCwEtV4zjNVn4lNujO%2BAzbiaF0VYBg32AaFLHt9mTjUjQNbuel%2Fhn%2B%2FlgS5XFJOC%2F4qCEajKjQ0ZLc%2BRHe8YtEfKqhIssjBTDKjsDNBjqkARlLyossrHGwJNkH7gEgCg7szqZ93bWNd7msdrV7K6IOKjWMRbgwXCIeaRxevKt86UkxzNA2%2Bxq9964ELCoDMQjPQKLOfzZsqXqGet%2Bdr0ulsYz5KEvVw3BhgyHfZmI%2FFQxB%2BUC6xBC90NOHF4cL%2BJviSGg9dmqbBymskmYuxJh2xqXIs8SqdiCLnycDA%2BZQ84gdn36gN476YS6OXueQmlBqhsPB&X-Amz-Signature=12e70a9de7c3ebe0ed1fdd5192148b68478440127ae0c2b542ad6501658a1814&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHSOOS4B%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQCBqxKVkG2swq5TddtQzBM4QJUDY4XwBkIhfzKEj1ajDQIgLFGefBu%2FG2u3bbiV0b9iuNjKaaoFFJnmgYQY55C04N4q%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDABZLRqqKNMIQLA%2BkCrcA%2BLSOR6vrFbnm2FG%2BzQwJjchOaq3jWmS72BlJV5I1UIabl5nMUdgw8njqaB8K6OgW%2BJ6a3jZ76FE8g6yWarBmdkopNhKjo4Dk5raNIox%2BKIZFIVwH%2BFMyV4xLs7B%2FgMHRm1HJhP7ITs4RIcHP4GTH6a4Dei97qiu4Gia1TZjxGB0iPcgWXjKzIkTNmnPV80efkkuNJn%2FXQn1T28%2FVldjFVOi0NwbOgd0%2BcMQeTjbtZzrL%2FXRkxSzNzrTPzczmjrvHkc1pc4ChNo6Qc1GMZ3R49R4HQ7bTrCDTlrVvQqHSCcCbtetWQax29eXiCaCIvkFwWGLg%2Fn5PtVA0BxasGUYMoHUjbJhm3QLM1ll1BvT0ElBcKcmDJiQEyfrrm0fILL4vbO7SKjSyFNnODpi0t1ZFYSlLy3jqxFnTl5cI4fns3YpEM9E70yuJDJKb6NWUjEa%2BuyM6T1VbgHCEhaOfuCvM7%2FHBsYLIoAChU%2F3PFU62aE3BP8OgyvKME8FZdjkg%2BINuGQfWjRKlyxxt5y%2FaI2kSmr6vZ9EdM0sA7dBEitU0WtBXGkKQ%2B9bL34bl%2BaLGgoFdW2Wc0CdNt1se64mTvQOzYngDtARawfLaUfoKFNvFxPHaVbsfsvaN119qEhAMPqPwM0GOqUBz%2BczZrdN8OR89S0R49xO28pGTzuASomMLOYH3eiLSmsjGkoWTBgUSYHfr24NtVMiyQAPAJr4SN58O4FMOzW%2F1F8BGpOtvkiB8v6ZQj%2FoZ7ec3XCfKGV2Uol7nlYcAFi1muHWn4Ui1HR6isONPVOLfHNLyC%2FASvO9NFg8dYN2kjkMeCO4QSRCrz6HGtq8yCsdhzkeixDDXEdgbiyCdCdY4wSD%2Fzm9&X-Amz-Signature=4efbb4dd3f5081506832286935a2a9dc9a183259ab7b599df31f077f9a83d1d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XY3KWDX%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQCFjFEeUpULQe%2FePcCwtoYRhYpuypCqOVWcnC3PK%2FmCeAIgNpgkr%2BdmJ2AO87dJpDF4ZVnAvUII9bESeCANFPKmS8Uq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDFZzA3ULTaMqJKVZLyrcA%2BB3hKKk98e7j0CT8DUaJ08vrwCQwVUK9n5PUqtpoZHJvdjXkufQiThToGaAsVjxozgMzDms4%2FV90h8Y2tg2raORc49wAnyAN078HhkcJxJJJOy7N5nL%2BQhDNoGEkKkUAxSwdUs4pslXvKrtpQivr9Me3qJe%2BgRAH8gttV8afFGQllKdBBKj9mFml2Yx6jLWxPOOyve5FLV9W29aBKshLqmwROBhH%2F84wDdXqlDEZD3DVmEzyk2JTSMAyZekZUHR5fAkehAcmjdxpyBXipUd2011HTPeiZHxQQqUBFTFLh78V7zQPIVjJz%2BkSmgPs1fwgFFoATN4EcVi0FpOsOvcBEFcOf2Y2B7QzxuTaYdRreLaX9f5lZr9PxcURsybdAPIwAKRhCF6%2BRpyOSe%2FRQDiJq17ali5F4e64BH%2BN8bjjEf%2FnvFN5KFMiSD2jKEKU52k6WV%2FAhJwVRpIQ1AD9AAtlYKBqG5XAeV8xUu3rhDb0Ttm9oMTk8Z42L0ORM7ybXvw2vNUbMbpsO5Xq0nNpuDvuxfBwMDnSUqElhTiE9k0F%2FqbQvl1fSbXr1MFt5BFxFJtp%2Bgelk13tqNIKtDFLmIiin6KhxMsfJXbpdSgAgsVjUcyIBW9p3U6NybbIC%2BsMNaOwM0GOqUBdFR7Dpxn3X4MwnxjE2P%2Fl9hTEyCyIYHvTi9QaLx05m6ZJjia4AfEwoxjyfTj2uJaFCcafL3xgRFEksTcEd3UA2OC5Os3m3hJpyDECa5PcFPtgNpZhKXi0woKD59ezLZnQ8A1FEJ0BjtUParTrKHElrL%2Bxfbj5HrQRusxbgNKbJt51gtnLRTuuXb8cfkw%2FASZIIruyBL4ORIOVm43WCoE56N%2FVqaQ&X-Amz-Signature=61f6d4b6c2fae7c36ab4e7379a2020bc67c7536dc710f68a9d6e62efa78af4dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XY3KWDX%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJHMEUCIQCFjFEeUpULQe%2FePcCwtoYRhYpuypCqOVWcnC3PK%2FmCeAIgNpgkr%2BdmJ2AO87dJpDF4ZVnAvUII9bESeCANFPKmS8Uq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDFZzA3ULTaMqJKVZLyrcA%2BB3hKKk98e7j0CT8DUaJ08vrwCQwVUK9n5PUqtpoZHJvdjXkufQiThToGaAsVjxozgMzDms4%2FV90h8Y2tg2raORc49wAnyAN078HhkcJxJJJOy7N5nL%2BQhDNoGEkKkUAxSwdUs4pslXvKrtpQivr9Me3qJe%2BgRAH8gttV8afFGQllKdBBKj9mFml2Yx6jLWxPOOyve5FLV9W29aBKshLqmwROBhH%2F84wDdXqlDEZD3DVmEzyk2JTSMAyZekZUHR5fAkehAcmjdxpyBXipUd2011HTPeiZHxQQqUBFTFLh78V7zQPIVjJz%2BkSmgPs1fwgFFoATN4EcVi0FpOsOvcBEFcOf2Y2B7QzxuTaYdRreLaX9f5lZr9PxcURsybdAPIwAKRhCF6%2BRpyOSe%2FRQDiJq17ali5F4e64BH%2BN8bjjEf%2FnvFN5KFMiSD2jKEKU52k6WV%2FAhJwVRpIQ1AD9AAtlYKBqG5XAeV8xUu3rhDb0Ttm9oMTk8Z42L0ORM7ybXvw2vNUbMbpsO5Xq0nNpuDvuxfBwMDnSUqElhTiE9k0F%2FqbQvl1fSbXr1MFt5BFxFJtp%2Bgelk13tqNIKtDFLmIiin6KhxMsfJXbpdSgAgsVjUcyIBW9p3U6NybbIC%2BsMNaOwM0GOqUBdFR7Dpxn3X4MwnxjE2P%2Fl9hTEyCyIYHvTi9QaLx05m6ZJjia4AfEwoxjyfTj2uJaFCcafL3xgRFEksTcEd3UA2OC5Os3m3hJpyDECa5PcFPtgNpZhKXi0woKD59ezLZnQ8A1FEJ0BjtUParTrKHElrL%2Bxfbj5HrQRusxbgNKbJt51gtnLRTuuXb8cfkw%2FASZIIruyBL4ORIOVm43WCoE56N%2FVqaQ&X-Amz-Signature=61f6d4b6c2fae7c36ab4e7379a2020bc67c7536dc710f68a9d6e62efa78af4dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STV62TFM%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T122923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHwaCXVzLXdlc3QtMiJIMEYCIQDITCmcrzCmNfdaWhlTChJOCjZLatC2BKJ%2Bu9xADC6WgAIhAN26Jolra9K7XfLsr%2BxM7%2BRLjFBaqaVviUOk5uATzvpOKv8DCEUQABoMNjM3NDIzMTgzODA1IgzLjM7uUAhnnbqwJusq3APouY4PEbHEMircQ0Q%2BewEsE0kCXA8N8fXt3lTQEpB%2FrMWyC7yGpGOmnxMJIwQzVo8HHniE2C0%2F48W8foZ0T%2Fl%2BPQQuWbaRMDmY%2ByvL%2BTlbrF1vUjfJbBsPWSQ28Q0k5lXyrSlXsz1%2F7v3drSvZl4o%2FQ5yvCuwvKBbWt8xUzYAQfVIx6pJOjjQ%2B5m30b935iUrfBCt6gMxTlQiTtRkRvBihqQ8CKOMx42wdlhWBbky0xCf%2FSBdk5shkRQrk6dbqxsfqk3CdzCa97ghhDO2auVyY5J5YkvXOVXSIqnY2U%2BwAq19fdk7M7Pg8JtKemoypxBWMVf331Gq6nKRMHZUKwFczkgaKejmZPVvQH6qfAooTWsZhMYuvi5niu8r8AJ7Xf3%2FtAqiCpaO%2FgUIqr0nW8rCh2ngpzDcMTC9iKbtkUjKLpSgs7f16OvAVJOENY7MuhWp4U4xuqIvqSkM7Jw3dY5pYMTc1Dxp6bBOn%2F8YSTibCeJs3RN%2B7fAV610sodODbhEX5qARiLh69aj07UbPC%2FIRZz1VgJtSffNo%2B0Iqrw9Vl1C3mSefhJm%2BpzAysdFTt%2FctMNnQESahZc2ebNRYN2cRg3tym6eegNOCB206fVaYPwDsrJBWJfrJw2RzPajCEkMDNBjqkAaE%2FIQ7fzna5fLXvHkG4z2dCoUAHdvt%2F2aBxsA7RFOpqWUUXZ4CZ9BFjrat16Igf2MqatndcxinQr89nlm%2BPNOlJo9uM3W%2FjnWNiP%2FmR3Q4YKrEjCzGsgZh1waNuY99nj7lWNWHcmjlmxToFPoQiJtuyzucgmh2gL7Jjdf0L9IYpflvnIkWj%2B7lgJ5DV8MeT1EppC5GSDmSa1EMUAmLD1vekxiPC&X-Amz-Signature=b803ee140371166b44e490c9e230bc44a642620eaaf482b104b4c75819295751&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

