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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FFFGUS6%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIDu2JckaV07jAMhB9He5Ey4kCby1vEnb0f0p7OT767R3AiAtrrmahQ2uKzZ12H4IfX1uXJcCo6PCCyNLIJRGm2ZrESr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMaS%2FY1pStkTKrAxilKtwDumRPT1lWzaF2Cg97ecVyUSdZZpx6fWXYM1iHYXORt4gQtd%2B0%2B8GZ%2FzLF7ZqKMR%2FpYTxpWjAY3qfA2qsnMSQnY3zu95vGnwh4hkQ%2BphOyzZgjON9HtoWPMXCX2tmsLngPVnzt6mUA%2BN%2BbbOpPOuuUluEFJ3pq2U5XQYoVlVm9BolfEDPRY0paE21Co3Ok%2F%2FfBXVNv8AN9pbaaT37FxXvjry7JgKwR4hhtA0GzymBSUsk2cRAiFl7KSOzKUJ5nhg3vpASV12ZpqKbRRt9oK7AQqqILxu8IGL72hkLa4W3wmP2UTyMrucPCSt%2FNSkHZVbbxSJMS4vSn2SC6OaAnmmFhn4HyYaq7tWooomWoVFBVGnGVGxFgEaI3GH9TDgjDxyT3tcXWwbiZ43SnGY8I8InV%2FPVW61BP4co1vFA5tspN1vs03%2F6IIz15ZsaVB3UhHCLyIrQsKTo6vo%2B74fgfxpC%2BN90pzDP%2FUmgTFr4ppn9Uw7%2BQFwi%2BVb%2BqHn1S0qjnaIZCq1IIQ2EWzpj5snRUrRbPgTIvbRvMDfQdhpqkGkLtW6JKXmGlwOueFvesmUzwHB5oNgB2fH76AFfrwUIZwWVwYoOsvfPM6iAYjfqfsSj9gTP0m273WpMgs%2Fr0oz4w6IXszQY6pgFYVW9ei3xyFGPojtFmpJnmymP5u%2FaFa%2B9xGsiuHRysZOaqEWexWcsmm%2BVN5K44a8Au4uws5EqQxxGcagbbMdCVun2addxfH3uzobZdxwWzwzL4Vkam1VFoDW8soDTD2HAc83HfDGWvuiB2WQJ6srAdo7q0GY0KPumbF49LJA0lnfnd5Lpj0AJ1t3hTc3FqzrMVoB75clTn0BVAiTbkF%2FtBxwg6KJdf&X-Amz-Signature=0e82d86087ca38c6e556d6cab08211304213024e027e00291a2ef75d0f156c46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FFFGUS6%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIDu2JckaV07jAMhB9He5Ey4kCby1vEnb0f0p7OT767R3AiAtrrmahQ2uKzZ12H4IfX1uXJcCo6PCCyNLIJRGm2ZrESr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMaS%2FY1pStkTKrAxilKtwDumRPT1lWzaF2Cg97ecVyUSdZZpx6fWXYM1iHYXORt4gQtd%2B0%2B8GZ%2FzLF7ZqKMR%2FpYTxpWjAY3qfA2qsnMSQnY3zu95vGnwh4hkQ%2BphOyzZgjON9HtoWPMXCX2tmsLngPVnzt6mUA%2BN%2BbbOpPOuuUluEFJ3pq2U5XQYoVlVm9BolfEDPRY0paE21Co3Ok%2F%2FfBXVNv8AN9pbaaT37FxXvjry7JgKwR4hhtA0GzymBSUsk2cRAiFl7KSOzKUJ5nhg3vpASV12ZpqKbRRt9oK7AQqqILxu8IGL72hkLa4W3wmP2UTyMrucPCSt%2FNSkHZVbbxSJMS4vSn2SC6OaAnmmFhn4HyYaq7tWooomWoVFBVGnGVGxFgEaI3GH9TDgjDxyT3tcXWwbiZ43SnGY8I8InV%2FPVW61BP4co1vFA5tspN1vs03%2F6IIz15ZsaVB3UhHCLyIrQsKTo6vo%2B74fgfxpC%2BN90pzDP%2FUmgTFr4ppn9Uw7%2BQFwi%2BVb%2BqHn1S0qjnaIZCq1IIQ2EWzpj5snRUrRbPgTIvbRvMDfQdhpqkGkLtW6JKXmGlwOueFvesmUzwHB5oNgB2fH76AFfrwUIZwWVwYoOsvfPM6iAYjfqfsSj9gTP0m273WpMgs%2Fr0oz4w6IXszQY6pgFYVW9ei3xyFGPojtFmpJnmymP5u%2FaFa%2B9xGsiuHRysZOaqEWexWcsmm%2BVN5K44a8Au4uws5EqQxxGcagbbMdCVun2addxfH3uzobZdxwWzwzL4Vkam1VFoDW8soDTD2HAc83HfDGWvuiB2WQJ6srAdo7q0GY0KPumbF49LJA0lnfnd5Lpj0AJ1t3hTc3FqzrMVoB75clTn0BVAiTbkF%2FtBxwg6KJdf&X-Amz-Signature=0e82d86087ca38c6e556d6cab08211304213024e027e00291a2ef75d0f156c46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYPARBVO%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCID1%2F%2F%2FBlNraPms8ZTr%2Fw0ARSIL9fUyPTSpaOFPmGHN1oAiEA6BBbOGOQD3DviUOwqqHd9RimY3ljwau0YWMMaaVsYaYq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDNWZVdwNrpBznwPLJSrcA6bG8XR9f27nOtIfv9Df%2BZkZP5frCUvi9FOjZKfohZ1OmCLvKwxtzCUw6PI6%2F6YdHVRtqCNg0uvQ2RIlpJySu1AVQSYBqMVW6ukXqbHQ9Orq%2FAfVjuaFW6gBWzJ1ecpOlv7ZfVsq%2BnQUD4nUAowX%2BU1dXGgtP5QTLFK%2Bt5Hk8ZY8GaDe2doX8JK%2FT8YsY9%2FkLktyW0C8D8PJdWo1w5etM8s86XQegFiNkjStjqV0SN8ZqSpxsVJDkUAuRcSGIYYkplH1gEsOkA6HF0U6pykorAn1DC8dg6it0SA%2FJlauhEj3%2Foh7GNjZTLX2HtFcdhypeHvaFqxxW6NyegOC737bUyUCkrai59AG8Jone71Wa4CfRxVM7LUqoniaASg%2FtXuvjPRMEuFZGSUgCe9TCfVzLsqiQZ0W6kjzCTOK084NEjiQsdN3pSGb2XHTdAWHythVzlLN4qv4S1uUZYwd%2Fp8MDIE%2Fj0iOh1h6EqtXImQ99EpQgvRAOAVmxT96ks0RisT7%2F%2BTBJvP9dgmFXDHNqWgV19fB4JUdhN6CSWSsX4URQT0Fv7DcRZcURTrVrvV8XcSJ20qwh8fw84NltX17fQ7xww%2BxCgmFAEGcPtOyWxkBTNI8L2M4PBNlAfoOEBu%2BMJWG7M0GOqUBFIWtQlFHZlrxcIx8qBOiQ4TMQ%2F8HxrkjQ8XRADj4rqGh9uLGRn0iornHTNuXT%2FQHbMGfi3NNPzEl0%2B9GS%2BHLVeQDEuG%2BHF1IUxH7PsELIOCJDO3MQSEOIHlG6kl40Mpj8QgxfpmAVywVdxoIkhCvQ5n%2BVLvc%2BUbt4qEE15%2Fmwqb09Y1si9O5ij%2Fmd97uvQeCfseLFaYsxhjnDXXfTgBp4GTkE%2FfK&X-Amz-Signature=2fe88791504deee5578fae9cb06d119223b1014154f72848f63804291e2a9000&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQTR6OOU%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCII%2FmsJ2E6lPwnye6v8JjkGK59zfGa9bXTAiMcVa9M8QIhAIS69ZzHB%2Fwo1bp7oClrtyoA2URINjwww9ujN97CRzDcKv8DCA0QABoMNjM3NDIzMTgzODA1IgyVaOJEVKdOcr6hsKkq3AMoBhSqtOvnL8sRnMNeEx9H2b4361%2FN6Vi7dd3rU7Z2sEmiB9kSa65YsZTvSyzxJt6lKCmAd6Z1DocPwMy4SX0Hliec4rcilQd6ZrPDmM4F%2F2f37EL3VE5v5wATuGB8sielX0YIvbUq2%2B4EhHnOnwF9qFbBf4kiGDd5rljHglh1DoR8jnSvbRyjp2e92Q6bSPNLv2jhXy5usKNPMTvIhK3SRv%2BI%2FQ2DgEAIOhRv5jYsmbIRNO5QaDYsRNdLfxxwTXkM1q08YF%2FZOEyN23sAoOVC8kEuGpvYF7XUY34g17gKimkwWZDZzggajXbHGSj7WrK9Kj5%2FXIJK1%2FF22oLyGHA0v2mNe6zxCbKRDQjHIdc%2B0i2gEvhlyk%2BwLIzPE1Ras9n%2FASh0D9sLxIUG9e%2FtexYu3OpbhgqaILjNFOW%2FK2R5OmROuMg5iV%2BIIeSZu5yDPibVgQxVfv%2Ff3tS7EAS5DMKHoDhR3zPbyoJniJi3F8SJnv3%2B6mkNEVZPkY85sm92%2FKD6xgvirZHfWAHrWi%2BPoUELw5OCrW%2BAF0HujJ%2BzYIpsoexfRQ%2BdVfF8D%2BJTlvLZlCb7GeQHppuELIv002E6jxZWXK%2B2luTfVO0BhuTPCWI%2BpP6fi46hWlOjZIMpvjD1huzNBjqkAbBXj28aj3q2NfIHWXxYuhsVu%2FqeUQY1Mkyt5%2FIm%2BFZgjYr3XciewRT1DKZYCiUv72zhCeKwh%2FvDH%2BFqDXqPGHP2eljjTpId48WDR7uVTPtAkv5PDFtLdX57df0uLc6Wz17%2FDqU0MFBeT3ZxgQoGx6PIO%2FN%2BZtjpjlc8D5A%2Be5bi%2FKsGWG2647EOo%2FFfKZxiRUmgSqLo%2FJIiZAOZl%2Bl2k0%2BI2Gyn&X-Amz-Signature=7e50793212ff2f2b590f098132ae108ea69e78eabe78d851edaeabd0fe8284a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQTR6OOU%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCII%2FmsJ2E6lPwnye6v8JjkGK59zfGa9bXTAiMcVa9M8QIhAIS69ZzHB%2Fwo1bp7oClrtyoA2URINjwww9ujN97CRzDcKv8DCA0QABoMNjM3NDIzMTgzODA1IgyVaOJEVKdOcr6hsKkq3AMoBhSqtOvnL8sRnMNeEx9H2b4361%2FN6Vi7dd3rU7Z2sEmiB9kSa65YsZTvSyzxJt6lKCmAd6Z1DocPwMy4SX0Hliec4rcilQd6ZrPDmM4F%2F2f37EL3VE5v5wATuGB8sielX0YIvbUq2%2B4EhHnOnwF9qFbBf4kiGDd5rljHglh1DoR8jnSvbRyjp2e92Q6bSPNLv2jhXy5usKNPMTvIhK3SRv%2BI%2FQ2DgEAIOhRv5jYsmbIRNO5QaDYsRNdLfxxwTXkM1q08YF%2FZOEyN23sAoOVC8kEuGpvYF7XUY34g17gKimkwWZDZzggajXbHGSj7WrK9Kj5%2FXIJK1%2FF22oLyGHA0v2mNe6zxCbKRDQjHIdc%2B0i2gEvhlyk%2BwLIzPE1Ras9n%2FASh0D9sLxIUG9e%2FtexYu3OpbhgqaILjNFOW%2FK2R5OmROuMg5iV%2BIIeSZu5yDPibVgQxVfv%2Ff3tS7EAS5DMKHoDhR3zPbyoJniJi3F8SJnv3%2B6mkNEVZPkY85sm92%2FKD6xgvirZHfWAHrWi%2BPoUELw5OCrW%2BAF0HujJ%2BzYIpsoexfRQ%2BdVfF8D%2BJTlvLZlCb7GeQHppuELIv002E6jxZWXK%2B2luTfVO0BhuTPCWI%2BpP6fi46hWlOjZIMpvjD1huzNBjqkAbBXj28aj3q2NfIHWXxYuhsVu%2FqeUQY1Mkyt5%2FIm%2BFZgjYr3XciewRT1DKZYCiUv72zhCeKwh%2FvDH%2BFqDXqPGHP2eljjTpId48WDR7uVTPtAkv5PDFtLdX57df0uLc6Wz17%2FDqU0MFBeT3ZxgQoGx6PIO%2FN%2BZtjpjlc8D5A%2Be5bi%2FKsGWG2647EOo%2FFfKZxiRUmgSqLo%2FJIiZAOZl%2Bl2k0%2BI2Gyn&X-Amz-Signature=fe9a39bf20e0eca35bdbfea98a0a6c536a2dc6f9f41658c43f7f758651e7fbca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STBB5SDL%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIENGXBYCM%2FrdVddOTlRD5WItmy5t%2FdBl7c5AtVJUhUQ%2FAiAbOyr4br4yAlitumk8mhJCWlGk7NNZS28%2FEd174qToeyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIM97Yeu8n7wXY63tSkKtwDx8ERWc0jUz3NgTJq9JS6VjYbzdjOUM9ZBaGw2R8qD5hFjW3W3kbCfBtqecaZCybSAKyzzzXzIv%2Bd8HU1hXupCGjM1vTWsG4HfNxyo9ICERgjWg3Q%2BFBWp82vbz2f0JBezOvj0CcDhgwyRmfPZmvlo1g5ikwB2urQHDxPvl3D%2F0A2K4dKyf2SA7QxGPDkI24KCRXRm8J7OyJLdzknJ0octpP%2F6B8iI1LGLK%2BuePhj3k3yieqFLA9Ybhm7znxHoPrxIdeo4P8%2FT5IQXl4XjVoupFmw793Uoq5uRgPQy%2B1ekofKDBL7rWuKpIcKB5q3YQShAsL9PKHZrAAzLwuA5b9yk7cegEQp0Zs%2FrzzdVneaaslfBSt6Qg2aVyY%2FBzRZcziQjImYb3nEZTkfRuAv87vMlf6mQYcg2ZeIiFGXrBGekaeS6Pqj%2FxJ7h8Hcp4fqKTi5%2FF3hjuuS1o%2FwuH5jfc1t%2BG9TF8lXms%2F2vhaEQ%2BKGrZemvWnpsvZu2EOsxTOGxWkrYYtvFu76bGwT81Ut9GyWQZbOBOl74MVulcOAS1mNJ0XoGIRAxFAXXEjrpGw8nDujikSlHvNA3tO7F3tZqnv8VjTP6ZVk8TEDivxNpJsaQEriqOoerC%2B9i6KkG%2FkwlYbszQY6pgEpUOgPA%2B4vyzrsIczqAXLXAsr1jZYfT8hedU%2FsEPHCUbr4RB8CGQyg7v75C3mx%2B8TGfsJJRTF4dMF0bRbePC3T5RUMAeRlGVq1R%2F473Bcp89hmFxoKhYBhx%2FTSNYSvrmqG6gCFHyNsIc7%2BGErcWWWDrRmnK7CYoM3dJsE1qkWvZtdAq%2FDzD2Z3vq8DhcQSykxuYpG3em55ahSSebPAf0YtvTIOk4jZ&X-Amz-Signature=ee37435b36ae266f5d062279cee1660c92104fa12fed1d044b32a7beec8e98c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BJMVSOD%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQD2bJHVGfXfzFFH%2FEczO%2B18lCjIweCHz9swvAiehc%2FJxwIgDqJXfRRuKp%2BXue%2FXqRgqcFzrIcbDvBs%2F4QyZgLMGYi0q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDFcUmVh9yH0NqAF0rircA%2BozSsUgCbnvgyZt90rWrZQO9en8HnaGP4utZyFHhadA3NFEdxIUpbH%2BufpGm%2F5pagh836bSCaPBwCU7PuISaXZlPYUyQR6EmLxB%2F5CJizAx55JY804gATJW8B0QqoUKic9p6wDMk3DdA1qigVC0hBaUZ1CsbdwAZhwOZtUH4azcfj3tijggkdIs%2BtJ9a5dJWjYgoojWNgkI2LQtJUWbasieY10oPhOxbKH1x9xhgSD%2FzCU7C6us6358fPhXM%2Fic9vjT46gVI2hHwikxYMADi2eifsmkYfxNXEZVLkZgM02agyZH21YMrrhEAcRvVWDG8HytAZexIjH46Wptr6I%2B0NCo0aAA05tR%2BpnZS9tVevitZVCKYzeTTzCt%2B161z4X15KAQrgp9DYISXJa4QZf0tr%2B7ghn1qk6LOr9QnE%2BigUJhDGvYeo0U8bi6vMHo8aMkKmOuMdMd7qlSZRJ3t%2BAbAAqCJgARPf09IM6iLX4UuuluSI1ptps15T5KejoXw51P4i%2FUJrJVyON4ooEhVw4p%2B6nRVA6hwkXOyYBBRJum%2BPPaY4UPIeZIAbUkioDJeq53YB3uKmQtkC%2Fz6mkXHCskUGZvvmY%2BDq7f25ctKgQQbqzT4gF%2F9D55MdiPDn8BMJOG7M0GOqUBLIx7P%2FaL1RvJYbaaawhEnQDKtwQWQtls3Y6OkgLqCzrbVyfKyZaCF5SdyYECreQGgp2svyh5%2BeG2x6qV%2BvpJgolWNKzSmi1QijAlAp1LfVYZMDzDNP8sPGDcm14egrMMsHdow%2B8TbEF%2Bfi4rKIs415PGS434M8gHc7iol%2BBOxqg4CiQQAALqOoOKOFski00RQnURBREBy83cac8ZUqFJzaRLUTXR&X-Amz-Signature=a4c8c75a6e0b42a426726bf5518988fd9655e30aacd0ac331414e34b512fa6e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6EQK2LB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIEiG3oKMgYSmREgFU6yosZIW97TBN2RarbHWLXkHPJ7XAiAw5APSO49Snidb4A1LqloMlkod4Zig2CxsKdgxA0U1YSr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMNYnAcVpHRF9WptoyKtwDIoIhvo5PZI3N1FUU3GIquQdIt4Su0xBm61B07RAZrLZNIaF9TIjDidt9PzTdA5CnWjuzKDSN5Oao%2BG%2F4GqNcBtQAsZRG%2BQ%2FmJG6sMP%2FGfwMXmyeIoLZt6G0AOhBaw3XHx84xMTwNS%2Bj6QKhH9DR5JLxKmhtbXYVxqfsm%2Bva%2FyQdLC707dP3UQPqPxkXzf453qXputZII2i5aUctMprFF0xJGylejwOGqH0zYYwSDcBZ3Nj%2ByvO%2BpnMyZ7ZyMhtjHGp%2BFyc9G3LSY2qrXUjeBY%2Bb09lqYlncj4MV7XSFU%2BA6QgVJtOmI93hg3oSWFUCAWeaFMPGp3MzKdbULXiaBP9Nj7y8uDcV9xgjh8Nx0Q6dSrBF%2BArXm0UU4uckeMth3DV0cqz8MGNeacmBAqY50igX0iqqKl6g%2FAIM6iwBNF1SHjLuQqhIX4MYPJcynjHnCHQFGZXCFzhHJNKAkPHZme%2FyOCafzwJqv9%2B8VPpVKW7x3ItdWXqx5KWx%2FkGOf1r8mpvLg2dB4JS7w46iUlwhbiEA2YSNWjH05TzOexroBxIz1gCWtRUWJ%2FvUtMW%2FaKd33aPsgm5RMCZyurizMB37wHlD6lYsEX9Zj%2BT9KtMUfvmQ7M0XVf8Ag8RH0Gw%2Bcwq4XszQY6pgGPQbLC5rIZOuKlRxVwevJii5vkcviisJvuhE%2Fknd8TEwr8zXF4uJHipTa1Y%2B95pL7Ehl0RFUgRN62ZcSI0CuN4SxTEDmnLqJNT9uyfXn33%2By3mGYXEBpqZdHHPqU5eACjYQcK5M0avLrCC6tSt3w%2BdyA%2FfkiIV4y0AnQMhXROqd7oroU%2FVR0kzAwc3ivc9lz4S9vo%2BeqgOxN44T2jlxdcvlJd%2F8c5X&X-Amz-Signature=adba87db45bea0919bac4f621c3551c01a01996d239c9d6094314fd044184167&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XK65TK4W%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCICWAjEzhN%2Fp709lhM9bqJqbP3SkbTJlt0UQuRsddKGu5AiA0LaM0YRyPz7UD3%2FwEX0hQYAAJKHWUt3iNRAdB5mhyySr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIM3sfH2tMq8u%2BaA1%2FuKtwDwTIy9xWFLmEhWYZuyRyso530GS2E3aE6kobUJBl%2BpEl5QIL7rEFEkyQm6GURjU9vC7DbgLskNF07A1nnFQ0UQAZFOaqZ9GsGNKtznr0U7CkV4qltvzRhpqaWr8yOawwFdn09qejccFlFWv7cp7VT6nK4%2BHCm%2BH1KQzp%2FT9dK8o9iOrOEOFHUqSZk7siP96Ne1YdRDT0DsLgHHTHrJGsVA3h%2F45BGrBW3uaLycj0lQFRdFZ7BT3JQpfWnxq6xC%2FU4ZDp%2BaXsFLLAEMsAg5tcfUd1TMA3tJhNc3Cj3uYle5p%2BswV%2Bsa31ca5qK2FzvG6NeexZt3C3TktZVX9AfC2hsvultjhw1zfKHWKB8UmNhOi%2BHm7w5946BLBf6ncd3gBshrhC2m0pHisniwIb5Po2vqte0VTZv9uoSlc1xUQi7PzNqPpJvkTlh3OXVIOtsq2Hp8EYPCsAbaT8oR1Jo1SuMxUrRMCZQdw8dIdRYQ%2FXqUUEBP71qQZg1fussayVRCQCRtY9hH9DJJ0kBiz93ZCYM9DVJoy0fkaaN8Eg5pNYa%2BShwSLQxdQ1JypH%2FF8%2BLpv0L0toVs9S3AiqAQWvjUuG6V0VXcEvmJ%2FAFfxjNIw8h8z3k9uAirG0TT0Cfw%2BgwpobszQY6pgGg0nrkYm6HE4s2%2FvuFoN1AZzn66DvXv1BsNNwxmCggwJZXwjCyvGSWHe9cNxIXOnvZ%2BmyYv3KslmVJk8X1S3s0HHlQTBQIDs5Eoy%2BmMY81CGRfu59hPQXSo6yQplmvrDHAmVH0TZBU0VrvpiZ1pb7U5P%2FIPkp3J43DPbchGDbgJ16jC1fyeXPRVgVcD2%2BrD2VcbRFIud4ucY6jUVZNwZciwlMczw%2B%2B&X-Amz-Signature=264499ee6807dc1320eae51f59331457b64661dd8406a3353ded02a2beb6c235&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XK65TK4W%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCICWAjEzhN%2Fp709lhM9bqJqbP3SkbTJlt0UQuRsddKGu5AiA0LaM0YRyPz7UD3%2FwEX0hQYAAJKHWUt3iNRAdB5mhyySr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIM3sfH2tMq8u%2BaA1%2FuKtwDwTIy9xWFLmEhWYZuyRyso530GS2E3aE6kobUJBl%2BpEl5QIL7rEFEkyQm6GURjU9vC7DbgLskNF07A1nnFQ0UQAZFOaqZ9GsGNKtznr0U7CkV4qltvzRhpqaWr8yOawwFdn09qejccFlFWv7cp7VT6nK4%2BHCm%2BH1KQzp%2FT9dK8o9iOrOEOFHUqSZk7siP96Ne1YdRDT0DsLgHHTHrJGsVA3h%2F45BGrBW3uaLycj0lQFRdFZ7BT3JQpfWnxq6xC%2FU4ZDp%2BaXsFLLAEMsAg5tcfUd1TMA3tJhNc3Cj3uYle5p%2BswV%2Bsa31ca5qK2FzvG6NeexZt3C3TktZVX9AfC2hsvultjhw1zfKHWKB8UmNhOi%2BHm7w5946BLBf6ncd3gBshrhC2m0pHisniwIb5Po2vqte0VTZv9uoSlc1xUQi7PzNqPpJvkTlh3OXVIOtsq2Hp8EYPCsAbaT8oR1Jo1SuMxUrRMCZQdw8dIdRYQ%2FXqUUEBP71qQZg1fussayVRCQCRtY9hH9DJJ0kBiz93ZCYM9DVJoy0fkaaN8Eg5pNYa%2BShwSLQxdQ1JypH%2FF8%2BLpv0L0toVs9S3AiqAQWvjUuG6V0VXcEvmJ%2FAFfxjNIw8h8z3k9uAirG0TT0Cfw%2BgwpobszQY6pgGg0nrkYm6HE4s2%2FvuFoN1AZzn66DvXv1BsNNwxmCggwJZXwjCyvGSWHe9cNxIXOnvZ%2BmyYv3KslmVJk8X1S3s0HHlQTBQIDs5Eoy%2BmMY81CGRfu59hPQXSo6yQplmvrDHAmVH0TZBU0VrvpiZ1pb7U5P%2FIPkp3J43DPbchGDbgJ16jC1fyeXPRVgVcD2%2BrD2VcbRFIud4ucY6jUVZNwZciwlMczw%2B%2B&X-Amz-Signature=a11ebfe1e8c2bd6da044375d4bfe7af26e2d53b9a87099709b5c1b770cdb3914&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRMTQUF6%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCICv9pejJJG6VghCXxjXXzko6PD2B40RbMVgfM1EhFf9kAiEAl1XE7i5B6Aad3J%2Fd0RsN%2Bo7z22CxX9pzzJ9gmycnfN8q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDJtI3bRkp7dZQQ45PircAx3LvxK2VuER8NLw%2FpPcy3PuSv57DksW25b9DKN4rTm8aA7tX3OHl3HeVJvwgnxk9JvOo3x6DNOIfgtUIdOAGJZfkFlPwFh77nNo3%2B6dWmEseiIezRfYniQ0uE%2F7Lk5rqX4mQJMH4YTne8gdQQRDz1z5z5hjPbORFGKcTjGsp5iKS%2FjvD2w3MGbKv3VO9y6u%2BmL3%2BvDamwZpOhE2qvH3kJFM8Xa6QIHYrlcZ1eF%2BzbURoaf%2BZecm%2Bom4qQxYWv8eE%2FGtIiv0SeyJ%2B%2BGekpylCvMzDpRwrKHp7hSmfeEmgXwBFo68VoLz3cYAQtxtl3wKP8vLrLm7UNkz8rjJR4fjH36rpZBQx%2BIOAuzHwRJl614GErvvHY7vpebmt%2FgacfBzznYTBfb6LZMstIFkHjv2U5iGxKuGaWoLgc0m6gm3GFuprN%2Fp61wr%2FGCWSMcFW3IWzHVurRWEe2DZ8xTamXR3Tlvf8Y3Bl7EB2CAJzY2c9UhLZrVSZguMyclR%2FN27YLrHe6iGsSD4eKWpl3fzrr0ouNlhtTrmNPHyXspx%2FHWVJkFMYEVXAQj1QGZfoT%2FwothcSMC%2FpqLnZK5djtTE8osQHAGFV4MDHzBhu%2BJMsMu47oKEG%2Bz%2FxLVk%2BUYSVskIMMiF7M0GOqUBWLNWqdQLp9OGg2ldK54gbySW%2BzJAm%2FlvQX6aFcMUPVf2t56dP5aRtm6OujUeKZPBeXvH%2BU411utporabruFAJfLJI4lok6oMXxdyXVi%2BGpW6Qcd0x7GM%2FtFQRuif7Y%2BchDwnwc%2BC0wWRMH2%2FaBD7O3MIH51Rea8D5jcBb5l0p9GodODSjV8MzCw3yTzwtUWaal%2FqnUUyHs%2FPLL3WQ%2BXu%2FID12P%2BN&X-Amz-Signature=af9fb0488bd590825be789fe9811ab0fd475160c74d22705b5b3665c9866aba4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJEVQ3JY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCICXhzjJig4azHD487tamP82qiTyczjbTzUkUUAmZGFyTAiB4KOrCwRQVW0q9AUbMxNbEaV0H8e0z3cehCFnE7nPT3ir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMMJ%2F74H8fkRQSfLxJKtwDGJRqZ5x%2B6HxGLBQ3SYALW6kzYfcF41ncqBzuqWM6IsLXUH7ji6gcTtE90k3RvRloIDu2FkCNn%2Fbi4SVE8TMc3iEtYK3DCTBx9Li5q4XbI1ey%2BZmrtLDq5vN5ZmCBvuzTk0BnWDJY21R06rhFEhrYXpj26UCAvwZxT9B1jlqMosffDXR2Z5OLjwYmW1J3nsxL3CNrxChGrHj2fpSDYOLggnhq4VfCvk8fVPLMuKhlk8hCK%2FYaeJ9%2BU270JZ2mcrRToZPRexoNviE6leSEJUZ4XB0ikxMBP9DP8eagk%2FnNgc2Lfe08oYK6SRKZ76tikLww%2B46CyQPh%2BvBSwymR8%2Ff583IxncxlkcS9MhQXEeK4051AB0fhFcFRSdxBvNbJnt1XqLxGBUkjvei4Yk9K5fzcJy7UUsIqkiPF4CXD9uauzsW%2BHFloSqZEJfhLJih5hVn4a8Kkrg36RyTsbU4913NtR%2B%2FfMxd9DU2SLrNXvQrV8ZBSQxo1IJbJ3o0%2BbbbKvfLglAi3LjeAlIfKd%2B3MVIsqlNxIFFH1etJMD0T751qKg3AlrzqjvFm1kjjE4bd0aLFlGz6t%2BndyDe55xq%2Fzj7WExhlV5orBtCcCCWqU0pkz5Jv1iPre7cJ0EeekTogwyIXszQY6pgGClejU8W0UbbeTCAyy40P3ymdW7R3iQou%2BxFSdMktV2KNgPTVQVp3jm8uNKdA68vw%2Fmjqvg0rkaHz1m1N5Lz2HWiSQ3IvkxTfkHQlIvCScTgQeu%2FZh2i5R5aVhFg9z2fJUL5yJpsMqyVNx3JgMSvCsaHRjXxJ6dWHgFy3ItFax%2Fspqi8fJ5anqZIxHBlYv%2BSa4jIlsGQsjX%2FR%2FNwX1jiK4gP8jzWLY&X-Amz-Signature=8ad0ee77c537995a0f4638814c13090175f278c5bdb39672de569daf025b8d4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJEVQ3JY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCICXhzjJig4azHD487tamP82qiTyczjbTzUkUUAmZGFyTAiB4KOrCwRQVW0q9AUbMxNbEaV0H8e0z3cehCFnE7nPT3ir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMMJ%2F74H8fkRQSfLxJKtwDGJRqZ5x%2B6HxGLBQ3SYALW6kzYfcF41ncqBzuqWM6IsLXUH7ji6gcTtE90k3RvRloIDu2FkCNn%2Fbi4SVE8TMc3iEtYK3DCTBx9Li5q4XbI1ey%2BZmrtLDq5vN5ZmCBvuzTk0BnWDJY21R06rhFEhrYXpj26UCAvwZxT9B1jlqMosffDXR2Z5OLjwYmW1J3nsxL3CNrxChGrHj2fpSDYOLggnhq4VfCvk8fVPLMuKhlk8hCK%2FYaeJ9%2BU270JZ2mcrRToZPRexoNviE6leSEJUZ4XB0ikxMBP9DP8eagk%2FnNgc2Lfe08oYK6SRKZ76tikLww%2B46CyQPh%2BvBSwymR8%2Ff583IxncxlkcS9MhQXEeK4051AB0fhFcFRSdxBvNbJnt1XqLxGBUkjvei4Yk9K5fzcJy7UUsIqkiPF4CXD9uauzsW%2BHFloSqZEJfhLJih5hVn4a8Kkrg36RyTsbU4913NtR%2B%2FfMxd9DU2SLrNXvQrV8ZBSQxo1IJbJ3o0%2BbbbKvfLglAi3LjeAlIfKd%2B3MVIsqlNxIFFH1etJMD0T751qKg3AlrzqjvFm1kjjE4bd0aLFlGz6t%2BndyDe55xq%2Fzj7WExhlV5orBtCcCCWqU0pkz5Jv1iPre7cJ0EeekTogwyIXszQY6pgGClejU8W0UbbeTCAyy40P3ymdW7R3iQou%2BxFSdMktV2KNgPTVQVp3jm8uNKdA68vw%2Fmjqvg0rkaHz1m1N5Lz2HWiSQ3IvkxTfkHQlIvCScTgQeu%2FZh2i5R5aVhFg9z2fJUL5yJpsMqyVNx3JgMSvCsaHRjXxJ6dWHgFy3ItFax%2Fspqi8fJ5anqZIxHBlYv%2BSa4jIlsGQsjX%2FR%2FNwX1jiK4gP8jzWLY&X-Amz-Signature=8ad0ee77c537995a0f4638814c13090175f278c5bdb39672de569daf025b8d4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466552X46ET%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T202219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCBqSzjkgulCtePS%2FDnENVKBGEDFwC4QIv%2ByNGOrk7FngIhALVoatFOQH%2BFdjf9jg%2BJRMqQj4b9Nmf%2Fora6acXbQnZQKv8DCA0QABoMNjM3NDIzMTgzODA1Igw0PiznGNL1cym8EZoq3AM726Lw5nVxjT2yFUzK6%2FoH3oXWWpr6G%2F01kphEv2K35tg26vwdJg7ZiNbCaEGdZwZEM0MndCAXe2xCV0rFA%2Bi6rO7meS%2F02Mj5KILqPQqtuN%2F6nDIptSAz36085QAxZsNTKWSGtBBHKmjIeEd%2FMxjQM6%2FzNcrWbjfcmvlGeQGimR3M1oZRkQXeVYpw94nKY03cWdkucWn4w3HyRmWpYiC5y7PNzuLi9%2FSEjktQ9%2FawDO7%2F%2BYUw6TrDtbTmi32yMzxXtxUww7sLZ1OvkFHcDDU2%2F5%2FoozASKAO3TMipZncBvhltcdQIn0Gz%2FUuuFeHZT0x1Hg1l8s0TLEDIpJmf1NUg1doL1%2F5xc7BNEUW2zaVDvRb%2F7GkP9FpuEfXBNPxECSnplqoBtuYZptMWogpBXcwMraT6LdnF1N8AHWH5C2wHN4Iu7qgKDEpbZUdAPU16XsQ%2FU%2B1RKEI%2BXKRQ634e9bzDogO1l9Q9inB%2BOPydS%2FeYBpMomjQYnr9LN1mm8GUeJvc%2BM2inkzSZMa96bC4ZoTjMOPzM7Ek%2FkB3U8LE48mGDLEWdVLav4K48e5Lf7gqG6auexA8PZmvmeC%2FjrlfMvs%2B5ji8zIkMtXnfR5GiqZLefcLYWCvMj79DPUth0UTCHhuzNBjqkAexqSfp0NY0GBTQEIKldfPeH3ZU4Y10HY74nnoUN%2B5q6ahIDMnVa%2BM6b03m3bxXwsJp8zcSVv1goC4KCVkXVGMd2MydRhq3Ww9WlajCF7hO6t%2BP6Vtg9WdumwoXK48ndzvLzq1uq5X5l5Ss3F4lJQeSwQ%2Bwj2it7I0mcwmP0sUQA1X57eaVeFAIycPcTXhyp%2F%2B96NJwIg9VSAFvTV5qf%2B9r15TUH&X-Amz-Signature=77dda8290a83af2b6c45b2f3b5ba3dd40f3bb19cbbf1046d36840d24fc6c4d78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

