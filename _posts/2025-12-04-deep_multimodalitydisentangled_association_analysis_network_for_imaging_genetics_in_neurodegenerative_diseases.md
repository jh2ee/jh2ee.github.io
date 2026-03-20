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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IQISSH4%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQCcnv%2FSlNPbriOpK5izdiiCI%2FCHHI9CK5KH8Xug0%2F47RAIgMpOY0gzMLNDGcU%2Bj4f25roid3ZyCL5wDG5LJEYAFFYgq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDFNMbybxcDHkFrkOzCrcAxLXe%2Btr%2Bf4UVSNB2XS%2FTdJ7gc5YkHv%2Bp5Xuu%2FmrOguQ9zE2015XaQrfmhA5%2BTMl2H1tbOLQf3u6ET%2Bf3UcOjKk29vNgtl2aTEFRKQ8%2BcbWOm1GMXZ7PVfYzr1dZ9nslLtbdxts4O1x8HscsCzxqZk%2FEua4zHAKjZI85LQYpzvMu%2BFOZSSsecvwnAePHbKDKNamwjRxNNmWybQVrmxDGsx7SfqxqgVzgetweupbdX1djjNxHDbThNAVazAKnxQRDBMX6Bt8s3Rjrslem1dXVKxog2uT8U5gukg1vX8rgLtYDkKpezTNiU77YE952akf6jp3fjrGdIweUVPAp97hVV5C3ydg0Y3sUQTfnknd3JW226UJsRjJHzQGK9MCrzyKpqc1ChMNzgCDDEY0T2%2FosiiDO1BQbgSbpTCtCS1kBZ7idUV9u6lSJ5qxrahPLfspnIkHmSDCSJtbXWn6dRuS9RcqZzts1p5IErCLmfwCMqy6puMOGkKB349K%2FcfUapfIZ1Y3XXlFKCvoHPZivw5R5eHiubugInO7GneDsSVWNtPLoivpmCuD6vaW%2FgjE5Bvw060ey2%2BtHgukI%2FUCMABeP31S%2FXDvYl1M0H99mFnFiAf9oXjippHtMNt5klV7dMMzi880GOqUBGk%2Fis56PF2tCHc4xQrRe%2BG6DC2XLBekaQVDWAMe4wMvwATfp8fVwSIj0LEocePvS9Is8MOeMYm7I564QG%2BtUt3O%2BA%2F%2BL1kxQ7HpfKXeODssgvSe8NM1A4oCoVZMkl%2BqO4W8p8cGyMub624LGeE71gW2LZbz3breLuZyTEjvyzCBDvYtMOZRhaR0diDskqJhuIh630HtrKNG8fWmO5KdMurtpal%2BY&X-Amz-Signature=e9b01e48d0907d6bc86696a8ed865cfba578b7ca47db03137fa98b7bf347de98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IQISSH4%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQCcnv%2FSlNPbriOpK5izdiiCI%2FCHHI9CK5KH8Xug0%2F47RAIgMpOY0gzMLNDGcU%2Bj4f25roid3ZyCL5wDG5LJEYAFFYgq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDFNMbybxcDHkFrkOzCrcAxLXe%2Btr%2Bf4UVSNB2XS%2FTdJ7gc5YkHv%2Bp5Xuu%2FmrOguQ9zE2015XaQrfmhA5%2BTMl2H1tbOLQf3u6ET%2Bf3UcOjKk29vNgtl2aTEFRKQ8%2BcbWOm1GMXZ7PVfYzr1dZ9nslLtbdxts4O1x8HscsCzxqZk%2FEua4zHAKjZI85LQYpzvMu%2BFOZSSsecvwnAePHbKDKNamwjRxNNmWybQVrmxDGsx7SfqxqgVzgetweupbdX1djjNxHDbThNAVazAKnxQRDBMX6Bt8s3Rjrslem1dXVKxog2uT8U5gukg1vX8rgLtYDkKpezTNiU77YE952akf6jp3fjrGdIweUVPAp97hVV5C3ydg0Y3sUQTfnknd3JW226UJsRjJHzQGK9MCrzyKpqc1ChMNzgCDDEY0T2%2FosiiDO1BQbgSbpTCtCS1kBZ7idUV9u6lSJ5qxrahPLfspnIkHmSDCSJtbXWn6dRuS9RcqZzts1p5IErCLmfwCMqy6puMOGkKB349K%2FcfUapfIZ1Y3XXlFKCvoHPZivw5R5eHiubugInO7GneDsSVWNtPLoivpmCuD6vaW%2FgjE5Bvw060ey2%2BtHgukI%2FUCMABeP31S%2FXDvYl1M0H99mFnFiAf9oXjippHtMNt5klV7dMMzi880GOqUBGk%2Fis56PF2tCHc4xQrRe%2BG6DC2XLBekaQVDWAMe4wMvwATfp8fVwSIj0LEocePvS9Is8MOeMYm7I564QG%2BtUt3O%2BA%2F%2BL1kxQ7HpfKXeODssgvSe8NM1A4oCoVZMkl%2BqO4W8p8cGyMub624LGeE71gW2LZbz3breLuZyTEjvyzCBDvYtMOZRhaR0diDskqJhuIh630HtrKNG8fWmO5KdMurtpal%2BY&X-Amz-Signature=e9b01e48d0907d6bc86696a8ed865cfba578b7ca47db03137fa98b7bf347de98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJGVG6ZU%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQC4zPBp1Fkoh5l8Rn7yjSkClafwZAvhmM%2FJE%2FH7Sa6gQwIhAOn5BJSgnCeqTYZ9j8iJ0lBP%2F9cJ4wntQ%2Bk%2Fh2zET3XiKv8DCDAQABoMNjM3NDIzMTgzODA1IgxzDYcrjoCTAY9y1fwq3ANZhaPYxmHtfqmJpqhwT%2FqUy0hTD0zm1eZqJuv9HHOfrdwuerJA6QMTi9eYylXzIoIOTHjYUm9L8JII0cC%2BxBc%2BbHGy3iHInyy%2BkzyjByOaPLQHOew5A1CzeV5D3fIWMyDxNWitXjwF0BBPGd0MOA30Mbb%2BQ%2FkZs9zlRAjf2R%2BPdPbzk1ojXki0RryWFoFueVQlyumULFLs7jwEweJrbYRQDgr15cJ7U0vJHMmM96OnJ2pOB1pIt3vM7uYaRZtFsZOezrHW7Fx%2BfPVwv%2BCb8ZMjVPwhSTx5L6s%2FaOhnKH9mul7L8DUvRAOs1XsnwKgTJGP3jANTRJBSFMmmygStlIgEBwqsWbJ25gIZPvmVbh%2FVHmNRfm5WXcjLuGCr29PygmPrPN5MAT9gwYfe7ccbCK6cU1lPbJvc6MtUfSNT8BD7%2BRyTnixKKhgtadss0Y%2FBuXIUf6BgkO6v2aZCeFubIxxArXUwsDb5zbNulasWzQq0MWZm0poWyX7aI32zez3oyQYDaT1uSApYJQtoESjFsgJBSSqheJIeFngIZTdwUhfyWKai7saQ1COk%2FFmNwdzF%2Fm9JM%2FsWHsdKE3%2BgKpasfA8pOq5W4gNI%2BMlsQeHPfHwEOHaCcLyfLZ84VgS49zDT4vPNBjqkAWbypjSGyFS5janHWSZ8vUTYHcqfzO9viDocAnxkgk101eQFrZLu64yE9ggDlnXtSeiJ6W0qWYQjbkmvbUIvL%2FWOqoDBDukhp%2FUPNeBYxoBBDyKgCp5fFYQVCTyJjKr93tUvH3azCbgXkfXToVZycQiMPdG79Ff52HgeAhRgFuNRPnHSb18Fq2lg2%2BSs9adljsfUzWQJvc5uA476hnBM57zE9NdV&X-Amz-Signature=c05fac29ad4d7df4d9b68bffbd8c3dd4fe715d758e6cc151c9d49c58c93206c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2WHAVLV%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDCYEZTJrYJLBk8UCmE%2BSNb25p8FLAZgOp%2B%2BIMGcS%2FBQwIhAI%2B7e%2F6sHcxWcJPD%2Bal24I6A2TbpC2x6oSa6iPFIPIlMKv8DCDAQABoMNjM3NDIzMTgzODA1IgzU1ToyPK%2F0PHeK5CYq3AMhOscOQ%2FJe3uJLEOuQQO4p7p%2BR8syJgnQOUReg6Kpoph8j%2BOrCAucfX6zq36zX%2BXRbbUt4cEkTdnsWATQ%2B%2FSQOFW3YTUVdmWS5Cntp98PCZP5eCBt9HTdN0CCLXQOvMuilqyB91lA%2B62zckMj3P%2BDx15aVj5LmPTCPT3F7T9xGQjb3iaMtfMYt6671yK6gyAvF2NIxpbNDooV2dGzY7tIiVAkwJDpAQbrNtJ144OQ8T%2BRiS%2B%2BV%2BcXYnrOyzdII4udaUtTMtc5he1guW9G%2BxFDTNPbQVk%2F8UdislEXJ6YC42fxgf6jSfL9WBg1TbZUmF6YFGMv%2BFKA71c6yw%2BEHnrU8bJZ8NFe5JrLjYtV6ckX%2B15WVEzEpvEDkWZ4DoHhkw%2BrWZJ2TODoRtiiWUONAIn%2FmFeaZnq3q1WXbKewRfjymt89YmZw83vPgP6hiO91yUyNn5M4pewG3rZxCHLWxbCNQ%2B1iomL6bF4SdBa2PQB55a7GDr96L2EY%2FxpDks7srgd8RvA9qswvbI%2BlzY0X1e0ArbOhQn2S2u5xndVEEsNE%2FZzLN37deqpxSQCyytSh6Sd8x0vrWMi1KC4iR1q9sM3O21D5JijJEVxQOQ5oiPHanWCev1Qs%2FFzW237IVbjDP4%2FPNBjqkAQXd%2BS%2BTKOriYjLhz%2F9hJMHgv%2Fn%2FGsQNFzkGSs15Mw837Iehp60W4XEJR%2FYoCmWI%2FKhzRgIvSeuEDcbR2r2dL5YcLZZtihuzYYfZxhUcX9PA7GwI%2BSxEAuZjpwCttpje1QO1v9CGiIcQ1p17bBOoFTIPAhgC7cuE6HkfGPE3cGEWU1935nScqOILScgi82F6G85imJ47vAhAcR51KwbDsc%2BsZmNm&X-Amz-Signature=8fc5ca44abe0a179ea56f9fc2dc572b51acd2070193a9c31cafaed1da3fd0cd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2WHAVLV%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDCYEZTJrYJLBk8UCmE%2BSNb25p8FLAZgOp%2B%2BIMGcS%2FBQwIhAI%2B7e%2F6sHcxWcJPD%2Bal24I6A2TbpC2x6oSa6iPFIPIlMKv8DCDAQABoMNjM3NDIzMTgzODA1IgzU1ToyPK%2F0PHeK5CYq3AMhOscOQ%2FJe3uJLEOuQQO4p7p%2BR8syJgnQOUReg6Kpoph8j%2BOrCAucfX6zq36zX%2BXRbbUt4cEkTdnsWATQ%2B%2FSQOFW3YTUVdmWS5Cntp98PCZP5eCBt9HTdN0CCLXQOvMuilqyB91lA%2B62zckMj3P%2BDx15aVj5LmPTCPT3F7T9xGQjb3iaMtfMYt6671yK6gyAvF2NIxpbNDooV2dGzY7tIiVAkwJDpAQbrNtJ144OQ8T%2BRiS%2B%2BV%2BcXYnrOyzdII4udaUtTMtc5he1guW9G%2BxFDTNPbQVk%2F8UdislEXJ6YC42fxgf6jSfL9WBg1TbZUmF6YFGMv%2BFKA71c6yw%2BEHnrU8bJZ8NFe5JrLjYtV6ckX%2B15WVEzEpvEDkWZ4DoHhkw%2BrWZJ2TODoRtiiWUONAIn%2FmFeaZnq3q1WXbKewRfjymt89YmZw83vPgP6hiO91yUyNn5M4pewG3rZxCHLWxbCNQ%2B1iomL6bF4SdBa2PQB55a7GDr96L2EY%2FxpDks7srgd8RvA9qswvbI%2BlzY0X1e0ArbOhQn2S2u5xndVEEsNE%2FZzLN37deqpxSQCyytSh6Sd8x0vrWMi1KC4iR1q9sM3O21D5JijJEVxQOQ5oiPHanWCev1Qs%2FFzW237IVbjDP4%2FPNBjqkAQXd%2BS%2BTKOriYjLhz%2F9hJMHgv%2Fn%2FGsQNFzkGSs15Mw837Iehp60W4XEJR%2FYoCmWI%2FKhzRgIvSeuEDcbR2r2dL5YcLZZtihuzYYfZxhUcX9PA7GwI%2BSxEAuZjpwCttpje1QO1v9CGiIcQ1p17bBOoFTIPAhgC7cuE6HkfGPE3cGEWU1935nScqOILScgi82F6G85imJ47vAhAcR51KwbDsc%2BsZmNm&X-Amz-Signature=84439dc9527872dae1705d52ecaa322395fd9cfa9c3f504bb5941ffe414438ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZREPVOTA%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQCk%2FvcHF6IVvuRJiQbLrs38EE0qUHk335mCd1ZGPwy7ogIgM0QTfK7DunRnHVCDeOHu%2BTTQzHMRegFt60euBibAuQkq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDES3LKPHW8IXuV%2B04yrcAwM0SVhIwKGPlCC%2FzK0dGBcWzB6t4Lz1mj3jXe7mBrbxz1gLQOiXgMK90nW%2B5c5tePVsWUx6s7WGrJMrhKQ%2FVpWVMdstGwkJ95ErP5ZYhUWib%2FJyPvXaH2iuWJYJlRAIpnimq7vRH5hFHijBbOUgPYc%2B4pLZ2I1tki7jeig%2FVeQSbdgWmVI%2F2BWIBHkerg%2BgE3VlvSmu1RNjtgmtezDA1TMV9WSdLJFdpLre2T4Kc6Wds9fCQCQDCiSIkM%2Fgmr%2FnMUMK%2FuhwI5Ctuful5zGEiSnqlckoJ%2B9iX6I6WXW7YyyU98Ai50npNo0Tfmb3ylQUAHLjpACp5Oox0uKbgC26TsfWcIhTec9o%2BXfcmsWCmLQOi3xPwl90CeJhw4ib37b6hJMKBVeKYeMQSm0wkfUjBZ78A9ONwOzgA77WzzN%2BgdsI9W9rYQY6keuVXIWIeN3FVzniU2bG4uwW%2FQPKkxyzIOp55uT%2B8GO%2Bkr8WakNab4ZV3aPKXKs2kEjrx0SNIA52uyt9kmCrWe4px8VjZjSTz7T7g5DzPCU%2FdJdkSWdPLufHll29RTJA7GAkrVFzC64ujIHuXNBBj5CQ7B7bAA9UXiXDoTUjrtSw9xdrBZG96QBoHTh1AWY9SkNUGEWmML7j880GOqUB84PD2sdA5terZfKSjfW%2BL5s%2BJsYoJ4goSe7E0nFmX3Zv2bvn8KK03Qf%2FblQYRTSkUizulA7GoPOH0SRCkIXOPPuvxDnqt5YoU%2FdGRaaXkVRcnUOCmViZ134MZtpxHltcslOFMsHwi1CLQ7P9SXHcZbGdhJ4qjFwZ6IW%2FM%2B7ul5GS7jTgKpV7iwMAgYTp%2FIC5FFR6%2Bo58V4boXTaNu55H14XHyeNs&X-Amz-Signature=d8ee36e90a2b436cc16f91eec2e2e88abb858baea14fc00b168c6827965139ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MZA6LZX%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQD1xwuXBDkmkhvPiMKwtRZe9fIStMReN4X0gAMmt90BKgIgDggs3XpLPZTtNV%2F7QfxnzZe7O1iXbgw3dQRrehks1qwq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDFYFlvsycQ9u99ou2CrcA018EC1mQ9a4xfGi89dRQJblhTyg9HyQ%2F8wixOKbHso%2BCnFrfLeeH0ee4AnaG4nMYCmaseLt2s2q3R093iOpvXlxJ7OrZqq07uRmAZrDDtPz1hGkYpYESZi7QEU4wCxhtL%2BJ03sN03yMQUaSmUSyZY5GiU0S7igrPNHo9XAVJn70bCxQMTPbt5EMeYOe%2F7%2B3IpJ3Q9E%2Br54P6sWxq9aiJb0nYaSLEPiMDgXFOw6flWdb6%2F7KOOG5nffGA3GDNr2crxGac9McUUHjdQiGKYaGrUbNTpgpFoPPat5NqaeAflE7mYH1HSqCayzrEQo7vd2LZUXJ9NzmQOxrsmNQjA1t6GacGmRxx85xLDW%2FbuuB7oqkzMDAtz%2Bp5aHdvA%2FEH9jpUN32l6QvFB1Wpqn3xUXcgtfFQfLzjrA2IOupVDhr406cuvxhKcnYXi5RIQiOpuNBJ%2FJ2KSsBN%2Btzg83z6kvURNGVRugbdJwk5htwM%2BgJx0OEI9HPxcQiemeTjunQiKc2yhzDWHUNMa%2BybXsd8gy2ii7mIkiwkekAW6lGX%2Fats6ET2lt0zL92CGPqGj4PIvAT7T8mhVxVV16hU03cPZsvMlvM63tuaRLKh6jjZfWXEv9ixUGS%2F7si4E44iCwaMOHi880GOqUBQfjmAtVDaRNUiGGp5bJmAm5xGZZq78yl7FaCmjxCmfuc7q%2Fgq3ocrI9obl0Smszc%2F54WywQxOOEzzMaS5B4SKIblhfAGuxX6uypzWdId6JHioq8YUL0GfNMqwYR8tMlhW5962mbD2uU9UdmTGsbO%2B8AK%2FcEWHRF57%2Fto5wM9AMz8bhI11nxsfIedQnE4lMTGNxWtp4wgsBLX0oELkRawLh2tGgak&X-Amz-Signature=1bb6d2c682564d942e15e32a3902c1dfbaf255bb9fbf770e054b49bad2e754f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SV6HQBM%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIQCiUrNr7G4lzbJCSxtqwi1AqxTFKSh0qVbo0WqqGKumqQIgZRsMCqsz1D%2BVTByFabHnzCjqeN1mDbC0un8sPQvftXsq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDLLNuK60ZFnkMOpxVyrcA%2F%2BT0BVfgL79O7RkRh05nrdBGj3GDOZzKNGAKt2p9reQGaBySNv8Jx8tQVVN87xpUFTKP%2FHy6CBZii%2BWcizHsVQFrxB4oH0nIsufGooDe4SY62XoA7O0SezJ8L2JGpmPjvd6xml1qq%2FcYwaAYuJPmlOOZVnoiIO%2FV1BW3yd77Tmn6uvVmYIZjNMXW%2BTvEV9E0aWL%2FMwEpRj7nvjjyL5IputDHTplYBJ0ldwVdZDYkP4HTVCEVI3cm%2FM95F0aHqaaSP1IrsQvAtvu6ZmOtEdHXDzHPEryYjUzv4Iv3qo4qKHb4z1MdLdY5G5MtF1Itgz497zZ2OpaDny%2FHpliCWW0iHMk94EevKrq51EqfqC1knR7GM9gbcX%2Bxx7t9mxOv6pj3snc7f2jaADC5aOJUabZHM%2F1jC96kIIF2Bc9vbtpONi5GA%2BxaHv3PFNr4fERsSeO4fO9kMK2PYbQUhV6kN30Jlutwf1Xe5hOGIgLuYokGzIRNNb%2BTXN9tZJc68JwoXewHqmSx98bNXr6ldM9wBj8JEsq115rKGGGcxSbeYQvo6UENZ0dsohPLW50jfCuE8Hk1b2l3C35jtlwUx1FBy0FjmMOZRCvHUxr23qOefcw9%2F8ijYF24A%2FrUsoBUJJTMPzj880GOqUB7Y4OjP%2Fd6coQ%2BvsJwi6y7QRa0p5Q03VukA6XWsWF%2BogMsFe9s6YlVAt%2BZRVPKZuVEsrZKnvXyX7U11tP4ORPoLaxC%2F8gA4oMsnwVU9brTcI1b%2B8v%2FIyiNaF2Q3zI8Sdr4X1me0aqsWlZuMaX5F900gXl0XsJcKGEl84U6dVY64vQLcA59F0%2BFPNeLibRZy7DgBAO6R%2F92Y6wHfrBrLdD559jBa7o&X-Amz-Signature=7bc1a275cfcfd50b28d3413ecd2033b02eb41f45114e8e8762d4b147a4aa13d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDYREFHE%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDo2h%2FPpaPvSiXPmYQVThCant9EhBchdqAJcD2aK6SkBwIhANAZQgv%2FbaBKrXOJfxhj2zGj2zMJ1fVcrWAIp%2FAHMfSvKv8DCDAQABoMNjM3NDIzMTgzODA1IgwAHl9z7AJ8hWuoZDsq3AOOGZwGE%2BhyhEt%2F7PEysAfgND5F%2BgvtneX8uAGKSxq1%2BmYK44DLqaYcuX9zvXIN%2FWWqGojJGkCwU78fy8gJ48HndXiLY62LmjUxyBV%2BUG9a%2FHkGoY%2Fd9IdX0WHC6dazOX1p9wFsdZCu2Vgmqya6xr1d9WrmWgH3wv73Bvq0fMyxrm9nffm4%2FYy4E71rzkSl1ti2q0v3FVZ14uP2jyQyoe3tOwf%2BBlFGbxO5sNh2f7MNy9Ey5RgGKcKCj9hAA%2FiiK539ket8bGq%2FJh9JFYdSgIsE%2BvPv57BHafCAtzLESIkEJJZ%2BhoMINLppdOWcvP2%2BdyPD%2BDc%2B5%2BNBs5c4%2FSIgSgCDghobE0Q08nFAhzi8h%2BlotQ43DKLlwcRRWbOmNTnnlzp1xT3HSWgetXuOJM78cfD2y7rPqAotDgzVtNI8w6TI9pCmhJ1E8d5nYWfXOHHrRbg2BFlKh7%2BLbWlC7tdk3B%2FidIHnUfuQz19y76clYmFGRV%2Bkk%2BpyZRHviEUmg3Xx9IQrxsEBNatSsdCq0rCllWaqMg%2BxwtPfYvjqBkaWJxp6Azjtq9mCW62rcIXBc8I9DgWXWe%2BSoFVrPY6Gl8iV9TXiyacrdlw40wGPq2FvvKm%2Bk4frRXrKGlYnTFfKfzDQ4%2FPNBjqkAdWCfXPpewiNwGlERM50ho6jsp5Bk6NRJK0pXW2kCJflUand0uk43h4CA9Pp3cFfTRvRx8duuFqNGckFmQD%2BiOsiWLEb9guz4TkZYyyQdSr5QTNr3Ent%2FRRtp3ZAss3O%2BCzvLSt2V7K%2FGHQiRBa4bpacjXUWIgxbVIoFEwnmvMGzG9pSpKXSCKw6ujCZWPoKN6hjmZlXf4U8zAtOyxwOrx%2FSORoK&X-Amz-Signature=cfda9181878ec1babd5ec83bb5499cae637ebe5b4c66544a6a73efd533d225be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDYREFHE%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082555Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJIMEYCIQDo2h%2FPpaPvSiXPmYQVThCant9EhBchdqAJcD2aK6SkBwIhANAZQgv%2FbaBKrXOJfxhj2zGj2zMJ1fVcrWAIp%2FAHMfSvKv8DCDAQABoMNjM3NDIzMTgzODA1IgwAHl9z7AJ8hWuoZDsq3AOOGZwGE%2BhyhEt%2F7PEysAfgND5F%2BgvtneX8uAGKSxq1%2BmYK44DLqaYcuX9zvXIN%2FWWqGojJGkCwU78fy8gJ48HndXiLY62LmjUxyBV%2BUG9a%2FHkGoY%2Fd9IdX0WHC6dazOX1p9wFsdZCu2Vgmqya6xr1d9WrmWgH3wv73Bvq0fMyxrm9nffm4%2FYy4E71rzkSl1ti2q0v3FVZ14uP2jyQyoe3tOwf%2BBlFGbxO5sNh2f7MNy9Ey5RgGKcKCj9hAA%2FiiK539ket8bGq%2FJh9JFYdSgIsE%2BvPv57BHafCAtzLESIkEJJZ%2BhoMINLppdOWcvP2%2BdyPD%2BDc%2B5%2BNBs5c4%2FSIgSgCDghobE0Q08nFAhzi8h%2BlotQ43DKLlwcRRWbOmNTnnlzp1xT3HSWgetXuOJM78cfD2y7rPqAotDgzVtNI8w6TI9pCmhJ1E8d5nYWfXOHHrRbg2BFlKh7%2BLbWlC7tdk3B%2FidIHnUfuQz19y76clYmFGRV%2Bkk%2BpyZRHviEUmg3Xx9IQrxsEBNatSsdCq0rCllWaqMg%2BxwtPfYvjqBkaWJxp6Azjtq9mCW62rcIXBc8I9DgWXWe%2BSoFVrPY6Gl8iV9TXiyacrdlw40wGPq2FvvKm%2Bk4frRXrKGlYnTFfKfzDQ4%2FPNBjqkAdWCfXPpewiNwGlERM50ho6jsp5Bk6NRJK0pXW2kCJflUand0uk43h4CA9Pp3cFfTRvRx8duuFqNGckFmQD%2BiOsiWLEb9guz4TkZYyyQdSr5QTNr3Ent%2FRRtp3ZAss3O%2BCzvLSt2V7K%2FGHQiRBa4bpacjXUWIgxbVIoFEwnmvMGzG9pSpKXSCKw6ujCZWPoKN6hjmZlXf4U8zAtOyxwOrx%2FSORoK&X-Amz-Signature=faa791fed358384257e8cf88053ac5f27402e555ea890b30bd45cb779de1754b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCUNAHKU%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIGspvFVXlaQr7WXvHZf2dy%2BPw6MKfW0fOPL%2FOGeP77xDAiBDylxwzPvXf6ENgyMbElk6zdbnvjzeqRYN4obVjDxyIir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMd00GSDE1BxHrN%2BVeKtwDleQt5Tq2jdGiSUW%2BCAeJ2K3zamzcgaD2GFQshFb7qjSUOU%2BvPGZ4F0R6Q%2FiJr6p96OSiCzt4utJlAQCHc2oxAP1A0QOmd7w0196TtE5dGx1NzX2eS6CQyU%2BN1zfItzsw2LZFCcEgzj%2F1O%2FvK%2FAZDv8XtjgjScu8lvo9I1o62LQDWbQWIvoRmHY75xCgspBtU3tYN%2BS7%2FxOAzKrkQeCGfprVrZMvFjhVYWkgaPY%2B5i3q%2BAivOCCS57t%2B8L1xM04mSv5kAjTa08gNCkyjIV5RPznoB9qYzPg41uZeuPdBzJMd%2FvBTQxSR%2FqwnRW4SpsaU%2ByykRknHeReQ6itxqiH6GoWu5%2BEs6AKOWLnYMBR8o%2BbxbhTg3OvCY6sJvdGSRmXGAVO93tETVYMrog3fW4W2yDmWSizKh6PXGPSr2WkSkCYlnSPtQJVQSE385%2BNgbbhet%2B35NLUZEsU7DxAhIEP1pgqkO67NkO3FJaDHY1WVExUClB6%2BLFPVRNtf1BYhko%2FvSHCnVZ%2BULhf16fqT9o%2FWvdjwhhpH9ViXbt5ziVIXeZDGUUDkUs7063pMS%2FIsMoE9OeLsEl%2FlYnAS%2BiYAqbOSHN%2BE9bsf65yJh4dbfSPksEeerFziTX80jnCkMhkYwrePzzQY6pgFg1r%2B5m7S5bF5Jzm0GOamJdZc2lj2nCUSZf3GRkEYPYUoO986j8ySNVsEpN0NVZu4S%2FaFhgOVAbFURIgn1So4jN2HlcxsMDoMwgp6%2BiolpmO58EksW4m3zH7gNycuQgvaQyl4%2BZ5RuLT9uQtt0GuhQJRm4Ec6Rh6cXo5zonKdRol6O2bpv2qhwHA8WpMFB5OLKij5S2XQCwfXSL1eYv55R%2BJq4Hz6Y&X-Amz-Signature=d537f7a42cb8aaafb36a5c8e3d0e42c97d54c83a0c393f5bc56c67ebddd9cbaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4N6UODI%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIFDq7HhqKAVLSqH%2FZ3spmlfiZAqQUmd4BS04Vfaphi9xAiBQQgQ%2BjlsaBlUpVZrBeEgtc%2F5qwTh6hyAli6cFThWiRir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMqCl%2F1Yjooc5T8J45KtwDerCcb2PHIza4t3YfYgnN3SpwiBU4DOqCJDsJaY9Uih648qrlp4wB6UnmN38QSPjjSAXr0oE9jAXlYhAc3hNezqkX%2BY8Fv96vUFc9EeDNqtH%2BDjmskt58oBP4VKu2j3e1aL2B45n%2Fw793Qn7YAc7AOsvKJDFW5ktufqw0PmIDRFXqEUyI7O6cOMvzDfu6zPXAFHuVakIrpOn30ypOdoy6UND46xfysiCXOx1XJiqhNJqHgId7oCU29ZMQkOdqtf8A%2Bii%2FVREPMO7lxJf3BHyJvd4V72xir9kIKuLO9RindTs%2B%2BzkEYMBi8jsV31AiQZ%2BEf%2Fepp8Jk23CcgZPCkbLGH1wnqJ6CuiqyUo5J3oo32y5QgCLyJ1wubbPYOQK0KX%2FyHGCMT7b6GZuTPpIRSWbg6XKl1Xlezj02q7FRCVFgFAgVCsiS8PlUiozuLVzVjQ6oZksJsEEW%2BnAZTpeKVy6r3vf21NRBAvg39F%2BB8uqNfMG60YUqkP9VBvx2GIr%2FazD9j3KLnxzBLog6zbCHSuFjDyY%2BpVWy8T1mMrN5TF2bd8ceEWfNPtqLfo8hB0GpnlpRSDBCM6xALDODJGu5jbMFE2fQElaIusQY37KLDjtUB8dD5oGizhRO64SwTMswjuPzzQY6pgHMlPDP6cXXWUElhZKTMVpEKCKxISAiVfXRw38LgXchcyCEf94808k3a3mTBiBpyPihVcAYjnEMT4ATd7U%2FYRcm1idzWNG7l0qeLDF%2BvSKYvEpwNoozLej03wp%2FqSfEEkeWPKb568FcuxgWaV1RDoOpDA%2BnH1%2FbEhvGHTjg7AMrK58TIjGswmukYnj8kB33LpqpbqRQG6zzwYYt1pWdT%2BxmpQwVS3xW&X-Amz-Signature=1912bf184678b020b73495368efa6dbd0620c657701619e734b5d5f7acbac008&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4N6UODI%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJGMEQCIFDq7HhqKAVLSqH%2FZ3spmlfiZAqQUmd4BS04Vfaphi9xAiBQQgQ%2BjlsaBlUpVZrBeEgtc%2F5qwTh6hyAli6cFThWiRir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMqCl%2F1Yjooc5T8J45KtwDerCcb2PHIza4t3YfYgnN3SpwiBU4DOqCJDsJaY9Uih648qrlp4wB6UnmN38QSPjjSAXr0oE9jAXlYhAc3hNezqkX%2BY8Fv96vUFc9EeDNqtH%2BDjmskt58oBP4VKu2j3e1aL2B45n%2Fw793Qn7YAc7AOsvKJDFW5ktufqw0PmIDRFXqEUyI7O6cOMvzDfu6zPXAFHuVakIrpOn30ypOdoy6UND46xfysiCXOx1XJiqhNJqHgId7oCU29ZMQkOdqtf8A%2Bii%2FVREPMO7lxJf3BHyJvd4V72xir9kIKuLO9RindTs%2B%2BzkEYMBi8jsV31AiQZ%2BEf%2Fepp8Jk23CcgZPCkbLGH1wnqJ6CuiqyUo5J3oo32y5QgCLyJ1wubbPYOQK0KX%2FyHGCMT7b6GZuTPpIRSWbg6XKl1Xlezj02q7FRCVFgFAgVCsiS8PlUiozuLVzVjQ6oZksJsEEW%2BnAZTpeKVy6r3vf21NRBAvg39F%2BB8uqNfMG60YUqkP9VBvx2GIr%2FazD9j3KLnxzBLog6zbCHSuFjDyY%2BpVWy8T1mMrN5TF2bd8ceEWfNPtqLfo8hB0GpnlpRSDBCM6xALDODJGu5jbMFE2fQElaIusQY37KLDjtUB8dD5oGizhRO64SwTMswjuPzzQY6pgHMlPDP6cXXWUElhZKTMVpEKCKxISAiVfXRw38LgXchcyCEf94808k3a3mTBiBpyPihVcAYjnEMT4ATd7U%2FYRcm1idzWNG7l0qeLDF%2BvSKYvEpwNoozLej03wp%2FqSfEEkeWPKb568FcuxgWaV1RDoOpDA%2BnH1%2FbEhvGHTjg7AMrK58TIjGswmukYnj8kB33LpqpbqRQG6zzwYYt1pWdT%2BxmpQwVS3xW&X-Amz-Signature=1912bf184678b020b73495368efa6dbd0620c657701619e734b5d5f7acbac008&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FQGIXKS%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T082559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGcaCXVzLXdlc3QtMiJHMEUCIE7%2BB8lf%2F5VRC%2F3uwuZcDZ01Ne9h84SDNcpMOlscKFzqAiEA6knrHzavN3VoV9npXoW7BzPeJBnE0ZdPuWRcC0r15%2BYq%2FwMIMBAAGgw2Mzc0MjMxODM4MDUiDFXxydvLJfbODaJsXCrcA10F4o33UQjLxrNBTNtLgedzKrRKlayk9TiQ2gf4WuLkMtjaQIpf6Gy%2FUofWY501Pl9Xlf4sy%2BWEmc%2F%2B7JS8S9y9grK3i6%2BIY6KGDx0%2Fh9GNVbjGF8dpPT%2BgszPUnpduWf%2FKVJSLhUs4sx9Q73ytO0NtRTxHM4c7z%2B7nZOmkv3NVOUn0kBt5JWf4aCylQC4%2BdtUYpsaijEuNt4tvrU35qmbY1S15eCAvEDT1PNFLoj%2FSVOr4WL9qDczBt%2FKLmpo1RgB2fN4UqSDSx6pwxqFwg8gVnUk%2BxQBoIE9HstVgqQFYuKa5unVrYYCxgRp1LatJmd4xOPazQecyju5ay%2BbF1HP0gf2b%2F3XGTWW%2BT6DSGA3PjsUfEhaU7OsvlGYv3ix9Md17s4Hp8sJVtK1Tr4hQoqUxPN2s1ahXCFexTy9YBtJwLe%2Bk%2BQ0hBLyjKZUjj6I%2Bx%2BATVOGOntXkJwtLLKFVfRrQHdbOZqUULp4J5aabOIxzMvY%2Bx30166lbgRWdSf%2BoEq%2BSE5XBmnh%2F5TJaN9%2FAIEhiMmbRQFSGoAiE0bmwLAEypngXZO99Tu6ZeHF%2Bn33sVfRdzNR3sQi%2FgiMuTnIpbUSP4Wdq2R2nVB3YKnUbRiIIQ6Twz0B84ndPQRIWMM7i880GOqUBCVi%2BJGXzTZMHR9iJDMydxic%2F4tCgVFLGJca9ODnQOqjgci6oytVNEqH%2F%2FaeBZhgjB8QdjXj11t5Q%2B%2BCKeaqSNuIRkakgxtxZ33f0PN3YsbDnynhXn6Np78Bi5n5Ioq5xsd1D3eXNl9doojBZK5gML841yfq7nV9h2zoGYXL1Jj92FUz9hel2TnqrPrICBLLxx5%2Bnc20l4nOWCKtE%2F4%2FAWmJA%2FbIn&X-Amz-Signature=0611946a42603bf06de479537018af4141ba1ee93183441fbd3491702ae6701a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

