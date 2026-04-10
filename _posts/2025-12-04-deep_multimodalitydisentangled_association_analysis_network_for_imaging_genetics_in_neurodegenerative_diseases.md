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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJPF5JIQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDMMZCfFrCNr202NZmCxwKJvEJPAwao6vFRDLGXmp%2BQVgIgbuP73LhWQqwvv%2FRW8PUTLC8KC4nN4mLiu1f%2BOg21ZG0q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDIJaGyERmoPlqI0S7CrcAwd8aVwGLRZKfenmnZTsfh%2FwcbPNcXDGvHekCQjJ%2Bq6GJDoqxI1TQPJzkLbfelCfSa2w11mgyWMMMQqGQOB%2FZY2g%2FlKV9FrZrNt9cLoVicFa2gEUDL%2FdPm9%2FQzhFqyW9JNMVlqal5UvilKloWXywMZEtEPPaNwWKqSW54fsX4PxT0q%2BKLK%2F6KoeJb38Bf6mYw5byriBlLh50J97irXT67VBImjG6GcvMt0ueXUn7ML0lODMKHfV4UwZEuBFcckDfP0bfJ6CL2EKAvanmC5LHwi5e%2FaZp2G4SEF0i5KH9bLJO%2BEin8d2VqeTR%2BrtNbtNSnitPvLlAdff2cF3zgan8AWudbHUEc4gEYTabLaTEfgpASfLnm3YulGKLs%2B7q0ZiwncajMyOn7djUHC%2BWgewYyDGWC3zCjNRH5qKb2Cx7nrUF7s38jthtwFvfF8BvxuzXqC5GXYiRQ2hibx2UxlUB4W4GpriT0lMrZzAhk6JMDKw5HeItywCY11Frpq0xEhxhbZKXe1hF%2FsTXD%2BReUDbTnLCGlWkn6N2%2Bjj6m0nL0d6mfX23XniFBiQHVb9CQe%2FzWmWDfNZ0VWWqB9nhgle9JVel7V9NUagqG6qxlQiQGFRR4N1gU%2B8TS57Rsf9ZMMOiY4s4GOqUB84SXH1SRa2CxgJQIFzMm%2BPbOB%2BGyqI87dgoijdJG4uSmTAhPZKyxJ8EMsa0u6Ox73ICUYLeDR2ukWEGNwk8Ir5bhpao4PO3WVWyt%2BzLaA00PJlT1Op%2FfTKsEMgwQDB%2F4OvG31J1vT6%2FMP9w1CWre3O280Tl%2F7MFxpsogiKTEeDMjk88YCfFqjhh1x5TV7MWXJKWjXfor98j9s6nzpVxkl%2F1iCZGw&X-Amz-Signature=e0fca1b65e1c52215cf313bee731f88f956192ed080c34dc8956fe37f1e64114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJPF5JIQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDMMZCfFrCNr202NZmCxwKJvEJPAwao6vFRDLGXmp%2BQVgIgbuP73LhWQqwvv%2FRW8PUTLC8KC4nN4mLiu1f%2BOg21ZG0q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDIJaGyERmoPlqI0S7CrcAwd8aVwGLRZKfenmnZTsfh%2FwcbPNcXDGvHekCQjJ%2Bq6GJDoqxI1TQPJzkLbfelCfSa2w11mgyWMMMQqGQOB%2FZY2g%2FlKV9FrZrNt9cLoVicFa2gEUDL%2FdPm9%2FQzhFqyW9JNMVlqal5UvilKloWXywMZEtEPPaNwWKqSW54fsX4PxT0q%2BKLK%2F6KoeJb38Bf6mYw5byriBlLh50J97irXT67VBImjG6GcvMt0ueXUn7ML0lODMKHfV4UwZEuBFcckDfP0bfJ6CL2EKAvanmC5LHwi5e%2FaZp2G4SEF0i5KH9bLJO%2BEin8d2VqeTR%2BrtNbtNSnitPvLlAdff2cF3zgan8AWudbHUEc4gEYTabLaTEfgpASfLnm3YulGKLs%2B7q0ZiwncajMyOn7djUHC%2BWgewYyDGWC3zCjNRH5qKb2Cx7nrUF7s38jthtwFvfF8BvxuzXqC5GXYiRQ2hibx2UxlUB4W4GpriT0lMrZzAhk6JMDKw5HeItywCY11Frpq0xEhxhbZKXe1hF%2FsTXD%2BReUDbTnLCGlWkn6N2%2Bjj6m0nL0d6mfX23XniFBiQHVb9CQe%2FzWmWDfNZ0VWWqB9nhgle9JVel7V9NUagqG6qxlQiQGFRR4N1gU%2B8TS57Rsf9ZMMOiY4s4GOqUB84SXH1SRa2CxgJQIFzMm%2BPbOB%2BGyqI87dgoijdJG4uSmTAhPZKyxJ8EMsa0u6Ox73ICUYLeDR2ukWEGNwk8Ir5bhpao4PO3WVWyt%2BzLaA00PJlT1Op%2FfTKsEMgwQDB%2F4OvG31J1vT6%2FMP9w1CWre3O280Tl%2F7MFxpsogiKTEeDMjk88YCfFqjhh1x5TV7MWXJKWjXfor98j9s6nzpVxkl%2F1iCZGw&X-Amz-Signature=e0fca1b65e1c52215cf313bee731f88f956192ed080c34dc8956fe37f1e64114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663LYZW3P%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDyNtu823CcKBeaJdCoBunxOYhiKQiDLHl1IbOlUXyRZQIhANne6u7GCOw7BbKoq1K9CovMmBZUggy2aolayDWSROuKKv8DCCcQABoMNjM3NDIzMTgzODA1IgxnbKB%2FKiQwHT8Q0Akq3AO16MQ%2Bio8itbjtVSVrgEVzPjlBz5dWdAWHTbptZJRyiQ3fxAqY%2F%2FbsiFYIl7BX%2F%2B87nNWNWrvlH7%2F%2FYxiNrFUYk%2BNi3jRMIzzE%2BKG%2F%2B4NIk5oj8hvQ6rsV%2BrTXCV7K5V1Aw8IrPJVFHzJyxrlU%2BFpLX3nyOL%2BfFSKLBdwbOJ%2BemE2vH6MM3KyWxsa66tkA3Ia0R2%2BVwI%2FJL16Bvb%2F1YPZxPCOSHp1%2FQ0RMlguqOUDxGWKQfiiHHmu6v04VtFHyg4raytYedbw6WUjbr4hFe%2BUT2QqNjI%2BsZQ92tNd90oro7TTfl0dRELXJv3I6bMNI%2BeTsL22qr%2Fc1AZNhjimLL0qnp8JrkxcsTxJAPmXh9IC6cs0a8n%2FgPfDO8DisKw5oQDEhy%2FPpyflZeRAMaFn8MXotmgCf34aOi1VDrYniL6OCwp8QRtt8dEC0pu6uFQvThOLjrcUIFHmJGlHCto5Ab%2BMYhWH560f8gitnPj7qRfAWBq56oDIh%2FKt2AONl7tBVKxNvufuKSeYDJOBs%2BUo4D7OqSdZ%2BcdQrHrMDaF7RLsQzOgewIa8WfNVptVpQwmSGMHiaj6wlrlSG1vdQ0I584svt1GmfD8%2FvFtovuGu7nW4uDi7LRG2ktWXku8UIxjDzmOLOBjqkATuSmYMdQOMD4n2GOFTA4SYs09jxjDUxDi4kzUuXtz7awwIWl0yh4gaMa8rpElf0Fyx2dzS6ro1QWkCjHdzQVZGEXwNZZ1ZsIkHtoGUVS%2B7qcEgaENxs%2BJc3hSRnyQipxEapuCX9KnVO25ItHI%2Fw0WauSpRz6sgQGHdE7W73oI8gQfUn%2FLg3RQFBQy6QqO%2Bl9eQypexkL6QWdavkTLLv%2FQiuoS22&X-Amz-Signature=9f84eed465d436fe06a201d8bdf4704ddbfca3a6fbf848da83c581926bd03843&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZJGZSNW%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDu%2BnXLSpIOhpPOZ%2F739m2cLMx8JCmrHWmZeOjb%2F%2FHmdQIgPW8%2FGyUMB%2F2n0dG1v%2FFnOfRLOHbTgkO0Znm7Rv4oPV4q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDLzz6egia8vCdBXNPircA8j2vZ8U%2Fbgez4toyLwT0DdFTjAfmeV60GmiLV74Z53AewVYYgn1NWSGHRtvoSwQWE1pFiqD47reSj9IK7vV%2FiPp6FeL0I%2B5GnXddqT1O3Y2MPi0ZDJPm2YdvBnuDgSYjv%2BHx1FnDAyAPFkP3DxrJxRgx0ejoE%2F%2F2LVY%2B4%2B6HVxNNbv8N7a1oAVMDo4DP4tGvzEvLURZWqU7WjZPD8leQ6MplOeHIQM%2B71XinBBI%2FIP%2FXSJ5YYsPwCXL7ZZOsQw9Z1Z8yqiomJ4DbXoYBUuNSHfZ%2BzESVFQIsbBIYXfp%2Fa9EuXj3ytHmp8%2FwA%2FGdmUz09fyQt34STdhBcPIxU4ca9b0malEBjxRQUAGY7oK2zlj9rsfgF75kPxazrOwNXYG788LLALaWQ1HjGUcD3MlmDEE%2BqlseLtfKK6lmYuHBImKla3%2B0U2ImcK7FhoCfZjTFUyMdRvaAq8gCDC8d%2BtsWdzuuIIQLIKgbVGc5039ymvfCZaZ%2B7xFWlLf2%2FETCMXqTX38rpSj3gM5gZujUp%2FxYyEcu3r6BKv2LTbLTufeX8YDjPkDnse6sGSSBRUIkNgJxztrpTBX9H1SnG9XB6%2F63y7vCxbIb97sxvMMSKMsfuDVop3sIiY9%2FtaVaUe9IMLSZ4s4GOqUB0djDTGTLO5sIVRITUPrrInG1vOD6%2FmTvQLNsqUpzZirvMiJ1xyy1h%2FEp0G38UGN92d2f2abx%2FPE%2F3vlz0PKp%2FT1qVc2SoMkYllMYyA5Low3TiBIyufFKPDzV4Z80LppuXLbr4ySq%2F4Dm9OHBr08CrCrACXgBpthzCazSrflHaQBHAzrvH6v2XdKnXA6Mm%2BaIsXFN%2BYNczCPar7EoLC9%2Fco%2F7rf0o&X-Amz-Signature=7a20d12976d6bbc690fb837a61e20f6304beb036b44682f717a360e0a91dab79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZJGZSNW%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDu%2BnXLSpIOhpPOZ%2F739m2cLMx8JCmrHWmZeOjb%2F%2FHmdQIgPW8%2FGyUMB%2F2n0dG1v%2FFnOfRLOHbTgkO0Znm7Rv4oPV4q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDLzz6egia8vCdBXNPircA8j2vZ8U%2Fbgez4toyLwT0DdFTjAfmeV60GmiLV74Z53AewVYYgn1NWSGHRtvoSwQWE1pFiqD47reSj9IK7vV%2FiPp6FeL0I%2B5GnXddqT1O3Y2MPi0ZDJPm2YdvBnuDgSYjv%2BHx1FnDAyAPFkP3DxrJxRgx0ejoE%2F%2F2LVY%2B4%2B6HVxNNbv8N7a1oAVMDo4DP4tGvzEvLURZWqU7WjZPD8leQ6MplOeHIQM%2B71XinBBI%2FIP%2FXSJ5YYsPwCXL7ZZOsQw9Z1Z8yqiomJ4DbXoYBUuNSHfZ%2BzESVFQIsbBIYXfp%2Fa9EuXj3ytHmp8%2FwA%2FGdmUz09fyQt34STdhBcPIxU4ca9b0malEBjxRQUAGY7oK2zlj9rsfgF75kPxazrOwNXYG788LLALaWQ1HjGUcD3MlmDEE%2BqlseLtfKK6lmYuHBImKla3%2B0U2ImcK7FhoCfZjTFUyMdRvaAq8gCDC8d%2BtsWdzuuIIQLIKgbVGc5039ymvfCZaZ%2B7xFWlLf2%2FETCMXqTX38rpSj3gM5gZujUp%2FxYyEcu3r6BKv2LTbLTufeX8YDjPkDnse6sGSSBRUIkNgJxztrpTBX9H1SnG9XB6%2F63y7vCxbIb97sxvMMSKMsfuDVop3sIiY9%2FtaVaUe9IMLSZ4s4GOqUB0djDTGTLO5sIVRITUPrrInG1vOD6%2FmTvQLNsqUpzZirvMiJ1xyy1h%2FEp0G38UGN92d2f2abx%2FPE%2F3vlz0PKp%2FT1qVc2SoMkYllMYyA5Low3TiBIyufFKPDzV4Z80LppuXLbr4ySq%2F4Dm9OHBr08CrCrACXgBpthzCazSrflHaQBHAzrvH6v2XdKnXA6Mm%2BaIsXFN%2BYNczCPar7EoLC9%2Fco%2F7rf0o&X-Amz-Signature=348c6a8c97af5676ce8c76b3afbb21368e7152a243b920af03bf4a581cc95618&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFYROXOY%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDVaNcoEMyfC8xDnjhwJYxoBkL5RTBg%2FjOM0CW2oCtVUgIhAJMgUPtKO3oKVdY%2FsyWJA4%2BCcXFfsPfhYNmExvNCPxIoKv8DCCcQABoMNjM3NDIzMTgzODA1Igy3kXmh2EWRQVjMIr0q3AOF0Vq2KsmHaNb34r4t01D0C0c3dk9Rw2ZabRF0RjT79JxezTnTt9%2FWqEqx0vb%2FQVSoCmZuO%2BAiRMKcR20%2Bw4XrRb1ceOMXbPKvBgejRGx4g6McKDLu%2Fx4s3feOUDdKxhlfziEwLnoax2%2BzBAtFjFp4xEX7%2FAgsOvNNxsuirYjG1n4xQe0kiNxYAfIrgoMtdK7OD1xIrMGgBRd9UTwXKXLQ4hLLexPW6EpRL%2F%2BuZgruMHueicUucBNShPPYP0Gd3%2F0FBrwr9GE4AR11JVwyJQvvuvw6JoYs2RjtQRAdfTGiSrGA%2FryrC%2B5yVfJwxuhZ9E9b%2BAT1NwkgIgch9jDQh5G0L4JFl4OPMeEEV4DW4EPTUt%2FP0AZvwaS8s0OnZs7nn3bYdXccRdb9LbHfktsU83MLwD9n4L%2F9BW9ioiEpdKpoFMt%2FNLb%2Fjos9tIMPUPx1n27co%2BV6icSsyGM0vOwJXs544fBFq1vPs1JMLrCwAQ0Si8QFubufrqqR6BKLBMWSfaqbmqUwbFhdKD9TdQjiLwwOMWl0%2FHcVStAW6Lb2mUBA0paqwF6B9XdELtPvrQ%2Bvd%2BrwjMZk7Y%2Feh38gvrh1FcNqwenzeFVAsJFwGmjcaQh98EkeSlJh%2Fb6CmkAH7DCfmeLOBjqkAS9sEkMb84JylWREGZbKMAcpXpq%2FN%2BXbf3IyQG6zNOQJYNuRhPnoVRBB9wPQZQyLftzRrO1Hxqh%2FVThrTpr3p3sAAX8gmtigtrnj5CK1tdmlt00tIbptzz55AT8Ht4yIED2FDyN%2Fyuk3cKSqQN2BdAg4PphE0dg0DTCXCFqW0ce3tjf9ggRrBYpTtsaHQdM07zCBuPN%2BqPLny4UcVHZMEMn%2BFJhF&X-Amz-Signature=d23d04cc90fa2bf66957826e3d19d93cfae4987406c23498ea6e7c0eb2061297&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDON743L%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQC61rhhrj3oCdGSTZPZa8iJ1STLK6ou73DzcY2ytl9HnQIhANa3vogPwS7FkPIf5%2FR9i7cPf3vEr9uXWKUino8OePk8Kv8DCCcQABoMNjM3NDIzMTgzODA1Igy4ZYuspigEbI73dmoq3ANJ1YEGL6FCy%2BudnOV%2F%2BItvdV5LgfEV9nV%2Fe7aR6rXWh6ats7%2BbAdpstpnJxAklbq7ta8BjlDu17LmX%2BBibTH4BCJ8jd8GofqzuP6hu5qmv3WFzHt0LlgyIJPIqfCI4tcL3LQDVKx2OvIRBXYd8bKpCztjM97jxhG0IrmZbU%2B0QmnxZMB%2BuQll5ysQ8emdw66Na8IrmKSHZ5yQIHKq6RI%2FAkLc03L6og8AEz8zDeNnhMwXkHYv%2FpvzUmIpX5chas9WPO5WcLljlE2k7GP6Vrh74h9qiB2G%2F9vEJ99vdDaGZAZSxSoHLTUtW94qyoI44%2FjJvccdn48bF%2FT7%2FCTaZxFnf7yecRdhQIhW4e9LkqBkFGVxRyXopaGfmzzic3HpPs%2FFtDYDZbWLxNs7q8Ga27Wv6W5t4aB3M6JDAJLJUJgQzER7Pd7P4BfQlsbUQtistEQSXlaYb6nDEKTQ0eVdSgtb8MHP1NZvpj56AB16NOvTs4qaYAqk9BeqYzq22yG%2BwkHAIcqMjRwXUQesBaB0byNkxg91wIyPlUhkWgr6Au2b3qEM5ApbIhP0hYFGogt2TqPXgGutJdjhbncn3lorsPp2J0vd9%2FxdJ0lA7AXPrG6TrV9uSAqCdGCWvRZ0qvDDVmuLOBjqkAbGRLd%2BHuFszonV750s%2BSQphSGd1jdaa09GbEOV45xn%2F1xuVW39ce%2FbDVvJUSEbtlFif37chZCCCnxJ1W9drOyYKNtqBWIcn4n5xKZsfPysGqKhPdBbpCFQlVdLV8m9XRV5OLVm8%2F6c80pgoyjmtPPuBH4sCr7piJunrbo6m2lusDTIvPQ%2BoY0zypKvtjIKImkr3K1%2FpHM%2B7KGtubjGwpb47EmZh&X-Amz-Signature=71617c445c504fcf8eec9ef0b9ccfc9ec6d1c1b62f050981ba35dd3ba2ff07c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZVGB725%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDtK4W9O3bCLUgsKDQF5JEQPhRBk%2B6PFv6OAkePH5e%2BEgIgLbFthUiiDgPZElqDJxgxPBCZuTQxKWsdBX3HOd9jjLUq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDDI0ltgeLa5CthU0iCrcAxnuzB32uTKeagSvZ3hTVFxODCmz%2Fl9Zo9aNXHnN1zIyDUu%2BhJQnvHxnkIxyqgva%2FSxfCIlGnu%2BSJkkCabYuVCH%2BAbIPiujDxCGxSPXWmjxcOL5TeESRjgMN0xssCOxHL5q0XohiwsuKluqkZcYiViouKLq5zFcdogsFPYAX3M44KBqwQozw%2Fm27Y0w4Y05R9UhOF2tbZVzEfVo%2BSqaV7UbEJyeDWv5heLq7JzuqWiwFHxs3C23aknAm8fzlc9TumVBAQ9jJh%2F%2BZqpDmndzO6STSKosF9otdCbE2ftyy%2B7mdBIIJCsVLs8lteLTjjAqOhKu2qAFQC828xk4R9tdVsd765EDeOvrcToQYwLu6CJDtTRXg5w5mHs2svdjP9LGbElE4JAMhkhKfWXJTNFuZmWhEjNq6XMzcYSD62tvaeNNIuLHZu9B0PXLAQL8cyg5oioxxTrPvYkhWcod4WVpdlZtphCh1ExD2Kic58MHAKRj7ayzGP5gSym6K7BN5AC94of1JIGPGr5rmik9VGyxhJ8pp0aH2aAqgfm0O2Gn4eYmPuTBZyNe%2BzBYvk4o6uJ9YbvlzVp0lXIOE17sOgh9htVhuBg1C5pKNc1EdGDQWNCygHXSoSjkWrTBduL2lMLuY4s4GOqUBz8IqQU9nMOZqFOz45C9sZ72WLMPMKyFWiBpovIYuaUeWym8qFgokXVbde9xrneu7E%2FeMVeLsObYSvXs2lybDEbfcdc9Iauj2mAXuwaU2z9O7UH1B2iZpj8s9mIREN3c8Q4HYVic%2FMH7P6e0XBjWz8gPhFeVC2r2VoUOqWw32pfMy8bID%2BhzNFteLlr1%2FKRM4wczi%2FuBnXLDPAy9GpqI1Z7%2Bt92DD&X-Amz-Signature=4b9febba1657d5541675a11b3aad97b8a02e8ba2897dc831ffeaf540fb8535e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MJPDQR7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIFYrknx15%2FkAoIoR3rrKWKk45iINIC%2FZH958ecB%2BRKplAiEA4AWDM%2Fj0kbyc3IU9sntO3HciuG6%2BpOCZrl1KUZussMAq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDPDbkio%2Ffm9Cl%2FMCJircAyK8TRltzOYWor3jzyTauU85XoyElZjeyHcD63bAQoelnxXuimJLnV7dpnFAm56NbNx2a5zvzK7id0d6ePFcYVDqC7ij0GLB3qygKIuLaq38xD2aw%2FeQDfn2jlnVybyqNSvlhSllDEvVGN9A9WPVxsG%2FFQ7HAl3cPBOeCe0%2BdrT5ELkib8jmTWnVs3P15PY8UBTHromK82hnzbKXm%2Bf05zhsp2fd%2BkhVf%2Buhz160aIv%2BzJxSsKXQTlHkuMfK7dsHQLKZu4LMIbPGlvGCxHqWymbvLyMYtfItnIXEoRYWyv7WON0qQzNX4TY4FwmQc7cKuYraUH05rIsx%2F4KXjfds1%2BS7gIwI5xB1EhAjXFusaFxDVGYWXXrljMirnQlM5Px8bb6mb%2B3sdA2NL%2FOD6VjipmC0tnTAJ%2B5ZKkeqv7J5cm53KXawNt1iEowicSTeCW44B6CIpvNahbHSFyVcQz%2BIT62CbEwaoXhGWGChaqCKjAhD2iGkWyODoWYP6zPjJUCXXkcCrqgfntWPOe4%2BEpHxmRRmU6Dvp%2B3hVaN82Rp8%2F8DOHHFbAD5q65pIiTFhwiV84DZ0EdIAq4TujOYd3h6yQ%2BOYvsGia8%2Fe8joxE05D2ZOGcEbMMGIuMIU%2F23AnMLuY4s4GOqUBsOOaU3SM65LElHH7dW1xsIRl2e920q3bZZ1eKyGlOPPOB4nzhJCLZIrOCB%2FCgmTP%2BizORsZDd2MszKMQZXac%2F0WsdN3kITrysBYj%2FOZ%2FMKnaTuTOm28VQihLXMB8CvR1gMXBS0LOTtMyRgikPpIvivMaT9eiKzxgdWv1q%2B5rU8nK2zaSeMez85W2o36cOCDSa8Zj71YN1lIhaQF%2F0tEcpVZuRZ%2FX&X-Amz-Signature=8a7b15bbb394155a79a889f15509523ee6e7f8d08f4dadf0a368e5b86b62f8ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MJPDQR7%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIFYrknx15%2FkAoIoR3rrKWKk45iINIC%2FZH958ecB%2BRKplAiEA4AWDM%2Fj0kbyc3IU9sntO3HciuG6%2BpOCZrl1KUZussMAq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDPDbkio%2Ffm9Cl%2FMCJircAyK8TRltzOYWor3jzyTauU85XoyElZjeyHcD63bAQoelnxXuimJLnV7dpnFAm56NbNx2a5zvzK7id0d6ePFcYVDqC7ij0GLB3qygKIuLaq38xD2aw%2FeQDfn2jlnVybyqNSvlhSllDEvVGN9A9WPVxsG%2FFQ7HAl3cPBOeCe0%2BdrT5ELkib8jmTWnVs3P15PY8UBTHromK82hnzbKXm%2Bf05zhsp2fd%2BkhVf%2Buhz160aIv%2BzJxSsKXQTlHkuMfK7dsHQLKZu4LMIbPGlvGCxHqWymbvLyMYtfItnIXEoRYWyv7WON0qQzNX4TY4FwmQc7cKuYraUH05rIsx%2F4KXjfds1%2BS7gIwI5xB1EhAjXFusaFxDVGYWXXrljMirnQlM5Px8bb6mb%2B3sdA2NL%2FOD6VjipmC0tnTAJ%2B5ZKkeqv7J5cm53KXawNt1iEowicSTeCW44B6CIpvNahbHSFyVcQz%2BIT62CbEwaoXhGWGChaqCKjAhD2iGkWyODoWYP6zPjJUCXXkcCrqgfntWPOe4%2BEpHxmRRmU6Dvp%2B3hVaN82Rp8%2F8DOHHFbAD5q65pIiTFhwiV84DZ0EdIAq4TujOYd3h6yQ%2BOYvsGia8%2Fe8joxE05D2ZOGcEbMMGIuMIU%2F23AnMLuY4s4GOqUBsOOaU3SM65LElHH7dW1xsIRl2e920q3bZZ1eKyGlOPPOB4nzhJCLZIrOCB%2FCgmTP%2BizORsZDd2MszKMQZXac%2F0WsdN3kITrysBYj%2FOZ%2FMKnaTuTOm28VQihLXMB8CvR1gMXBS0LOTtMyRgikPpIvivMaT9eiKzxgdWv1q%2B5rU8nK2zaSeMez85W2o36cOCDSa8Zj71YN1lIhaQF%2F0tEcpVZuRZ%2FX&X-Amz-Signature=edce7e1c5123496a2e9a2cbefa15a6fffc755ea865e0a14133981e208b0b3a17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZSEW3X4%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDm3vQRZV6%2B3de%2FCvHD%2Fed0CKYqOkt84O21B8IWm7UPQgIhAKr1iwne5cuglsAWP8rHvyd3QSVO1iOrbLXwh6%2BwPhGsKv8DCCcQABoMNjM3NDIzMTgzODA1IgxBL215Kx2wfQZzgeUq3ANe8QyuexEhhP9t4lbjSksL3yIeH7jX%2Bu7yDQAt%2FpLR0WkX7HpQDVXQCL3DyQP3ksxaxzbHYki0FcQCF2ffzH%2FPbIZqv2T1Ti8KTmrpikIwray36gxF6jaWSSvTGbWNONxxo8n50WhYU5Z0gwGS9I3kV8Ey9fTK%2FTub9akb1b9U%2BA61Kn2vUNC9tAc%2BCPlqnljdNyoacsX5qQQJX4YaAXqBxTIgMh82lSnZ%2Fy97JgFaSNaFudZRxX5FcKKH2DwRFjqt%2BTTb1WWUVUbeXg%2FCUtqk6%2FpOxTL7BNYEX9azo2KTu7KqMj%2B7oiQ7fZ2DL%2FCQ%2BsAa4Droon9vRJX0NELn3BYen5VVs8%2FOApUUwPmKRTQ%2FcEtjMIduhr3qRn0WNIuE97PTTIEavneNJDcQU0JhO6KW%2BRjKdwx7kByay7JfTfx0Jd366I1wquD47SaQkjrYS9yfQdNZhWrXr5ZLkg9bo5Yrg7R%2BvQATSKQvwh2UP0kz988roWtrKz0JSV4S%2Bi%2Fnot%2B5EvyLYFmX%2BIh3r%2B6gxwkzo9uY21OrcOfMYCZ%2BOejYYv5aMq2dgYV9mY9zQ%2FxG05woco%2FAJv2MGsRRYKic9dY%2B2mLRBzMJeBayqzli2dK2eSiXu22u%2FMUJeTji2DDIm%2BLOBjqkAQxNwPmGmk4rzGQswbcqvxoVSetag3IlRZ4qJhajR21D%2FTC2xe1gkrWJPOrjuXLSF%2BMu9g1Nw%2Fe9u10GfqzI1zVPgvInv%2FJlA6OrXDT7pKOIkZsxl9GsNqSZ4A1HlLVCYZ8HjZBnfmhtHEKXC%2FWgLg6vKQx1XdVZf5%2Bd1%2Bt5jxdpk5jCOzK1upJO9eGIk2fKaGlG6CJu%2FfzPkbeVOLQ3TiaxCF3A&X-Amz-Signature=7f48a3c202597c3691b33452441526a24ea642da46a79d80a8ce3866fea72005&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOXCNZRL%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCICZTgBdPpZAFzKsH93VRSPg0DAxvpzjRvu5lYA1HjrxsAiB4ESSghIEPueoQLiP9%2BfiiM3uZUaQJr%2FJFSb8ZG3lvSir%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMCBNCM4QmielpXHBxKtwDjXweuSrC7%2Fafw3TYMEc%2FlnT2kr6JGTLi57KlYRHCXhLKnhoLE7DfPOyXtzBBlAbk6bOcs4ZXDkKeOFzpQoLCKpkzzomaLzVzI%2Bf4%2FJMjBA0GbITiawAY5lySD7UArWKdmNpnuHG%2FtoTr0%2BuBxNPtPXpkfEHbeboI%2B0dDEv73eygAngnwTrpeyrH7RT8LgNcixwJDxV4Xzers5FM%2F1ar2pkF%2FMeqpS6hWm5zwoNGaXgsoR8GUmykPcA5UEN6YRFhjrbEUnpbEyzbloshzSXnAAK0frkCc3dAX9qoijUv9tMO%2B6%2Fxzr%2FD6p852V%2BZplKzZytrC6%2B9zzXHEjhVBXzIDkhOw7XODdaPJc%2BlLNt8D6lbPCJ1Pepb4aC6CAZvdmiw7hN8dSsJDFRvFYeJbAgcUUoXIyEIyDIZXi6hHfXCAtZAtME2KmDavGpj2WL5V6dkc6KWs5Lo3NiqxrchZCdPMWxdCs%2FVn288fpHCbU938uGA3L2K%2FpBne8z6vAUOz%2BA0qIpJm9nPj6sSKbQAv2HmHOIhDxY4qOzmLe1cA1YfzsimWi30gA4Y4NGiu3OnRUr59lNgmgjb7Rz56XPjAQqMXOD0kpdU1U3opJZHqZL%2Fm5LIVB9kPGIvuIjAap90wzpjizgY6pgHdjmmYX7R2Y8dEF6mNl8fwlRgzytAr1ToeFJZBxTj5Pe0IeBQzbNsa3lBQBrs2lA37sHlQxr4qdMGU7FXBXKDh8%2FCsdaXZxGhx%2FtTpX9r8Ur1RbjF8DV%2FdXd9qhdms2FptqT9MP1wioYVIqpZerdN7rV5Tj7m9VUEPnqtNT1%2F3tBYKxquGmH8JNg0k3Mu2vRGiBVBrdncojCLpKE9Qt3qfxZPY02D5&X-Amz-Signature=ca4338edba3afa642a3fc4b4f17cf1cea30ff44fc75f36d70f4f28534ee4010d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOXCNZRL%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCICZTgBdPpZAFzKsH93VRSPg0DAxvpzjRvu5lYA1HjrxsAiB4ESSghIEPueoQLiP9%2BfiiM3uZUaQJr%2FJFSb8ZG3lvSir%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMCBNCM4QmielpXHBxKtwDjXweuSrC7%2Fafw3TYMEc%2FlnT2kr6JGTLi57KlYRHCXhLKnhoLE7DfPOyXtzBBlAbk6bOcs4ZXDkKeOFzpQoLCKpkzzomaLzVzI%2Bf4%2FJMjBA0GbITiawAY5lySD7UArWKdmNpnuHG%2FtoTr0%2BuBxNPtPXpkfEHbeboI%2B0dDEv73eygAngnwTrpeyrH7RT8LgNcixwJDxV4Xzers5FM%2F1ar2pkF%2FMeqpS6hWm5zwoNGaXgsoR8GUmykPcA5UEN6YRFhjrbEUnpbEyzbloshzSXnAAK0frkCc3dAX9qoijUv9tMO%2B6%2Fxzr%2FD6p852V%2BZplKzZytrC6%2B9zzXHEjhVBXzIDkhOw7XODdaPJc%2BlLNt8D6lbPCJ1Pepb4aC6CAZvdmiw7hN8dSsJDFRvFYeJbAgcUUoXIyEIyDIZXi6hHfXCAtZAtME2KmDavGpj2WL5V6dkc6KWs5Lo3NiqxrchZCdPMWxdCs%2FVn288fpHCbU938uGA3L2K%2FpBne8z6vAUOz%2BA0qIpJm9nPj6sSKbQAv2HmHOIhDxY4qOzmLe1cA1YfzsimWi30gA4Y4NGiu3OnRUr59lNgmgjb7Rz56XPjAQqMXOD0kpdU1U3opJZHqZL%2Fm5LIVB9kPGIvuIjAap90wzpjizgY6pgHdjmmYX7R2Y8dEF6mNl8fwlRgzytAr1ToeFJZBxTj5Pe0IeBQzbNsa3lBQBrs2lA37sHlQxr4qdMGU7FXBXKDh8%2FCsdaXZxGhx%2FtTpX9r8Ur1RbjF8DV%2FdXd9qhdms2FptqT9MP1wioYVIqpZerdN7rV5Tj7m9VUEPnqtNT1%2F3tBYKxquGmH8JNg0k3Mu2vRGiBVBrdncojCLpKE9Qt3qfxZPY02D5&X-Amz-Signature=ca4338edba3afa642a3fc4b4f17cf1cea30ff44fc75f36d70f4f28534ee4010d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663375BD7H%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T062321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQDX%2FulSg0HHIZrdikguYwKW6nSoAVOBk8wPcDEpElJ9qgIgfG%2F9uDSyUj7q9XyeROh3NeTpApLRwwlz2VZ9FEqnHx0q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDD3ZZqCg9QwBbSq3vyrcA04ZbMyXWP%2F0sj3hWeXiTSFutrQsISWycxiooVLTQCQzTcdVqM8rIci05N5m1OD0O1VfotbBW4fdcbUfzpjBQUy40gQ5DdXJ%2F5OsQZ5wKJ9E%2Fg5uEAOzvJMuvK8%2F%2FjW6x3b17ssksTd3znKQ8JLegypZ36cHBxCL%2B12h0%2F2wStf4U%2FgOiqZrTFKzwDs0zS4fDZbXW37jLLJ1YQOFfJDNz19VinpLNRPhGXTTdVJ43Tp7M860XkFEvDa6z0RfUOaeSJzXAXRT6mSu1VoWF3wDLvAiVNBDNNoFhnlRLSYd%2FKbNqrV69HWedBAmTdbjxH2MWzS1JxF%2F70hdZsDrGhIJfizjJDncQYVykqUpAz5qgcDdYBIg4wlegXDe1BLvPEk932ee8beWp1VLAPnbLwJ%2FsgeGVtqb5f4melMgchvWqHj2vdVCZ31CuaPnMPRUEMtnWUG7T5NAS10HyRTl7bgGtf%2BEEnIhu6%2BUE1KSKIgb2bIQlpGOd47JO0ZCTB%2FUOU%2F9ZPoPKuMaxSTpdSnLcVVd0GkAybm8fzT9TbedAEA7MsT7Mv58U%2Forlk4jaI2Z693ELRdCFmH%2FCsQE38KBYUvRWLyId%2FduC0LZRzukUsPb7aXCfmi0soOECbfQxdYVMM%2Bb4s4GOqUBBslP0blGNB%2FKcVRT80AVX9nfPdgycG1Mnt3Gc%2BURenishNtCfw18D1zyqCaOUwu9zsA%2BSQWGSoICzGkvDfgNr5qV%2BhgTST89SLEEWzXXkYxueqympM7t3QSohCHvhRhYq3%2FJLy%2BMRJGYCxz5G%2BUnsca%2BUz31GekLgAHccbxnMBPH3VPemun7O3e78ZRJM8yALxFlUQXGmUWHZa83B8ACWx6IT3xB&X-Amz-Signature=2499f7dcb3f88900240a0a6d4473656cc296744fe65b15c67cd67fa72ffa0628&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

