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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFPEQEEV%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCICK%2FbIbAYaf399akSdBojaWd%2B1qZg5ThxmedlZaRpy%2FAAiB8Rtwo6aJ8eW4%2Bw4mQ1Jnxfv9jB3FRpGW%2BRI%2FQAWkWYCr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMYqwq0ALA1TU7FSA6KtwD%2BxaqEoercGp9yNZWmyfgT9d1tu%2Bs6%2FmFjCXr1PppkFzzdNyjLlgLaGwtu4Bph%2B81PF2OumM9J7JIiXVnAlTUWRXkv24mJafrifLC%2FG07oSOyZhOfAIomb2ylhmA2c6bOzZ8vzKr%2F1WxaWwVGWKb99YazyljUpVp%2FsG0h7%2BudCa%2FcK5AbByIVzsxJN2E5DB3Pvg5VRS9kP9Re7l3jcVGUk%2Fm0Jy2K4YVZOCg%2Brp8SKtfqsqW5PG809hjp6B6Ua4zB%2BcNCbe5YPPDRDpRj645X83kJUthhByah16W1eEIL6qndCsZk9099xx%2Fr4krtB5%2FeyyB2ERFQAkCo%2F7RD6d9XeWYSF%2FPklGtniV7TA49p2KRqbDI1ABq63t0FyP6S5mcw7F7RsZiAC6X3tn9iOOuFqnNa6URXzUVNckco4YBQTUkM5BYaKLSlrYTRuwK7uzX0fYi7QA%2FnpQAbAa88R0J6uOgGtKkIqUDV1KLBikoZBti7dWFVJ9Foj9r07dXJzNIUkrm60SK1EnFVfTnBkzQY5Ll%2F5vqiZBjIkGyreF1z5iEHt1FJ7JZW9rG3CbsHjwj0D5v5ISieVzWXFgd1t9D9XjUh6GPorJxAbrkh%2F7qSP3Rt5omPYSnykXT86GwwoLjgygY6pgEyChwz7XZNeiPEy1pnSH0K4LTn%2FIROKzKYdtDpBdyO8kaQNidwsoZqlI9vw%2FAqJ6VGIUv7wcC9Ukr0%2FMARtQYESPpfnjTAznYRlm8Iwd7k9PKU2%2Fiyydes08zvG0RMiTWS6Xl4AdCk8hwk%2BB7UjACWR%2FBoq3SQD6USirv%2FxodoeZbO9A0JHsOGU1DpAdHjFjwqLDGJYEkO3i54L46fXRU9CiY530xa&X-Amz-Signature=038df36dbcd8c02bd34bef01058df366c8b3e57880d410ab8487a5589cfd2b8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFPEQEEV%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCICK%2FbIbAYaf399akSdBojaWd%2B1qZg5ThxmedlZaRpy%2FAAiB8Rtwo6aJ8eW4%2Bw4mQ1Jnxfv9jB3FRpGW%2BRI%2FQAWkWYCr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMYqwq0ALA1TU7FSA6KtwD%2BxaqEoercGp9yNZWmyfgT9d1tu%2Bs6%2FmFjCXr1PppkFzzdNyjLlgLaGwtu4Bph%2B81PF2OumM9J7JIiXVnAlTUWRXkv24mJafrifLC%2FG07oSOyZhOfAIomb2ylhmA2c6bOzZ8vzKr%2F1WxaWwVGWKb99YazyljUpVp%2FsG0h7%2BudCa%2FcK5AbByIVzsxJN2E5DB3Pvg5VRS9kP9Re7l3jcVGUk%2Fm0Jy2K4YVZOCg%2Brp8SKtfqsqW5PG809hjp6B6Ua4zB%2BcNCbe5YPPDRDpRj645X83kJUthhByah16W1eEIL6qndCsZk9099xx%2Fr4krtB5%2FeyyB2ERFQAkCo%2F7RD6d9XeWYSF%2FPklGtniV7TA49p2KRqbDI1ABq63t0FyP6S5mcw7F7RsZiAC6X3tn9iOOuFqnNa6URXzUVNckco4YBQTUkM5BYaKLSlrYTRuwK7uzX0fYi7QA%2FnpQAbAa88R0J6uOgGtKkIqUDV1KLBikoZBti7dWFVJ9Foj9r07dXJzNIUkrm60SK1EnFVfTnBkzQY5Ll%2F5vqiZBjIkGyreF1z5iEHt1FJ7JZW9rG3CbsHjwj0D5v5ISieVzWXFgd1t9D9XjUh6GPorJxAbrkh%2F7qSP3Rt5omPYSnykXT86GwwoLjgygY6pgEyChwz7XZNeiPEy1pnSH0K4LTn%2FIROKzKYdtDpBdyO8kaQNidwsoZqlI9vw%2FAqJ6VGIUv7wcC9Ukr0%2FMARtQYESPpfnjTAznYRlm8Iwd7k9PKU2%2Fiyydes08zvG0RMiTWS6Xl4AdCk8hwk%2BB7UjACWR%2FBoq3SQD6USirv%2FxodoeZbO9A0JHsOGU1DpAdHjFjwqLDGJYEkO3i54L46fXRU9CiY530xa&X-Amz-Signature=038df36dbcd8c02bd34bef01058df366c8b3e57880d410ab8487a5589cfd2b8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZS645EBD%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCcPZb5cWoXwfMZDm5A3hG1UAIL2PL%2FQmwmYIgRlGStqwIhAIshHdC7TR6a3c5JQYgXBTnN%2FdQyrwpQL1jL%2Fxd3dpfDKv8DCAUQABoMNjM3NDIzMTgzODA1Igw4bRbcH0sWYEGcEosq3APqIuD2uk1PhquqeHLixgZlZlupbmqqjxtkeDaIY6B8UvU8Kst%2BxJcReytY0RAUEDKsBHGI3TQYmCGDQQLqK7t6OVT1uZYXRzO7lxbojYt2GlSCEVJE%2F67wN9GQXCNGPOs0f5KO3yWGxIn7gnsGgZILnNFrQcJV7BlCpbxrAcQGkJclfPr70aSizduykj%2Bhs0dwBOy6OHKSNL7osBDRD%2BzlwVC16lRD%2BVHY%2FloHT%2BEoEkNSdSiev0XoQlqMhOu25iPyWTYNoveTAe%2FP0B%2FR5E6XReRDmJiXcCC8DUHqXoTBaKLGnjqqQXk3pA2dkyFGfU4brHEFmjyaMQgY13UhhNUgY6tRaAwjrqekBtAIWQ32E1JUB4R6tBvRB5941IjOx3M6C3fUiYEpFYG%2FKG%2FXml%2F17T6hdlqpfQ7u8gqzbYJnptsOJnUF3PlhyLnfYzxlis22yLCEOeRgSvxCMjS93ZRhFGf7uNxJSwJ8R2mXKpkQ9D6qMmRTxF5Je%2F4Qp3dqTqjOB6MkY4aObUKiBsstXDXQoGk54tSdZ2PsUQkZiIX8r4dkEWmAuH1gsPKLoxh0zN1uyhsAIRpsy9Jkpqr23yQ9x0h4l%2F8HKjleWGLp0lEZ5NjqvDB4%2Bp6svP%2B1JTDivuDKBjqkAVflb%2FA0clZUaOlLm4v2dIWck3ZdAlDiGbazwlNPXxi3DmmqT7K9E5XKj0bhDr%2FtNSSTFO6jlwi9KsXQO4PCUbq3KOXF9wwgO981xF6dlehwIe7U7fxqwFZB%2Bu0XXI4u%2FRZMNJnYPafh8wwV3%2FnQjb8R%2B7IWF2vQIudY3ZMnHmRHAxyDW0GPBFKANZRtP8o4201%2BpJrQLiZdVZnisJbNjVz9rqYd&X-Amz-Signature=f1b89e7589cf1d8519a203fe75ce33fdbcbee56317a6430090bb4d300c83da7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZAAPWVV%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIBdeGbkO3wjgEPsEa8O5xXchuS0k8OloOm7dYq%2BChMFcAiEAs3ZRazwRwnsIYc19e8uGYw45u1WhiMJVeKwCLKaIHcoq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDGs8U0hKDaWYo3zX1SrcAxhThZDntWS%2F3NPIDg7bPo9xPA84LjpGwbgHy0mZ%2BxdAPIddH8OqD3v59iw%2Bsw1cOQZ2oOJPc6d8nGSZljKaSUgMU1MseDR%2B3EByo3MFuVBJF%2Fci53885djA%2BjgG5jj3jTb1n%2B5RbguaN892JWQ6Q8ICYkm19dqPU4GnimgdVbUawyI54zeNaFYvVmv7HArMDqAJxQlCPQJy9daNVJ0AxlWGsNs5%2BvP%2Fs8ZEI09KtwesuLNyxpeMbC48udaTaXZHhY11smGZFCuWcysGZlBWtRkXraWCGl70ehpc2XZGj4sM07LDOS9HXgR7ii8PyYeYG5QbJF3Ith5aL%2FvcIAnS7%2B1n0gp4MJxS8vpssOHMYAowpTSuBy3StqmQTPjUXf5Q4dkCD7SDIkf5W9qpP93TFAzqwPYH0RvahVf32%2FtO%2BoeJJOw4dOMcrlH%2FrihXBb%2BcCGS6jZ1yjSJ0wUgXuIxInUxvGI9%2F84uh2PnyHACq2lysUyqcbH1I581wrJawRV0qtiwX%2FhiNn2h70TVYRB1ny%2FKtmr5%2BkbVk4amSk330d3ci67zqs0xJ%2BgnHFe4%2BXZz0chBkih0LkGCG68tUasai9T84XO5LZE8IlB4gbHuriEIRMnrRdQB24PHDWERhMOa54MoGOqUB%2BhlrosuYt3Y120vnp2Nsg%2BzcyKazvfTemNFMiSq6T5dsZHHuKgHbrPI8IpfJC0Es%2FdPhXZqpN%2FAciAmyLes2sipiY81JWezXlNqcaOed0k54XRzRiWvyfPtnSL4HAmnlcf0HhRxALY3Hj1kFVRYotrk%2FYDEhWhOth38FZCtwOodbMG9YwkOULuQH31L39u%2BGJpmaZqR8b0z0azQsWO7AQEZEeozU&X-Amz-Signature=ed0e9f376c7174dec64ffc152428f85f4b9be0040033dec75fc2abda35a05fe5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZAAPWVV%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIBdeGbkO3wjgEPsEa8O5xXchuS0k8OloOm7dYq%2BChMFcAiEAs3ZRazwRwnsIYc19e8uGYw45u1WhiMJVeKwCLKaIHcoq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDGs8U0hKDaWYo3zX1SrcAxhThZDntWS%2F3NPIDg7bPo9xPA84LjpGwbgHy0mZ%2BxdAPIddH8OqD3v59iw%2Bsw1cOQZ2oOJPc6d8nGSZljKaSUgMU1MseDR%2B3EByo3MFuVBJF%2Fci53885djA%2BjgG5jj3jTb1n%2B5RbguaN892JWQ6Q8ICYkm19dqPU4GnimgdVbUawyI54zeNaFYvVmv7HArMDqAJxQlCPQJy9daNVJ0AxlWGsNs5%2BvP%2Fs8ZEI09KtwesuLNyxpeMbC48udaTaXZHhY11smGZFCuWcysGZlBWtRkXraWCGl70ehpc2XZGj4sM07LDOS9HXgR7ii8PyYeYG5QbJF3Ith5aL%2FvcIAnS7%2B1n0gp4MJxS8vpssOHMYAowpTSuBy3StqmQTPjUXf5Q4dkCD7SDIkf5W9qpP93TFAzqwPYH0RvahVf32%2FtO%2BoeJJOw4dOMcrlH%2FrihXBb%2BcCGS6jZ1yjSJ0wUgXuIxInUxvGI9%2F84uh2PnyHACq2lysUyqcbH1I581wrJawRV0qtiwX%2FhiNn2h70TVYRB1ny%2FKtmr5%2BkbVk4amSk330d3ci67zqs0xJ%2BgnHFe4%2BXZz0chBkih0LkGCG68tUasai9T84XO5LZE8IlB4gbHuriEIRMnrRdQB24PHDWERhMOa54MoGOqUB%2BhlrosuYt3Y120vnp2Nsg%2BzcyKazvfTemNFMiSq6T5dsZHHuKgHbrPI8IpfJC0Es%2FdPhXZqpN%2FAciAmyLes2sipiY81JWezXlNqcaOed0k54XRzRiWvyfPtnSL4HAmnlcf0HhRxALY3Hj1kFVRYotrk%2FYDEhWhOth38FZCtwOodbMG9YwkOULuQH31L39u%2BGJpmaZqR8b0z0azQsWO7AQEZEeozU&X-Amz-Signature=4d7deff6e72425e68cee845f1de548ccf781b4fb43ede688e14cacaf7c253e6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635MREPAS%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCFc1Olv6I77OUUO6BNUrEo8vhVbstqWuWid3FCcPfb4QIhAMnXfMu5oq2mJY9b3eAIbuJs9wkle5wLXcbNxeP9aU4uKv8DCAUQABoMNjM3NDIzMTgzODA1Igza0z3JxXoTm3l7KLgq3AO4MBSNtWsc1UxvG911BTIyq5dcFAtyMw2nAg6ZCP%2Ftgdy32wg9Z0gSwHXXCttoasMYTQ50AclvqiouLRvmd8KrslRcQ4Te4cytBeH0bEOCT9JsJup%2F4S2MQ3H%2B%2Bn7FROjMpNIty%2FYu5le%2FGR7HX6LW5reOiKQKDfNkCMcNJavGd50PCs%2BXPg24BOTa0EPhE%2FLRofvS8HsJ6mI6Fbk6MNZtVnUd%2BK5zjUiJrtF%2FrA%2Fvae8PSTR0gqszAv2bj0IErqNWipIK%2B%2FSaAMr4qE%2FTkJI7lF9zhFs%2BqelTw74odPJFEKIpvYO37gSXaTSqpIJmH9QUdIy%2BFUt3FXkq%2FuFf3pSGlZrjwYI2OIL%2FLEhKhoc6WIF5LaYX5WQNQ97sht6BEpMFlZsnKUQtbaM9ZF0Js8ZYkTL2pQXhEh0t18JABk6o9kv3XOw4dX9b8ZO6l43hwg%2FkvHXisCtMS0bdIBoCsbHhp6c8AWN%2BCrXyFgcm7yzfZf9X3FUXC0xG39OrxWctOd8V27zANbeTsubVZt32JyQutw9HyDHOP24zPaMmbGl6eRrxMEI%2BD44mma8grz7xhmLKBZS7F2t4SIV2iRT1xUCzHRHZiOJbE4EhdknBX92AnMy7cWH%2B8MJfcioRsTC2vODKBjqkAYbPKdhzzZuYyEGDQf829llQV5cxjKTFAIKGSXBVLLWP3C3oy%2BRQI4nTo7g8qBS9YxTIlqkHkbnC2Llxw6Q01i0uqOF44nUPxVHeexwrQEu0vlODgKpxoxi4FQ8uPTaDqC5CKEo2N%2B2gmAfgRFOMgm58BwnvhbD8TxoNhGP9BkWnG4FcyJ%2FtPkFXVFdWUpa1prc1S7CYKAAo5P5A57lNAPGSuu%2F%2F&X-Amz-Signature=01522f1ede0dab3e51e56f16a75e513f51ffa12bd155321569b777f5ce80ed34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VFJNXKR%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDPKmZlMJFIAElxSUYCRc0MMvjLVFJSGTblNY0TAfMONAIhAPpfjdGWSPBLODjefW1w0qvwgrBOprKrpk2rUbcSmoAHKv8DCAUQABoMNjM3NDIzMTgzODA1IgxwQfIk3e6WSk%2BRVRAq3APRp4O6p4Ai4mVm3T%2B67pxjTzgwpstOwLeS%2BQ8fhOUBWcFLcoaWgxJFr2xDnbKbwsb52XPYllSEvcWoMV%2FY7rMfkfpkhR4m8hDclqJISHpibjnR9eLwTM6rv6Y8siI6C6KVGUIYC57GoPvpK%2Bmo2xBv%2B1MVik0l5pqP%2BgHeewjC22NZ9o94GB%2FVXwB9hXPU9hhLybCWdRc8SH6%2BK0JbVgOo%2F1kr%2FF6iM2ucV5Jauv6J%2BPy7RFoFyxcxKgTVV%2BNWYEKKbpu%2FUazpJGVepgamYFNJQJuWBGL02xc2WlCbi20%2FPiGK32Mio%2BsgzbRy5Wn41txOzlVdewRTe4CSlrFJoVzw6GymT6TXXkQGigDbFlV2DDz8X%2F68kAVSwKV1cUI7sgiSNB%2FYAiYinGR%2FndfmMO2n95TFU95e%2B54m1R2%2FtVkY60Zvr6LEuKULaQsyGo4fBAPsIukek8%2BDD%2BN4nPAO6Z3UeRKLTOKUiD2ZXstH75VqlTzJbyddUlbZkJQMSjUqk9du71EhtCm5zT5cGBrmQA%2BQgMDB3d31fhhLFHKBB7wOuy00S3hFmOx8J7ucKLVKVz8NXlLSI9%2FjF%2BT%2FgqDvqcHIlIFYC2UaR6JvxCGCVMNNArUpq%2FKvT2ghu7lmqDDnv%2BDKBjqkAcgjPzw7ibUMqhJWp%2BVSfcLhMpkN7vjiZEcfbHiuxht4rl%2FOuOCJ3WjLXb%2FpClPfGhnoOFYo5YVPAKXT1L8jGLg8Vz0lOFp8PF660xA67Wl1i7U9vP7xJTqA9BruFalVn%2B7%2BDhUxAE6DwHS4xZa9Imz1ruiRRe59akFbZwnwegobfrlH%2B%2FhlN9hkGkkLOHHE958H69bjMWx%2FsDHEEjd8Dw0pJMly&X-Amz-Signature=adcf4a46b47ec962e59950056c788e45f67333d3975c35e334df72b62bec158a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFRKAKGT%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJHMEUCIB6LiQrgPcJQVuze2n0r41W5md3n2ByLDLEQZN%2Bi2QynAiEAum1AWL2q0Vd%2BqNkLlEpbvYqO2HSAHR7aPEQH28zSytEq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDPj8eHcZ%2FvR0KUfhFCrcA1ZgajgVJJ2es1Ck346I02IFddG5BGjUHl8LgikUvUnu7hbPN9WqKUsgo8kYhvfJESEJXOor1f7ooPZ6bCxHBTj%2FY%2B6xYuKtxQWbrXqmgRzttMhFjx80LHo6rzIwkE81cHDyOvpEgIBQU35PDmOSWUqQb4mOGVhVRvyggCzzwwfh8h2o8UjlhJGa4h7P7qWpnNtoofET5iUnX7Y48c9ao6Fr%2FQBzePh6TvFK2r2dhuvP1BCzT54TuTuz%2BfbEZSLSVMTG42wPYxyuJbGp0Jfy3%2FtNl3PSw8ROGbhy%2F3WPRK5eXPpp823yTPLt5SudxIwU5KPW0s123ZEm%2BuiuO4A1e4h7OPV3zo61%2FmAUuUZx0K%2FNi2Cc%2B7B4EGD13CyW%2BAg6TRFIaWzYogDuxw19sOZ6kif2EbMxMJu5WjErvED1KPcae9crXQKNaJvCy9watlKmgU6dtZ%2BxehciZy7WxHietWdZXiyNjnivNwez0M7af4eQ4lp3S1%2B0YtLk%2F8tBB%2FWC%2FTFfi4L%2B1vptSFSbigMZMcynSxM0erWIzpR%2B43%2FrhZYlPShSxlHJBhMJ7Ee%2FFn4lZrEJ0KaL7PzGcmdDXu%2BFxrMoh2fEmGDCjA%2BFuZXDlWOU3Iry2vSVyLUe5GApMPDA4MoGOqUBZbneUAITdBpuK%2ByNeP2cIHT%2F15pS1U6sXSvtq9z0E9h0LqLy9v6kw2eX7w5ipQwq8jB%2F3fPJYgInSidEvAeODdnP%2FyF29fGkVRZPcbgW%2FQ7dcMZnaQdK8L7D47oCnZo12ZE5bjbNs9D0J0nL7SraPLz5aHN1EMNSzgTR%2FtPnlSYKtbY9oyUZWo0RKBFF3%2B7bxorjsRY%2FvzkvRW%2FCpES5aXjFsM2f&X-Amz-Signature=aa63b0f5bacfe847d8f7e90a2ae7066bf13a0a711b30c7d3eb5f50901c2405d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQW7O2PJ%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDBLjZGxL1XD4tdrx40Q%2FkV%2FSJcKc5b%2FQUG%2Fru6J7yIdwIhAPcsZ800Mh9XSukAna%2FuUjLH6hRD26CCMmhMN0T4n4LnKv8DCAUQABoMNjM3NDIzMTgzODA1IgzT7TO0G3tyhmXcYLoq3AMc5HRuWag9PP1nvo068rBgy5HB4TrnHQjGiXcbK88iGXksu6UnT5GGu9x9SSqR3B3atSCxevOz7eooVOLIWCeXvWJ0hWs7koHGyxVynBwTilhRVOQCRxsEYIal8fBNxSGlv31l%2B9v%2FzisVHEP7Vf25gTQthpiZ%2B0GQettXFFk3AnGGCWnjGba6XiQU5EX8MH%2FnYKUZvzH9lWl1VQI3qEQb4tQP8VeEB8q6X4YthNg2sLHHmKM804LC9%2Ff5FRkajy1v0p8N5smBu5J7l2mI7syGYUSBuokgrJELJgQFJQY2KFweJA%2FGNvgzNhOriJm9Rr6%2F8a3U93Pp4725dV9tbmo4%2BleW7Ywnb2TLiPfmh9cLiuLNmN9tJCjY860SSgzern63CfTifQSaDQktREwDhQe0JXTsrh6yq9rh3i%2Bb8mPpxRJL050RHR49MaVu1nFpQesQlaRdfSLs7m8akExmIotoubBYnMZiRCrQ4v7FUPNlt6img6SzJKEDV%2FNZoCYSl%2BxaPo7GloQ%2F9SxQtWJ12FM0YE%2F1%2FewFxzUEVd%2FdkvZHcYg%2BygW6uEusoCXBmznaIVxLVavJJaA73Gs%2FQjQanFOPEoH4QHQ5SGXllHpaxcSdqB7ynLGJCJDVMWklwzD6uuDKBjqkASCH%2BJlkpwCKYnHfqE%2BQvxXrdUj%2FbkQkENkEnFOK%2FvY9p%2BA1T0qTNjbbhQKs8GXiv8rdcybAEWfAwXj89ZTfYh4TTnO28L30OXOUEAqzl8sCeq8yS9LyjVQS9TsIn4SLC2B0NbLZAzHdMYvEya9T4RBnTQh%2BhCOMwfPtCfVlY%2BvOjHjs6ABu4COWxyXxj%2FHjY1wah%2B3VifguHWnjXJUGN8et8fpD&X-Amz-Signature=b2e8a0d3a6d150e815a0e968894edf700b4506250c068333052be134a4a72d34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQW7O2PJ%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQDBLjZGxL1XD4tdrx40Q%2FkV%2FSJcKc5b%2FQUG%2Fru6J7yIdwIhAPcsZ800Mh9XSukAna%2FuUjLH6hRD26CCMmhMN0T4n4LnKv8DCAUQABoMNjM3NDIzMTgzODA1IgzT7TO0G3tyhmXcYLoq3AMc5HRuWag9PP1nvo068rBgy5HB4TrnHQjGiXcbK88iGXksu6UnT5GGu9x9SSqR3B3atSCxevOz7eooVOLIWCeXvWJ0hWs7koHGyxVynBwTilhRVOQCRxsEYIal8fBNxSGlv31l%2B9v%2FzisVHEP7Vf25gTQthpiZ%2B0GQettXFFk3AnGGCWnjGba6XiQU5EX8MH%2FnYKUZvzH9lWl1VQI3qEQb4tQP8VeEB8q6X4YthNg2sLHHmKM804LC9%2Ff5FRkajy1v0p8N5smBu5J7l2mI7syGYUSBuokgrJELJgQFJQY2KFweJA%2FGNvgzNhOriJm9Rr6%2F8a3U93Pp4725dV9tbmo4%2BleW7Ywnb2TLiPfmh9cLiuLNmN9tJCjY860SSgzern63CfTifQSaDQktREwDhQe0JXTsrh6yq9rh3i%2Bb8mPpxRJL050RHR49MaVu1nFpQesQlaRdfSLs7m8akExmIotoubBYnMZiRCrQ4v7FUPNlt6img6SzJKEDV%2FNZoCYSl%2BxaPo7GloQ%2F9SxQtWJ12FM0YE%2F1%2FewFxzUEVd%2FdkvZHcYg%2BygW6uEusoCXBmznaIVxLVavJJaA73Gs%2FQjQanFOPEoH4QHQ5SGXllHpaxcSdqB7ynLGJCJDVMWklwzD6uuDKBjqkASCH%2BJlkpwCKYnHfqE%2BQvxXrdUj%2FbkQkENkEnFOK%2FvY9p%2BA1T0qTNjbbhQKs8GXiv8rdcybAEWfAwXj89ZTfYh4TTnO28L30OXOUEAqzl8sCeq8yS9LyjVQS9TsIn4SLC2B0NbLZAzHdMYvEya9T4RBnTQh%2BhCOMwfPtCfVlY%2BvOjHjs6ABu4COWxyXxj%2FHjY1wah%2B3VifguHWnjXJUGN8et8fpD&X-Amz-Signature=3e6c06e152d1991514f1e30b8842c8bc6999f94c38a5ce6341cebc1f145c97c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMYYK7ZM%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIGrTlbyoXdOAmNULVeb%2BTD1wtewck1clvisx3%2BgQfSwnAiBI1cIHcqBQUZ8Hoi7%2BQM1YKqdRi7aqq3bMe%2FN4E5KbuSr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMBsxwDbT9LpGNlNGkKtwD%2Bf4jh3TX15Ov8iUHhi0mmj6ntqEkUUflX1xFpIBwCmfNmzghZXcvmYlpCOUUdmS4RfiL3er%2BN6HSRnj9pgESmwlD88xlUjdB%2Beeohhw8gsmTHXRm9ftyJa1%2F6xOZFMf6l4I%2Fq2rOdIFJqBy7b34MevcqEKQ1MQ5SAbt5UQt%2BK2gKfrL%2FyNSnPjR1ykqWECUJu3i6ywT%2Bx8b7PYDVZxhke8GN6ap%2BGCNJfcmyqEy14KxJ7ZBkAiAtOvbPkoYdzPmtw3EvV%2BnRu%2Bm4Xp%2Bqz50rAjzpGzwe%2BcE37gHK01WkIY04zR4Z%2Fj%2F6GPv%2FEHoH%2F5qFjq96LN8LD9tzW0hJg5c0p0ZxucVeV4nfQzRGy0q%2FJnlfHvbNRm%2F%2F9u9xtjsMQvji0EW9%2Bwr7vfkRDgxim4vrIusyPsH4o2JHqOgZdBMr7BtuYzHPSkyfGgeM1Mgslus1%2BnynAmPU%2BcMFHqClyRIaOqo320%2FbdN9XzMbTcO1cC34%2FkPGfyM1qbNjHHUmikyQ7rLin9RRhHjvoR6U8r0J52Wm%2BykwRf5skG2OwP3skCoB8roPvacBZsN8hWhl7346TVNFum2prc0WfKH%2FsKKFeOTZ2O7v033ZVU4YwAKEh%2F%2BjSj5Cu5ffWpKU2VrIwhsLgygY6pgHqYhHqZ7phXgZmdL0ojclfcDc1q0N%2FrXJzytf3OxWjzd6K29TVbEeB8XklguwG3os4OrnGLdRwYidvMc%2Bf9Zk2SDT0bLExrXjkKreeKYLpKeBd%2B%2FN93s8pTaEszwY3I0152az%2BLhjedyLNVtEJbRXf6Z%2B7%2FoSWqi6Ao1r7bLZpUtWNVB4Cog0aafuEhc8lO%2BX6f1NXDM3GBIHb8IFYKwEqMTw0thVL&X-Amz-Signature=76449bb82aad9d596ad471e77b53e9c1e867eeec07b9a972283792631c89b2de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S2A6HCX%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCyQ6wX9VAulb9rWmLHjrN%2BXEutLcMVLh3Z16wWv%2FN%2BugIhAI5r%2F7Dh9myCMHZC%2F6ZiYwSkbpXsq4wI9tF5sW5IeHUSKv8DCAUQABoMNjM3NDIzMTgzODA1IgzOl8QfqIsBCv4ZQ3wq3APDfc8uetpXj3nYQHvaVILRtkUx7LLVn9BnyvXktkwJFIiYE5lqv%2Bn7veNx4qRGQQ2XYAAbLoR2nlSuy7ILF7I2%2Bft%2Fg1zIhEvY5t2n%2FHFIJFlZcX9r8qQae%2BN8YYH6Ms1U2yfx2xQSov%2BBFms0jtXKZj2Hu1m%2BvPKavzCFKOnYJJELDBhof9AGn1AzJdL64DTlPEtsHP27Amg9tTsgFm8ESWBHHr7zYffJGP69tCztTCS71oRKmXh%2BQj54SZ4ku1g%2Fry%2BTXPB4JHf16sGz%2FOMoqvCbWiRxeiTBWsF6ycdkOXLQ6nG%2FjY%2BA82bX4hbNO2aGy4UtVFAUGlhCH8C9PVVHMbKtSTlvMoFvsarg%2B8d9dBwx0KegSBFk7lGRQVWWjQieICdUY84Gv1UNKoZ774VV4yJz1AhsqC8KRHMFuRHhp2H33i77onb63bCIj%2BB94alLVV9xZ12XlLOCQGTn8MEJUMuez7WLd3QKwgZCoKpskydU5HMKj%2BhLmQGCOmVjomz4n5WnghNG1PbVWwapmgiTOSF0ACmO2AGMFvmdsr02Faz0%2FKg2xs%2FgaYuhrhWnPxvVlN605%2BM80c6ogB7ZramYO1sBSWZTI5x6yFinjmBJ1nV9ypD3lseBESSUVzDbuuDKBjqkAZl5PtIi0f%2BaIttV02jX2FM%2FAg7H253WyazlTwDvk7n%2FZ21iDsBNVk3J7Ydi34eghVDqlbsqaEaidLPYTRlAf9nrfKGubtRMx3Q4hJKZSrgOH41aozY3PAKkCLm7GdzZkkVnu9ZkMz5g55d7MDCo0ONdU3nxGe2OQZWYR0wr99zvrRPfr7%2FX48K%2B6T%2B2PQmodMqx0QMoLCSnNWQeFDGNOdMPyF27&X-Amz-Signature=ceb93e9a7ef314ad34b6e34766b940d3067b7ed620df45832ae1393220d8884c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S2A6HCX%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJIMEYCIQCyQ6wX9VAulb9rWmLHjrN%2BXEutLcMVLh3Z16wWv%2FN%2BugIhAI5r%2F7Dh9myCMHZC%2F6ZiYwSkbpXsq4wI9tF5sW5IeHUSKv8DCAUQABoMNjM3NDIzMTgzODA1IgzOl8QfqIsBCv4ZQ3wq3APDfc8uetpXj3nYQHvaVILRtkUx7LLVn9BnyvXktkwJFIiYE5lqv%2Bn7veNx4qRGQQ2XYAAbLoR2nlSuy7ILF7I2%2Bft%2Fg1zIhEvY5t2n%2FHFIJFlZcX9r8qQae%2BN8YYH6Ms1U2yfx2xQSov%2BBFms0jtXKZj2Hu1m%2BvPKavzCFKOnYJJELDBhof9AGn1AzJdL64DTlPEtsHP27Amg9tTsgFm8ESWBHHr7zYffJGP69tCztTCS71oRKmXh%2BQj54SZ4ku1g%2Fry%2BTXPB4JHf16sGz%2FOMoqvCbWiRxeiTBWsF6ycdkOXLQ6nG%2FjY%2BA82bX4hbNO2aGy4UtVFAUGlhCH8C9PVVHMbKtSTlvMoFvsarg%2B8d9dBwx0KegSBFk7lGRQVWWjQieICdUY84Gv1UNKoZ774VV4yJz1AhsqC8KRHMFuRHhp2H33i77onb63bCIj%2BB94alLVV9xZ12XlLOCQGTn8MEJUMuez7WLd3QKwgZCoKpskydU5HMKj%2BhLmQGCOmVjomz4n5WnghNG1PbVWwapmgiTOSF0ACmO2AGMFvmdsr02Faz0%2FKg2xs%2FgaYuhrhWnPxvVlN605%2BM80c6ogB7ZramYO1sBSWZTI5x6yFinjmBJ1nV9ypD3lseBESSUVzDbuuDKBjqkAZl5PtIi0f%2BaIttV02jX2FM%2FAg7H253WyazlTwDvk7n%2FZ21iDsBNVk3J7Ydi34eghVDqlbsqaEaidLPYTRlAf9nrfKGubtRMx3Q4hJKZSrgOH41aozY3PAKkCLm7GdzZkkVnu9ZkMz5g55d7MDCo0ONdU3nxGe2OQZWYR0wr99zvrRPfr7%2FX48K%2B6T%2B2PQmodMqx0QMoLCSnNWQeFDGNOdMPyF27&X-Amz-Signature=ceb93e9a7ef314ad34b6e34766b940d3067b7ed620df45832ae1393220d8884c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STRYWSNN%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T210110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCXVzLXdlc3QtMiJGMEQCIFXVENBKMxy0Ge60ibDt4KtZkzLK0Y9PCAQj4oUKQwX%2FAiAP5D3G0TAHNceUzFJSkXae7gp0%2B2Xz8ES7%2B9H8d%2FQeqSr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMHoUePDiri8kpp1WoKtwDwt42kkjiWdI5i17ijCjylRdblgVFrE1i3g%2F5P9xT%2FVrfPTZPmTyAkCpqxkxLoaEuOFJG0%2BR4mRtHMWxp2T8kXDasz8buadWhVeFtsLiDg1B11Zev%2FqNMxpnJoDTOS%2F%2B%2Br3sRB9Zh3W7OsBEL3zFE55pITBr%2BKAwICAcm0Nc0BHHjMige4sR%2BXlMX0VzgkX7oTWZYjOoS91%2F1jPkiAVgPYg%2B0JO47MaiOZ7yHHHRa8Q%2BA1f%2Fi9dwqRtmaDP4sa55Z27yozgNeZZa3DcuVfIWJ4cfPNwaPg74tvsn4IsmdQG0jVSdhkFu6ilF23%2Bemxsl7q2MtxWT2eQ8SQ%2BvfbQsvufI6ZRfDGNBWHliN3nSLbBO5L%2FWwIcxBCjMw7zUE7uCsVuFhV89VJUnZntP6zv%2FQSGYlSaT9LoJk7IK2dmdpF4SpVNL6WAyajVxvbGXiSz%2FyhJHBNpzvkdkn7DWu6MDp7jXh9ouyooVURGYDswlpvo5lwBn7n1LMVGPRACiXo65KXF0wcCfomD1OYLeDo32gZCNpS9FkZkQPtV6YfxJAmKIRv6RE2%2BkzX8sZYZ63WFHq1ByRfZ3sNnjMyxkunaK%2FVvCITKpA6CdzKGglic64WI2wm83uMt7FMEvOX5Qwsr3gygY6pgFOBQIn4dGdbjgMNL7CYNfTk2X15pi9RZkE07cG256OSWwv00UKrCB8lX%2Fx7AFRcluOAueVolqmS4PKp7hnT4O47YRneRRVJcZ7LBed3Fl2iTatCPR7iB9cshyagcJWAT7NSPxs5vZP60TpXpvwsNTn%2Fyotf2LLXYTciaGYp%2FOG3Q2UbJ7XmYVDaeFnEyGmgEpITU4P4dcuUG1B0NntNTgOWt7cEwUd&X-Amz-Signature=0b2ce5b8563a9b6128695912c1eb5c37e3f34d52d449b5f4f935cab7aa09fd35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

