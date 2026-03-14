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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFVV7BDG%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDsMICzZD8Ra%2F%2By1K4OW7ZE4yuBOzHLn3wx1NmpMEWygAIgWHwGN305k1vgguCnwP0QfqVxpfkotB68ApxDEnratIIqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKBt0Vtsti2h63%2BcYyrcA9i9Xt83ZqbsApkH7BTrNOhJZZVlKxFPf8Xx4YAlyYJfXO%2FKk%2BOqYHMuF9%2FqCPWRNY84mEwxCl%2BeJWK8veehWN2Mbtp%2BZS5JMVFtOM%2BPg6gHLLKnaOuA%2FC%2FZ6ag39a8amJCGQlm48FgvgMZx3y6%2FUVIZezp0RvTOCbY3SsISOtkkzVziYrP9HXgaOyobUld%2F5twKFmbFdrsRNC1TKeOWlD5L%2F9iCaJdXrIE3ZDDs5g1qvttNb2TkEbTIKDRgH4l0UYNVKjBZpcvUc0xZe%2FfcXA88ZXYMvPpaOp9cTNTuZ86iIBkm9m0JORFt9d0VC6xWWEisBQ3u6pwvyxWHT0pqx2Va4SAYX%2Fi523mR9JRxaYgz79N%2BgPnhWfUwWLwK9U5UCA7VNpcPC8zfw9%2F%2BGONsu1HO8%2BrmicuFxNSNcoQz6H4KYbU6XROP5ezcWPabA05WjKkR4s8S%2B94MKAxSOj43xIjgYnJawNDERfAPPZrJuNUa%2BUdRqDrLJk0EaFE6X%2BRe1K75sB1cHsnoLW4WZThoHz6rRnDfkk2ePZ9CEHmSMMKJbbFW7e8RGhsKbndVY0zC5urAXFEqs%2FtH3g40q8NL%2FHQyU6p8F9k%2Fn5neF16YlyZ%2BLzbk%2FrIoKqR3FCBXMPng1c0GOqUBCBetg9xzSsiAjfW0k7SN17shnUiV%2FDKns3lrviHyR0uXpaOIBivFq3DX3K5arimxBmCxiPYQHkMwlq7XkB%2FguunLsY3Q%2BUEXC2naRZQoxfWyfYwSNU2U%2By3zgBP7%2BK1Ag%2FJXIlhmpGspXJrZRE0zs06vNQCWDojy7mG4p78Gvz0XkEdm6Gx1e0lcY%2Bn7Ns0Ta8%2B7sRmR52%2BE%2FV2Tx1%2FYxXf5Va4A&X-Amz-Signature=726e701b570bd9c1fa5b0abec793f50a13adde007aaff1616b65e149809b3f47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFVV7BDG%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDsMICzZD8Ra%2F%2By1K4OW7ZE4yuBOzHLn3wx1NmpMEWygAIgWHwGN305k1vgguCnwP0QfqVxpfkotB68ApxDEnratIIqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKBt0Vtsti2h63%2BcYyrcA9i9Xt83ZqbsApkH7BTrNOhJZZVlKxFPf8Xx4YAlyYJfXO%2FKk%2BOqYHMuF9%2FqCPWRNY84mEwxCl%2BeJWK8veehWN2Mbtp%2BZS5JMVFtOM%2BPg6gHLLKnaOuA%2FC%2FZ6ag39a8amJCGQlm48FgvgMZx3y6%2FUVIZezp0RvTOCbY3SsISOtkkzVziYrP9HXgaOyobUld%2F5twKFmbFdrsRNC1TKeOWlD5L%2F9iCaJdXrIE3ZDDs5g1qvttNb2TkEbTIKDRgH4l0UYNVKjBZpcvUc0xZe%2FfcXA88ZXYMvPpaOp9cTNTuZ86iIBkm9m0JORFt9d0VC6xWWEisBQ3u6pwvyxWHT0pqx2Va4SAYX%2Fi523mR9JRxaYgz79N%2BgPnhWfUwWLwK9U5UCA7VNpcPC8zfw9%2F%2BGONsu1HO8%2BrmicuFxNSNcoQz6H4KYbU6XROP5ezcWPabA05WjKkR4s8S%2B94MKAxSOj43xIjgYnJawNDERfAPPZrJuNUa%2BUdRqDrLJk0EaFE6X%2BRe1K75sB1cHsnoLW4WZThoHz6rRnDfkk2ePZ9CEHmSMMKJbbFW7e8RGhsKbndVY0zC5urAXFEqs%2FtH3g40q8NL%2FHQyU6p8F9k%2Fn5neF16YlyZ%2BLzbk%2FrIoKqR3FCBXMPng1c0GOqUBCBetg9xzSsiAjfW0k7SN17shnUiV%2FDKns3lrviHyR0uXpaOIBivFq3DX3K5arimxBmCxiPYQHkMwlq7XkB%2FguunLsY3Q%2BUEXC2naRZQoxfWyfYwSNU2U%2By3zgBP7%2BK1Ag%2FJXIlhmpGspXJrZRE0zs06vNQCWDojy7mG4p78Gvz0XkEdm6Gx1e0lcY%2Bn7Ns0Ta8%2B7sRmR52%2BE%2FV2Tx1%2FYxXf5Va4A&X-Amz-Signature=726e701b570bd9c1fa5b0abec793f50a13adde007aaff1616b65e149809b3f47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYBVSIG3%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151514Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDVxXBjN9g6wAkCHXRZM%2BcuRqfIQD4QVCrm5cOhe7DzBwIgD4NlrRJhgfq2biJVhw9lnFz8%2FUDB7ySgDh8ADeCBX%2BsqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDp4f43kUwgLpScAxCrcA4mFLZQGh8VUhjOICoe8OSpYeXcqh3CZaTP2GTE0C31j6G2%2BFEA2ulJYsfFWdh4jwoy1jLk2dJ49ipa30jRqyULTpKdq%2BDp2VxNa%2BI%2B8roeQ6hcmQHIV2qJa62I3z1HaPUN3cY7t1Ko5rneCvmXE%2BjpfIYtGaaZs5L8ohpSLuYTf24IBC0rlS8M95MhsW3ZPwtM%2B8FLNOtJlpHP8w0DMM%2BTunSJk4UJ9zt382ojTvkUXsZ9%2B82RbraH6YRJw34cEzISYzf%2FKMX2jUEMftU4qmg4nPg77Bvb%2BZxOcNCm3wDlor9cB7cGfoiS04WY%2FK5HpondeoxRQA2NXpKDdNx%2Fi1phXZyZVHynYXBrV2DaiSr3NNTybwNdQuSw35iOXce7dc%2Bd1FvgdiLbyCBi9sttwbXKHCdPZ3WkReHsIlEIYdgwZcuqrISmy0IGBC5RiDboOVJio2AsOQoLI%2FM4AZ9xMIxl6uFETSvlut83nKmFb7fZw4aSk1p2JjEfUSWoLn0cTPyl9of5j4NR7uodVerZQarCAepFjegrLRs0qZmsfqDKIUc68PRFtL3WvRWVmvm0LcR2qewv2gGgo6AhDuRU0IVxQD2vXdLAiDe9XB00YTqUuU6Uor8waqcRgARn7MKvg1c0GOqUBzNWri6bqt9YuFcaNn88%2ByNQOeZIBQLubgqVVkyO4%2BIl24Lz7B%2Bq4uLuErDKg0x12Vh0mSz4lRJkZ0YtIur9r2MgGCqBF6%2BMeh9CFsMVt3ymw5ejj8Kpp90ccH%2Bp645wGJ%2Fswt%2BmKgyXeNFe8Ud%2BGGIatpP9MIgLIryUz%2F%2BQPwdtmkrF7d8TqJOnfFtpma7aTq79rQZ6Dv74YUrpDmvEu1CmNiN9J&X-Amz-Signature=9df071a9e5c8df9941bc15163358eb8999c96eeed1ac8b01927602ebd83604a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RE3KXXNA%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDrQWMeoOLubGy7Id%2FvefzgeGXxBOsJ61O8jlr8vMnMFAiAy68qUrdScu59vssGqs%2FiUQVuXcV4Mz9t6e%2FwRvkWz5iqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1XAbScpxq3kCy1wwKtwD2CYFM0sZbbwj8jozJiULOQzQ2L9Vsvf8vIV0oiqEs2klaU9JjrmzRMZEi%2F2qa%2BFlae6rUqpvI9SeXHBhwl7JHs8Oc5sWXRNPmc3KuitCWxsBuA81KjBs1%2BJma088Keg9s%2Fhx1YHoyGCYbpVUqkc1e8L0sTc%2BYGk7HjvqaRQ4Z7gF28%2BbWPaC9XgWreGsJzCS2F5qCxeeCu8w4j9tbTXTjJBgPx2vOhgBMzF0NvzaVdgR5s6KppUaDzH8othb3US9rYOUYT%2Bum6E7emazTlRFQ8K%2BP3luokVGrsOnnHibSxcHGSB0nMVAPmZV7UTQnRcRmbvtl%2Bxx5NaIuDJSVs6d28iuCGuztsckxodvuII9vyBhtHPS49wJssZb4%2FlIPuXH6uxd2ZbzxZVDql%2B46r1UN1KcNg8cb3FTBvSGcIC9sUtAPZX96XMis0hdz2e6o2xTyTHtaPTghZ6omWaScp%2FyNVOaFXGWRGUP3Kh7dtfvsvlOlgMv8m4AtGCzDTKMrFdJ0dqwTRXrPBR%2BkJbIybTJEbyzzjDcgxc2al6Ae%2B1aJgSCjqb1INkG1zybOL6l2kvcdujqByt1BQ42j53RNGfOAfvP55cBGBas4TpTjlKIBEyM6kr9SxtmI7L1eeww9%2BDVzQY6pgFtFLBzMVEb6rU2prrqDIzwlIbRgLPCBsEB%2BAUCfmrG9TGofoiPNHEMBWXCzIDTd7FNH9vZ0DeH1oh7gixtBxtl9QblwsPQ2NVCt2Ry83mUUQR6VvxpZ%2F%2BupBX40vZvqxkvNaITTWL0VN4ZXgM7HiL71toJaUXl62QccqbSfNZFAVHdqNo3zvCCaNr7WqP5sgeEacTuMpyiqH4MmnNLbpbfhlvZ9C8G&X-Amz-Signature=504c7c2d55136d8ba80b8ad39696e527daea1308143a82b589121005c51cfb96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RE3KXXNA%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDrQWMeoOLubGy7Id%2FvefzgeGXxBOsJ61O8jlr8vMnMFAiAy68qUrdScu59vssGqs%2FiUQVuXcV4Mz9t6e%2FwRvkWz5iqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1XAbScpxq3kCy1wwKtwD2CYFM0sZbbwj8jozJiULOQzQ2L9Vsvf8vIV0oiqEs2klaU9JjrmzRMZEi%2F2qa%2BFlae6rUqpvI9SeXHBhwl7JHs8Oc5sWXRNPmc3KuitCWxsBuA81KjBs1%2BJma088Keg9s%2Fhx1YHoyGCYbpVUqkc1e8L0sTc%2BYGk7HjvqaRQ4Z7gF28%2BbWPaC9XgWreGsJzCS2F5qCxeeCu8w4j9tbTXTjJBgPx2vOhgBMzF0NvzaVdgR5s6KppUaDzH8othb3US9rYOUYT%2Bum6E7emazTlRFQ8K%2BP3luokVGrsOnnHibSxcHGSB0nMVAPmZV7UTQnRcRmbvtl%2Bxx5NaIuDJSVs6d28iuCGuztsckxodvuII9vyBhtHPS49wJssZb4%2FlIPuXH6uxd2ZbzxZVDql%2B46r1UN1KcNg8cb3FTBvSGcIC9sUtAPZX96XMis0hdz2e6o2xTyTHtaPTghZ6omWaScp%2FyNVOaFXGWRGUP3Kh7dtfvsvlOlgMv8m4AtGCzDTKMrFdJ0dqwTRXrPBR%2BkJbIybTJEbyzzjDcgxc2al6Ae%2B1aJgSCjqb1INkG1zybOL6l2kvcdujqByt1BQ42j53RNGfOAfvP55cBGBas4TpTjlKIBEyM6kr9SxtmI7L1eeww9%2BDVzQY6pgFtFLBzMVEb6rU2prrqDIzwlIbRgLPCBsEB%2BAUCfmrG9TGofoiPNHEMBWXCzIDTd7FNH9vZ0DeH1oh7gixtBxtl9QblwsPQ2NVCt2Ry83mUUQR6VvxpZ%2F%2BupBX40vZvqxkvNaITTWL0VN4ZXgM7HiL71toJaUXl62QccqbSfNZFAVHdqNo3zvCCaNr7WqP5sgeEacTuMpyiqH4MmnNLbpbfhlvZ9C8G&X-Amz-Signature=190848daf8385252787f03225bcdff048b00c62daa9231ee4e0603c701caa811&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672V6VFTN%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDZup%2BjICemjEqd75jfL6xTZXBorCuge5Y2dGmHkHzAQwIhAPxoKRFZWkW1lr%2BBl3G7vTDPkNzCuVOtXRmSdKU6%2B1K9KogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwxOp9nhpVUJZ4TcQoq3AN2Q1xmwXhkD87lwkJRbXtJhEloEG8sPf3CdzWgy8RACJgKI34x3OBBrgvQb6g3XzNk3P%2BznR2WzFNc23T2mTp6QUAVuL4weeMA4It1Kw35%2FYnFW535BwHgc3%2Beh4ctwXMoDfEovycuIGMpn%2Fd4dngDspARHMC2IBM%2Fk2hCQ6%2FmNychEblUzLsZA%2FDdRdUZfoiTQemBZ%2Bll7Y2hndX40JB8mBI6t24KggATCA0in4v1mSxYGHueAzon4%2FYLpbH4yfB9jgnxAXrumu%2FwUTm9JNx5cAqbdaLLIXGF8ZQUD59VGzzkWVpgpGMXQVEdZZtK2cKTHQhSu6evdNYQKjgbeX8e5TNC%2FRhH9FUA9zL3lpCRN56103lCoLG%2BywQuWfvHmeEhCaa8tWaWADNdLWOeac%2BJ1f2DkFUbEBBJQj95R0iff%2BfBPfyKfQUQTIbrJRXodXwtQeNJ7YHtW33mqSCK2s3lNYNsplPIfUQX57%2BA0%2F1i%2FE0vnskyn6zZVHsoHqlZqpdRzz5zpTSld45GcQouJhtQ%2FFmg9c90gvHr%2B%2Bs3DnXQYwTIQ3A%2BbAvntSLGQHxgR9HBsTzU1U4SOUeR38YkevrqhDnIfiUFkjapiXrbMIe8fCJsTmlWD833icvcrjCh4dXNBjqkAeD9DS1S0yo4DXTqGCbuMG8uVf6TBNINrc%2Bp5JSu%2Bt15p4AwZJyKJ0JgdSogLJtl5BVklhyTUwzTy22FU8rq1uiLi01usMZxd1lRrluxt6aPGZx9SRXqswNLPsYXKNjfDeJ%2FbkVUY3%2BwY80kz2LnNMjPBse6oTFfDLQQ%2BNCrYK9XrwbQtREiKg7Vv%2FzLP%2BhBc5F2G6SSUvn1glIpRbb6OMPNyvt5&X-Amz-Signature=ef336537ee9c88567944782d378905e43420465957e36b0c2b7fbbbcd0deb606&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662E7ZLHDS%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDs66aqHuGWuIVNKd1YZnFof0LMPWZEiofQ1u%2BeG9Xz6QIhAJ9EQtU7nxGFf5Xq0HaMRPH1buY%2BuCk5RoxP52g%2BrvANKogECKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuMOQGJUifp3BTNXEq3AN8RnJvKtCtW6nqmS2g1HiyBmSvi%2Fd6OGWdc6EMJnzCFrCSQU1joqE%2FwESoU2V%2BAAKPTX3c5rt6brfNuoKq0U28AJxZ%2BoSZqpefB%2FEpLby28A7G20tAJVjWvMGlybgG5v1HqUVfaUg79QFwoOrdJT5wKRMwZ25gzKXgAbCRSnFG1dtOlA4UnH%2FNdVZxaA7hoYeLrVhE8l7r9I1RdAAA%2FN%2Fbtj0vt0ZxA2IB%2Bl8ThVKkjuJxTxToaXcTSUJ1eQ%2BNvjnJUd%2Fo%2FClSQ5eXnPHVsLH0cAwxlP7DJkQD7%2BVn5GqhPAsPXONY80%2FgCRntqTp7ybCt13rm%2Bwys1YvvIeosx%2BcyY7ms7AQlJj5eQN8ZUNZDg%2FFeZnQMk%2BzRZgo23Fi%2B%2F%2Fo0as%2FXhvqhl6%2BL5N7Zx%2FLIMxJELuTxZLpbnDz3rMEWoRaOEXiCvu%2F9efh6rJ1QaHjQZpfgozJzuQJptje2BtY0eKipBMJ%2F3VtFBKl1fp0D2eA%2Fcmq%2B2Fesvsu9LkStxz%2B2FSagvji2%2BqZNKMeQyS1212A%2FpYuPC52%2FksYIYDVP3IUWRzeGj7T2%2BjzXIn9wyVgCLmmCtrht2NcscbHddYaBJLxBb%2Fmm%2F3gAHyX3MkNipHUbdveAX73ALKi3azDJ4dXNBjqkAeUNklDHPGN415RIkwMyRuSO0c6wl1sGrtTRSMC7zBfiTdgNnBvAzk62qNSHdhdXzFBVgJE98aBr9Sb2wwzxXV4Y4BFIG0Eff1joV9KxtS9l5z20l1ZEGYBucPCsGjJpBlu8Q09OkvIvz2q%2Bb9FB5Rfu4kHc8dIyXXAYfgr4%2Bp7KWDGk0vaeHMrhqdSnZeqBTNuBczESJVJyb%2FmVx4jR2g7zbUrM&X-Amz-Signature=7908cc02c286643b5bfb3f09c03029710207cde269492fb82ea4b8db81cb0033&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666MBHH62R%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFCVR8IhuDKmg0mcOr7VX8fH%2BbmGRfccI34KVE8m552aAiEA7G0DUQUf01bLQh4XuTAXItZGOpTlxcEANbu8PrDMx1EqiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHzEQZncaMe81kg9kircA%2BSN%2BNMMilkU7cbhN83N2fa4uJf7DatkHQFGwK2%2F8hyAj%2BFn%2BMKtQ1Cd8iRMJRK7DGDGGa0atag%2B6MSB%2F7OYIipumzastjwsg9KkCj0S%2F2jPM%2FbUQRa3pXJnbFVCmXjtX4axuZDZLtPbfkR6s59bxMuatkDcJ0b5y5xALBHDi6V4c4p%2B8%2FfSMjVRBdwuymZJkOYPDxmHGqcNECtX6RjneFpqj1GWO97yuEeAjsBdfxJhCEiuS1n4NtTvDZA60Qi9Z5iMQUzeqPamQduky3n1txOoixd68Gt4cTdoCgl%2F6rannj%2F6MrvhU340o%2BdSkQ0FHvoKCfGy4clPqKFnXtvZ61deIxSARlfouSXRKpP15U5wXs3PZ8IzFn5UUSKTwaA6YYikU0Nig25V788hiQJu266iOAMwkzcx4OljGHEQOZZIfy43scqG7SeEyFPaz2kmJVeWNAvcHj%2BGYtPH3jUpdSBc1y%2BN%2BoFMKHPwKtks5z2hvzonXWM16a0TAKDQP8C0ITY%2B%2BorzTBMFe4gSOPllUMHX7IOFISOJQMI0I5ohL52D7sKgOdUaQnf3UjV809lUr%2BlNl7ze5PJw%2FSeJZyScT8Mu2dOnkaYxdoiCmBQvK0GlU4Q5vi2JiNqmnotqMP%2Fg1c0GOqUBhri7ZpMDzDhsehj3rUN%2FVEUPoOxMmz0ZAb7wa6JTY9mjynoYGFzb9eUIqCHrkm9vTKgtUEZTMq1R6i6xwVgMh%2FF4eMcfietVLYJHvrkSTYlL%2BUpGHG7gDill5oJjKLH%2FJF8efWJAMbUa%2FQ%2FXZ0S6V%2BNFAjpvVqGDGMFbHoapt3roMefpt9Ft3qFXA%2Bvz%2F4NWaR5D0%2BFAgz0uiLf0lYddmFbul8Lv&X-Amz-Signature=d137953248cea22d1356a0a150ff06f1317583e2a166cb0f9744742fe1983f7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MOCLPTZ%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFBtFtnAdN5%2BW8OvjUny9C0%2BJhRmehwcXllEiAMFzc0AAiAG7%2B2SQN6%2BIX1PaUoikrcSbcAH%2BEpfY5JySr6Hm4FYuyqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTF1l4PKc2QM%2Bk%2FgTKtwDslYKvH8SFBQ05AwOMXNsMywk53%2BzflANQ9%2BWbh%2BTf9LARID7ZuBSYBR7YQ7PNwbMFhc1kRWrmRDxKScJr%2FmdUhXvyMLIZ6mTyXzjUAtkkEymo52uzjB3RexIoW70wanm0eBtmjiSuGPzjc7A8ZciWL1NNH1004CquBAIM4OLrhl2BIbSiEqQrUgdAOm%2FzazmG1cIXiJw4%2B6bjre%2BQaj5PQ9OptBXmlxZyMP8zjRTgEBlYhbWL%2F%2FF4nwxFuaZ9gUHp4yhGFXrd%2FV%2FEsinxBRA%2BH%2Bru7crZdv3VpZyBwaAzZVDyG9KaPHlCJSld9K4pOzYObX4UcDeVp06X%2BazGnN1OZQPEAE%2BfWctasgK4P0xozHOVpb5rsoAmmoQ4nOOxlcps9LRcmoBty2Wd4xnAGviwf1ODeEloaeia2ykGRXt%2BKPmyGwsIOGNr%2FOt%2BKqa4m63CZ8xYXzYMFgQg1LbZNI58zEMoeMfvlC4264gpIzp6shRmdc5xfQicdIQSnrAx4gQ2g4CJwyxZ02yT2EG0sLcnoYTTxpzzFxaeLj9%2FVVkSujqboKzfl7wq8j47xFeEtnwjWj8Jhq%2FgyioJKskNgEzhCdn1oiMwTKU4ckJYd%2BsmtTuQmWPHyfd3cv6FVkwpeDVzQY6pgHmC0vU%2F3m7pgRDi4va8ya2IXfK0hM9xhZZMU7K7%2Bojue%2BaUi0W7LK7y9eo3oiKxkeC0I8zQ758KhEkNfqHEgnLp7Wslwc2uV0P7CztCCeD8BPY5eBNwbNMDSQ%2FNqdTWptg9jQxvAmd8VGBe5H2Bc%2FDozoHv6tV%2F6ZYnssAMK8HQyoksXdcSB9tnCgQ0vW5hWH6GwYs3z5FO9nix4Y5h17Qn1BXrQgl&X-Amz-Signature=7cdae17dc9b24048856d7f0c2a02d938e4789f8fa41e7db7589e047ccd5c79d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MOCLPTZ%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFBtFtnAdN5%2BW8OvjUny9C0%2BJhRmehwcXllEiAMFzc0AAiAG7%2B2SQN6%2BIX1PaUoikrcSbcAH%2BEpfY5JySr6Hm4FYuyqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTF1l4PKc2QM%2Bk%2FgTKtwDslYKvH8SFBQ05AwOMXNsMywk53%2BzflANQ9%2BWbh%2BTf9LARID7ZuBSYBR7YQ7PNwbMFhc1kRWrmRDxKScJr%2FmdUhXvyMLIZ6mTyXzjUAtkkEymo52uzjB3RexIoW70wanm0eBtmjiSuGPzjc7A8ZciWL1NNH1004CquBAIM4OLrhl2BIbSiEqQrUgdAOm%2FzazmG1cIXiJw4%2B6bjre%2BQaj5PQ9OptBXmlxZyMP8zjRTgEBlYhbWL%2F%2FF4nwxFuaZ9gUHp4yhGFXrd%2FV%2FEsinxBRA%2BH%2Bru7crZdv3VpZyBwaAzZVDyG9KaPHlCJSld9K4pOzYObX4UcDeVp06X%2BazGnN1OZQPEAE%2BfWctasgK4P0xozHOVpb5rsoAmmoQ4nOOxlcps9LRcmoBty2Wd4xnAGviwf1ODeEloaeia2ykGRXt%2BKPmyGwsIOGNr%2FOt%2BKqa4m63CZ8xYXzYMFgQg1LbZNI58zEMoeMfvlC4264gpIzp6shRmdc5xfQicdIQSnrAx4gQ2g4CJwyxZ02yT2EG0sLcnoYTTxpzzFxaeLj9%2FVVkSujqboKzfl7wq8j47xFeEtnwjWj8Jhq%2FgyioJKskNgEzhCdn1oiMwTKU4ckJYd%2BsmtTuQmWPHyfd3cv6FVkwpeDVzQY6pgHmC0vU%2F3m7pgRDi4va8ya2IXfK0hM9xhZZMU7K7%2Bojue%2BaUi0W7LK7y9eo3oiKxkeC0I8zQ758KhEkNfqHEgnLp7Wslwc2uV0P7CztCCeD8BPY5eBNwbNMDSQ%2FNqdTWptg9jQxvAmd8VGBe5H2Bc%2FDozoHv6tV%2F6ZYnssAMK8HQyoksXdcSB9tnCgQ0vW5hWH6GwYs3z5FO9nix4Y5h17Qn1BXrQgl&X-Amz-Signature=c35bf8f3aacb59543a0383613f89cee7a5b5650f12fed861b4af7acba572b5a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOK5PC34%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFfCt%2F7yU0w4Nd9riN0%2Bkuf%2BC3YT5JJC%2FhFYIpoAGDjUAiBjMToD7E46BZQ93N7qesmzUGRc5rPL%2Fjg%2Fn1KTw5eWACqIBAio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BbBAD80a0zg2Vr7kKtwDZZIc52Nzy%2FB7tez9kGus%2BytttaYGPUrkBuxr0eMkbk3eXnyrV4hIB7lLY8Sj9v078Lwc5TBfVkw%2B2eM2RnVPdIcP1Dp3j6gE798MWlte%2BerLefYwAdAx0Zd7z0RAC0C8UGI9QPN8PTJVt1uzoEXUV855ez3sc9cJAZ5aUTFeYu6R9LoBPUj0ai9EDrZ207MbheC7sIjfP8PbJO4a%2FAjncB00qZCRfeOD%2FDgbZ09%2Btj7xCno9R5crPbA9WGqr6lSfEGgezpJNtihz9AEosxEFITmi3UfdPB3AeTWYea3zrHBCka8%2BpfxCzwpEi1uS%2FzCWfwZc5M7WtON6gviRvXfuLdASrJS7T2M%2BYTCquiO1sAhTPLp6QSw54EqLpuI55tZiQiEXfalAEMnP5xndL51cs%2FXCqZZuZ9Diz3DGrzrCwuy9Hw2W3VAdbWE%2BXizcuHkrb0BWxq86k764X%2B4kdfxJRz1wjWteraDcsiHByXDMJsQcTPOWIF0YOxN6FpKp5uVvA5%2Bg1N8pHYj5EpUG03kTF%2BURFKDBixxNliLCC%2Fj1OAWAeqxlqTnmdaVm7tu7hKgtJNXzlhzr0lUV99iVmd8fQY2DTqiH30YOGbexCaWlMLaj9g0LGUCbtp5Q3gEwruDVzQY6pgEohUFoQp9BGIZT%2FWi6rnzmS72mk8mpMQN304Q4jb%2FLDPczAHZotXGms%2FFcHx5rrS5RNRBYBonRR51Iz9X8vFu4kQWisMx9HW9bn3ol57ANfS0wWMNQqA983SMbOgFRmnkyI0y2JkYkXpvCXPXVVyVrdlqD8jO4hHcGUzbsX3mFvkwRp5oqVA50GQ2KIK8vZjqJRomvbd%2B9if65tpLSkaNXtGAG%2FUXZ&X-Amz-Signature=e1ba6e8376d222424dd5a0d40c441f45aa37fab4327eb05352cc995ea536b3ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHYFEBRY%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDSJ0zxsoUNZ%2FH%2BBUbYUGvG%2F%2FKKH%2FL7dle3Smg6qPRaYwIhAOl7jdLfnTdklzACDIUiv2qOS8wi5OU64MEiL%2BOSkX1KKogECKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzDhS0W5bYq5UkJ5vYq3ANNxPNCbJIYilVZrVAqAs9Iqxi2FDS28YK8g6MXCPl7UBLpCkdZhU6vO4hWh6sxJ%2FwmxbP6uy9TZuzZl7J9v730Gj7D6i5gXB8TGhj7YsqlYsTpK680t0Ub7x7wNTAYnoML3CRe%2BGllOg4dVpmAsxjIVfoTfnrMQwukwUvDcwMkawsKFIjvrBG2%2BE8Wzzdi%2FBNlrlkAp5oMqcgd22L7M7Wcijw4vQXflSOEjR8%2Fa8RK1JA%2FCR6YmX5n8UsaeXmYIhBuMgAmsMRMDm0hdmNx%2FifELAI%2BAN%2Fcxwoo8ysdl8dcaMFFN9XYSd4A8i6MYRoFErwixK8puj4fyYyOzXu7VCoMk1Uz9u1Jdbvs4LZeLtQaV%2Blgj7J3dWzoE4%2FHx4MIrgEdxuKMGQKdyEnkASTvYbvlWhSvKTSCsqJjqxXGaDAKP4E9XH3hqV3YLvesO5qSiemTxucLKyizdf9ZICZriRIiZl2hmjJZiqhDL%2F9SbvPFjDrb7pycyKsCal4HP7u2IqsAmK89KGwnE2DufcffeRphv3UER0P9VCOBbgwquHlj3Jog8Y9K1DFLLOQhXq5dLdv7Ks9GPuwFzP9OZvTo8bc3C61h0pmtV%2FPb56ktNLu3VfIyUnP47iKI3wbJPDCM4dXNBjqkAX46Zan42Qtt5lUVC%2BBBXurRzLaV2zNNCCe3G2FUdu8IEZr2TsUPnBtPS0fszDudSI3B8dAHq1mGkUIFCEHmMI4%2BxGYR%2FjlSB2KX%2B%2BrGxn4dFAUe8lBNmQXfeel9emg%2BfF7vOuYUiJ27%2FBBVa4Ksi0EOEFqFmqxRQjAYyYbNaGyO8bUwVthDUH77%2F%2BmNr23wXfxvtar5vS3QN3w7a0JQSIyMrrCa&X-Amz-Signature=c7610406f7145bcd9e0bf1b7f56a9d51c10c1ec8dcab1ccf9cb2c2e850fe5a79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SHYFEBRY%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDSJ0zxsoUNZ%2FH%2BBUbYUGvG%2F%2FKKH%2FL7dle3Smg6qPRaYwIhAOl7jdLfnTdklzACDIUiv2qOS8wi5OU64MEiL%2BOSkX1KKogECKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzDhS0W5bYq5UkJ5vYq3ANNxPNCbJIYilVZrVAqAs9Iqxi2FDS28YK8g6MXCPl7UBLpCkdZhU6vO4hWh6sxJ%2FwmxbP6uy9TZuzZl7J9v730Gj7D6i5gXB8TGhj7YsqlYsTpK680t0Ub7x7wNTAYnoML3CRe%2BGllOg4dVpmAsxjIVfoTfnrMQwukwUvDcwMkawsKFIjvrBG2%2BE8Wzzdi%2FBNlrlkAp5oMqcgd22L7M7Wcijw4vQXflSOEjR8%2Fa8RK1JA%2FCR6YmX5n8UsaeXmYIhBuMgAmsMRMDm0hdmNx%2FifELAI%2BAN%2Fcxwoo8ysdl8dcaMFFN9XYSd4A8i6MYRoFErwixK8puj4fyYyOzXu7VCoMk1Uz9u1Jdbvs4LZeLtQaV%2Blgj7J3dWzoE4%2FHx4MIrgEdxuKMGQKdyEnkASTvYbvlWhSvKTSCsqJjqxXGaDAKP4E9XH3hqV3YLvesO5qSiemTxucLKyizdf9ZICZriRIiZl2hmjJZiqhDL%2F9SbvPFjDrb7pycyKsCal4HP7u2IqsAmK89KGwnE2DufcffeRphv3UER0P9VCOBbgwquHlj3Jog8Y9K1DFLLOQhXq5dLdv7Ks9GPuwFzP9OZvTo8bc3C61h0pmtV%2FPb56ktNLu3VfIyUnP47iKI3wbJPDCM4dXNBjqkAX46Zan42Qtt5lUVC%2BBBXurRzLaV2zNNCCe3G2FUdu8IEZr2TsUPnBtPS0fszDudSI3B8dAHq1mGkUIFCEHmMI4%2BxGYR%2FjlSB2KX%2B%2BrGxn4dFAUe8lBNmQXfeel9emg%2BfF7vOuYUiJ27%2FBBVa4Ksi0EOEFqFmqxRQjAYyYbNaGyO8bUwVthDUH77%2F%2BmNr23wXfxvtar5vS3QN3w7a0JQSIyMrrCa&X-Amz-Signature=c7610406f7145bcd9e0bf1b7f56a9d51c10c1ec8dcab1ccf9cb2c2e850fe5a79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XHMOT2W%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T151537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDE7%2BjgF2CiN2kdMhWFHu23MZnPXQdRQC9bNTDEiKar1QIgQOvUSIG7qdbU6qiVjzRv2SWgcy3BkAJN8ct3jXyyap8qiAQIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCXwfL47f4im6kfgVCrcA4yLQEFGgrIaHrhaHs40tCkPtAvawLNQeIddpNN8N2rPDH8zif5hTeY%2B5IXSix2isohyEJBKKwCFWSQGWfi8VxcFHv07mtZ6YKA8w33nIPoke6l8qyYtYFyJyZqCOsfvOMXIBR6ycD2iGNdf7gINocDWGr%2BDXuZB8W6GHW1Q0IApvh2eqQ4ogkOcwTGSomWQi3HTB9FAdlL82PBlBmVsHkts%2Fb3DkmKewKcFUTRvwxjFUywY2%2Bm6WzZ0RnjZFqyT%2Fjh35KuhEAb6DGiqbmhCfJlsFAmQFF3M%2FU7M2cm2MCa8S%2FTpNBTzgpFqeyyl47eFbA8hFASSOmcNVg5e4P9HG55yuVq6dDiP8om%2B9MMpyk6SxyCivqUhKUWAHMYCl%2BRp%2FU0nzeafPEQM8XEHOX8i8H8NvdhwDnQQMdNy%2BbcH269UMSpZRjlyXZT21bjzAQdBhDeSodZx0AfqTlYxNDsEes66c2Ymukinl7ZPNBn1CA9cWutk0vrW%2FaC8BdaDL2lE7clO6wXPpm%2FHalEvHQ2bWqzQ%2BJg0VVO7me1Wn6WDUAJyq5vGGuzN5sahF3vQ%2FlX3Sfaut%2BfXMuKXfQkF8wq8cNHwIGNrJMh9Jo7Xx3xpETzViPTkbH0UjrtrUlNwMNHh1c0GOqUBt%2BUiYI1J3cxum2Rn%2Bzxk4S1M10dpIB92XCj3Lk0B5xMtmwmcomIXb1WGqJ9MMn5dyLn%2FqPMtTDajetXe5EOMz%2Bm7H%2BFeuJvprD6RnUQYjjUHTIQVczH98EEYA2b260zZDogJoxyzq22uGaIjtt1FXljCKmv0qEY0WQbj%2FAHXvd2ji1WmSibo6jDxitRgRndUSxd9p8My0n%2BBs2kmUvfDhuz1ZtlT&X-Amz-Signature=0b11600d5bc195f736073110f4cc2f2ab50a6dde0bff53be5dbfe8f4491e3025&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

