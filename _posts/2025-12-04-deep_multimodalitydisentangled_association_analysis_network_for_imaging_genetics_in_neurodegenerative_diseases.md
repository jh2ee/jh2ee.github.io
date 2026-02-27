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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PYFRTLC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQDeoCyN1dNglAjtOEVbNIBp4NKqoBLoKhGg%2BwNIDwozmgIhAMwnmIKzdClTAL5xyopkqA%2Bkj92NfbwjdiA5KUgJ0U6yKv8DCDwQABoMNjM3NDIzMTgzODA1IgzM1xYHtX3xm87Smeoq3APL5S3K%2BM5aRB78NzTCoNTK3jsCdGe2M46jNks4gC0B8OvAXfK2DnMtfa2AzTGtlvHpwVJV%2FwwQ3A%2BQd1lj4RZQ5fQxMeXijEFYhErqLrOCF6bZDc%2Ft41DVVVwsYLkoBRqxd%2FW3Ga0rKxwKX551BNlv%2FzdxtUZduz7ASOwfJEsw3mfCG3%2B1HKO4kc7cBFJFBrpl7X6FYAY928OyfnoywuXATTsW6nd6k1eFCe3N1h4LTiWXSNCjj3SsP5Wcqut8OGYTZ7UZDT6abH1frD48LWdAIZKWhLt%2Bhbjc%2BjH1rye%2FVr7Pnjqd4%2FEGSxEOL9u228X0eAewLkBBiJBRzPEeuqBgOnqNx2YnUU7IpkHpoxM%2FSRcb8YFNWXP%2FtjVOZy4SoPm9pbB%2FKw5xmimrxVcEZllOPPDNmYDy82VhvBvpLj1%2BEJk1Hr4pQg0s4tbwklVhIfx6kwicTPsUJvJxLDzn7OczEz%2BEi8cmXULP1%2FNJAsxEQWWNw3k3T1q6pvYOnebyUNRFUSghJVN9Pwlro6M5IAUD8eSPu6t0j%2FaG5S2UqnMbkzQjffsSKhg68CHToOFdlEtuI9RBdVOS1iGeqRJ7jlXeN8vz7tT%2FWGUqz2nj5AH32VoM%2FFQAX7zBfBVpszCd%2BYXNBjqkAXN6z%2FqaPtoTgWvhGqVg9NJRH745jbiIcLkZXadqd7UNlI9Mbbp48cqYo%2BKp1K%2FVtVnrhE2Jvy5lieomjcbrjb1cBdgoruu%2FbcdCUAAbWVlD7Z87vNX1uLifdTYJV%2FF51456T5XTLL82dIWCulW%2BC07g8ErOFK%2Fi1%2B9enqKvJ%2FwNGFhdoLpqkhLCCslc6a58azMlxWrLYhlDNc%2BwLIgkphhdGHzY&X-Amz-Signature=40afd85d98a3844c605267ada6c014170892c9d2e82f2a3239f6faf075814dad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PYFRTLC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQDeoCyN1dNglAjtOEVbNIBp4NKqoBLoKhGg%2BwNIDwozmgIhAMwnmIKzdClTAL5xyopkqA%2Bkj92NfbwjdiA5KUgJ0U6yKv8DCDwQABoMNjM3NDIzMTgzODA1IgzM1xYHtX3xm87Smeoq3APL5S3K%2BM5aRB78NzTCoNTK3jsCdGe2M46jNks4gC0B8OvAXfK2DnMtfa2AzTGtlvHpwVJV%2FwwQ3A%2BQd1lj4RZQ5fQxMeXijEFYhErqLrOCF6bZDc%2Ft41DVVVwsYLkoBRqxd%2FW3Ga0rKxwKX551BNlv%2FzdxtUZduz7ASOwfJEsw3mfCG3%2B1HKO4kc7cBFJFBrpl7X6FYAY928OyfnoywuXATTsW6nd6k1eFCe3N1h4LTiWXSNCjj3SsP5Wcqut8OGYTZ7UZDT6abH1frD48LWdAIZKWhLt%2Bhbjc%2BjH1rye%2FVr7Pnjqd4%2FEGSxEOL9u228X0eAewLkBBiJBRzPEeuqBgOnqNx2YnUU7IpkHpoxM%2FSRcb8YFNWXP%2FtjVOZy4SoPm9pbB%2FKw5xmimrxVcEZllOPPDNmYDy82VhvBvpLj1%2BEJk1Hr4pQg0s4tbwklVhIfx6kwicTPsUJvJxLDzn7OczEz%2BEi8cmXULP1%2FNJAsxEQWWNw3k3T1q6pvYOnebyUNRFUSghJVN9Pwlro6M5IAUD8eSPu6t0j%2FaG5S2UqnMbkzQjffsSKhg68CHToOFdlEtuI9RBdVOS1iGeqRJ7jlXeN8vz7tT%2FWGUqz2nj5AH32VoM%2FFQAX7zBfBVpszCd%2BYXNBjqkAXN6z%2FqaPtoTgWvhGqVg9NJRH745jbiIcLkZXadqd7UNlI9Mbbp48cqYo%2BKp1K%2FVtVnrhE2Jvy5lieomjcbrjb1cBdgoruu%2FbcdCUAAbWVlD7Z87vNX1uLifdTYJV%2FF51456T5XTLL82dIWCulW%2BC07g8ErOFK%2Fi1%2B9enqKvJ%2FwNGFhdoLpqkhLCCslc6a58azMlxWrLYhlDNc%2BwLIgkphhdGHzY&X-Amz-Signature=40afd85d98a3844c605267ada6c014170892c9d2e82f2a3239f6faf075814dad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IPAIBIO%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCcJTUu7GrfdXyfgMfelKQ0bwHlfXu9oBFlklzKt74oawIgAh2bmUDavtLU7n9VbVrjmYju%2Fb2xbT1dvnRlIVbwffgq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDJxkWU5o6xwgSs3aYCrcA3w7n2Y%2BdeHZ569znJ%2B4B7SMqBhUDiF4mxFa8SuMwIsSLNR8JgnTM5rV22%2FvrUQdOY8tV8s5XRavEu3RRsH9eJEsYEMP8si1TZrSV%2FYp5gtOfy2zbc%2BK0K4uKiF%2BrgJv1MzmaybeTJBEduMTNTu8EPn1sHh0dvZsQTpT6YCxPTO%2FUXeHKVdrV3%2FNmyPMeEc1Ms3fF9DF2dyC9bswGCzwQDKEWdBwwccUllVMo14RwUSVDnvWHffc%2BDcZJLRQedkRh9v4gDjKjW6V3184tZFk2jInC2V%2FxIlMsrLQKdkkpFqCaf0EhSxJEt2emeGMkGpodDQ6HFWeUFr%2BnPurH6ltSO7kmJkqhNl8bzlqkUcdXU0IWT2fKsJhtXl%2FiNQwmHo7FLDsKyAG7MyDCj%2FmLEMOAiblIkFdJrvvcKIgFBg416QYnfzeZVNzU8rt%2BLi8T72OBWv%2FnLXjp%2FsDp24pjcZxDxdSV9wlC1eJDGJ%2FoznIyW1bF%2FuMt1yAjXGCMqy1llq42IQMCz6VkriPWGsHQxhQAT4r39b%2BaCiu0ETsV7OTdl4W83MZ83FKHLqFbhgY6uepmOx2V0ZM61TETYWd64kgv12zzcAk%2FVmc%2FhwE0D%2FBtx7NFaVSDYFXx1srbM7UMKz4hc0GOqUBqtH3oFkiIzON97C7jaAL%2Bx6uM0RRky1mwnZ3Srl9xXg20js5REaKIgPsITyWjupuDmF%2BHu9HCdiYUFXiwyIw%2BO1sYGZ0o0SkvxosZwqdntko6K5A2twbttoTvupPNe4AaJiNKGgF2j0UCl2pK%2BS4P%2B4NNGQYKY5TCqTN0pegUJw8NrEKmiwDnkS3QLm3B9TSIHdJ6GxdjT%2BNL5ivysV72lRDUsmL&X-Amz-Signature=93002c171329a267f10ae82ee7f505a17afb77eaa322c833fb1d3ce194730ce4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXDPQQ73%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIG%2F97SzCOCmL370aU%2FlJIZjoUV17F4t799BwcS%2BqwlFjAiEAi7VX5Irdqlaph9YUfqdkZVGd3iRX0lxCxv74WaK1cNMq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDKKikkg0dtr0lKXq6CrcAxjfH73YMHw%2BSMhp7%2BClm7KaBqSqxpIz9f0Rlbs9wpH84vHm8hnS8J2VUM7QkFAm1Tr9s5qk%2Fu4X8%2BKKGN0JqSFCj4DIXVyE6i3c9jXg0QuUZq2j%2F1MBAMI797%2B3YUyX%2FNBj8yNH%2FNYwoVLfVtB89D1llRTkwNEixQ5FOfx6XMQhqX%2Bdl%2FtkgBNE%2BW%2Bgf%2FvrPMa5GKsFULFVylSazXFFEwh1oHwQcgwoNlvnf6z4%2FhHnRxkUHMV7CSTOJ9%2BrbkWb8TOGhvesXEVYW0hXG2cq7iN9pgrPjhbe6gpJHLlCN5iWRyT4bb5RaiHAu0clRiEQfHw4D74YVQQgh1R%2BgH1Oge8CkQJfSSB26WiAd8A6KHjcfezK%2BttSywUIeD3IXWSJiyEhfESs3PmyUdQfJMpZG8gT8gNatrjqgqOmvo%2B0JdU%2BynblCWVMka6qEU3JInirsy94%2BxkcswnipnLiPgXprRfwPfkO7MT9JoF5aZmKX7SH559jELseSE%2F3z1MgjSczgDkFQDt%2FhDxzUvobzIW76mgbdj0umIkoHFaArvNmcjk%2BeP%2FLZW%2FTPXot%2BXKqAuJYSWnOtAx0McS%2FzluxoBG2D4n3wBx%2FMpPlyVWqaYECUcnNC9AxibAEoXHEmHiOMMT5hc0GOqUBMCldQQfyv2igEuGpsB%2FcwZ1sq2j1a1%2F4VvmvTPxqtZo3ULh84r5tIjCaf9xLvi%2FeWzp9XkF0FFshjNyio7vzUVpGCEHYBshmqsN0pKCt1wmcf%2F0GfBzUqvcMGzyXbcweY8dlk5yz7x4m%2BYYmPiQGvBgZjP0MfdEJLu4MWSRNwhUjYkxjGJCt9lPGhu%2FcBwDRu2h08I8B3zMlITz2qJjDzodAgkkD&X-Amz-Signature=04295937ead0e708c086613af75b2c7a4bea42b06047294f3dc441c36c844c2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXDPQQ73%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIG%2F97SzCOCmL370aU%2FlJIZjoUV17F4t799BwcS%2BqwlFjAiEAi7VX5Irdqlaph9YUfqdkZVGd3iRX0lxCxv74WaK1cNMq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDKKikkg0dtr0lKXq6CrcAxjfH73YMHw%2BSMhp7%2BClm7KaBqSqxpIz9f0Rlbs9wpH84vHm8hnS8J2VUM7QkFAm1Tr9s5qk%2Fu4X8%2BKKGN0JqSFCj4DIXVyE6i3c9jXg0QuUZq2j%2F1MBAMI797%2B3YUyX%2FNBj8yNH%2FNYwoVLfVtB89D1llRTkwNEixQ5FOfx6XMQhqX%2Bdl%2FtkgBNE%2BW%2Bgf%2FvrPMa5GKsFULFVylSazXFFEwh1oHwQcgwoNlvnf6z4%2FhHnRxkUHMV7CSTOJ9%2BrbkWb8TOGhvesXEVYW0hXG2cq7iN9pgrPjhbe6gpJHLlCN5iWRyT4bb5RaiHAu0clRiEQfHw4D74YVQQgh1R%2BgH1Oge8CkQJfSSB26WiAd8A6KHjcfezK%2BttSywUIeD3IXWSJiyEhfESs3PmyUdQfJMpZG8gT8gNatrjqgqOmvo%2B0JdU%2BynblCWVMka6qEU3JInirsy94%2BxkcswnipnLiPgXprRfwPfkO7MT9JoF5aZmKX7SH559jELseSE%2F3z1MgjSczgDkFQDt%2FhDxzUvobzIW76mgbdj0umIkoHFaArvNmcjk%2BeP%2FLZW%2FTPXot%2BXKqAuJYSWnOtAx0McS%2FzluxoBG2D4n3wBx%2FMpPlyVWqaYECUcnNC9AxibAEoXHEmHiOMMT5hc0GOqUBMCldQQfyv2igEuGpsB%2FcwZ1sq2j1a1%2F4VvmvTPxqtZo3ULh84r5tIjCaf9xLvi%2FeWzp9XkF0FFshjNyio7vzUVpGCEHYBshmqsN0pKCt1wmcf%2F0GfBzUqvcMGzyXbcweY8dlk5yz7x4m%2BYYmPiQGvBgZjP0MfdEJLu4MWSRNwhUjYkxjGJCt9lPGhu%2FcBwDRu2h08I8B3zMlITz2qJjDzodAgkkD&X-Amz-Signature=7d342c7116b04ddb7a18ae7deb22a130d950aadb9928e7632c6cd5eda8ede3ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKWAJ3DY%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIAPGhlIBJb5yRauN8pENmbZ6hD075SyMSDjoJPQYsMmOAiEAjIA81nKfbW91wGdxXSDfzxsYQrYWrhJ0NVR9X%2Bi80L8q%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDJ4Mx1T8sky7u%2Fe6nCrcA1e75lL76nH85HUGdkYd0Fm1rC7alyppL7yUpFRspB%2BUu2ulyjHMVZrDWKbKGeHSpnEg9uSXuXnuqQ8Z%2Fd%2F286i20oHRnMrAf9NEwI3nDaFP%2BDDOjzF%2BG64lUpWkYrNiRUiUN4iz7paR1tEgJ2m%2B7P5bje2gEb70CgzL3juwzg7JspjScQIRcPPsa0%2F2xv2Z1nKWPDVdTpQIOOA%2BT9P%2BmtemP%2B3cS2K3eEnuzCIo3CLvwP8ctjYX2wBq%2BFUvmeUXv5yzesmKmjyfytXf7DxOYo5HOLk9K00IdNumbiF4pqQvtHiAH6akiqpxO7h5FHDe1u3cLTvv%2B%2FviK4c6%2FMMI4p3Zbm3ZEgaAETX50wtE7qngVMpwHKA2EoK%2Fg4s8jE5Cr2OWW6vsMR2dtmK5otopjY9KFQpj36HtRmRmFcc2Zg6aldByQopsYLOBntz1lHz0lEYmI7YNdxuCS0qwbK67aYSlN3gsHG%2Fx5r0lVBaMEAMsuFMAjsb%2BfQ97hruDxUirp5quxvZWstl9g8Lp%2BnJPHz1R4vPjD9DJCFBZDAoMz3xI%2BwbktisVctfh6dnhCs3fJpXHZXmxk8Icrp6L86bh4h2cK9aj4yixfG2cW6bJZx3sywxi2c5S2hYxyqq0MML4hc0GOqUBck%2FmkkoF65ePcqS39UrAVIPsklPMliaD6MUUJGWATjeO2l7Mza%2FUeVzLEk1U48%2FS1U0EuLrqkafIZor4QEW5PG7I9IeWubdPRIgdEnI%2BnkRXuoKM%2B9Zo0x%2FHDY4B%2BH1mQ%2BDn0Omdx%2BGqfNF5YnAustx3alt%2BlU3LTnWYaxxl5H%2FZF7mGN%2B9E8H605Z0FZnVVhV8a21l2xIKvYW3%2BXhCN48SuBzN3&X-Amz-Signature=0cfdfcfc8e19f187400626bbe161e55198cab061e92e93efcd842636255f5b53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMY7WIZ5%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112221Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIH8fmSVRttclTbf4ASd4lUJb4q9eCR28RhRRqoixg1%2BuAiBNmnN0x6eeOnmt0P28LTE5u3xqJCfg%2BwI7td0SXfuEXir%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMzkRBCtMGaiFOzLkgKtwDru3YUPfnB8rp5%2Fs%2FzBB4RWfnU2csoVknGV0cfrwFuJ6EDqwCqulXEtkfekPF9TmFYuiZNhPegVUB2oS1k%2F0IcUn1w9XyQZmEdBGgSeFydS844YLQIJ%2FTwbYMXs9cMQAecDokzHtgVFS7b8j308rPmVtdL9DH7mykVtA6vpXXKhjYP2vTT6Adc7GShZDjTprDgARfBd1ow8osdYhnm%2BYgTffejIh66TYEdrPhNgcuu6%2Bq5Y%2B36x5VTnGy2MnePasXR97y76%2F%2BN%2F9DkpylsyXyUR42apX%2FQOoopkGphFjQwXj%2F%2F88nrmY2zCGtoEyPIbwFvU4sawe00RS%2BKwPxqRtsoB9eKigJxvfJNHGK6skNgUiBg8pEpZ5gF5xKZHutvcphF%2FwJJ7Ut5pH8jvAnSWSNUY7gX3MOTnkcsfLxLJuFdYlHrbrtagEVBeBsxrS1SkpvqShbpAYyuqE5Z1CY4%2FKKBkQhmBtRjPotlbD4e2ygI7eooCnIsljDsl8f3%2BlyiTZo8sXcnhvBC40NPKvx2F8LQLBeJeo4GDO%2FckzW6CY3%2FRRve5CXEsHCFZ6kPfB1vE%2B%2FhlDn%2F4deOWOg3g%2Fc%2FBRzpbAQoTw1fsZMJmCSBVsjBEDiK2Ce1DHrSLg4GjYwpPmFzQY6pgFvZrn4J%2FJXqu1If17Fz2QT7%2FbUcmjiDKkD7bVFZSsLIiyNKGQokKWwjqYjhdWEyR3aUv9wONNgO48ElwUji4rL1S2vhRoM%2F9AYTDEq9OW34Kpdx%2BnsMlDggnFQ5csK6H0%2BkQ%2BgwlZN%2BzAcCFk2Xk5BmqHnJTHNvjZzn7nimivXddKo4l7Lv7iaFQdDTejYogODz1QAEmuKyi6p%2ByG9NymiQyL8nZZ4&X-Amz-Signature=ddc7dd9e2730a932637889cc520839870a1550cb55f940217284bc4fc5d81841&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKFR65RC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIGoOPGmFWRivN7lcxPG%2FiG6tYhUjXVaFY9hJL65RL8dtAiEAkxv3BnZ4HNkeH3q%2FXQYJPEwQq4%2B3mQwso4TRkfselxUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDGtbEks4lmA%2FWMZUeircAyxWLIb7xCPL2KZwL%2F4VbByfxjIS1W020c2G%2BlTSsPBGHVVarFAjotmfbb0twXWaqVScS%2F7ngy1RL6paD7RJ0st7TBcbqQar0vQpGaMllycuFpFgZYzdPS91OeFG9k375X8WSCkzW%2B50sflX1DNfW1xn%2FmmOJyCqnK%2FmgV7VqjbDk%2FWw4tK3p0ZO3OmBa1%2BNE%2BSsm4GzYihWnIEF1jiOBJaOPxKCxs5EwF7gx6%2BIN%2B85VbicYTIEzffOqQRaQ%2FsWTrqQx5SDxRPR89tJ%2FIwAbatsMUbrdoAHM%2BNOL%2F3jdkTdpB3m2Ga0yv%2FSLAsSKqbCBeKazBfLIFWcqlFVEjtZrXaBMsKtKb%2Bv8qmXFRTbf2bpx%2B5vQp0cHcuss6xE3bOVH%2BK0EAXOjMJuqxn4PrxnoczyrT0QzQ2Ezcgw8BzTaWFkDAtGaQhTzW6sZALeqz1hUA56Vv%2B8AT6bt1jfdYLV%2BlLjQKA2EBjPIJDsWh%2BQ6c9qe3N%2B2ZW3Z6QD%2Fv3Ne8N%2FygiILMnQCLIIvBcAZyYys74Jgz%2FzVVQ7Qlj8NQSBVfLiZN6N4menRtbU6bs1if4%2Fy0Tne9XL%2F8i0tt8UfG0XA9Qpz8XVziGoXgwGEUUrGI5lm8OAN0IfCvdn%2FF1RMK75hc0GOqUB1UFWf11dmtV7uRH3y0xS2lW%2FdYvyHqfwOTq4JObb%2FOGJ5vt6TyTInrVZgRMY0GaE2%2By5ax9mdpPkeRXR1QhVH3KwhCRCCavkFWnPD6MojI1U7kaoXbbKA38xU6pWq67Xm0LEpGURaXjOzK9nMxYvc6i%2BHFpAdzgeZRarAChdXdK4VvlN7fvCQdHs9fh5lHQWakG8LQAXZhFG9MoPQSTnl2aRpGqQ&X-Amz-Signature=ca57474e036e2da21dc9daa04d7c0c19536fb89b91d930cd731d68b5954c7568&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S73NVMWY%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCMuTBQ4MDM13aVzLt%2ByqhBGiwUAsQQwxMYSqmr%2B4yjNgIhAKSNXw%2BRZbxfbVgYAIuKqMLZPsopXj%2FfrG0Qm1t%2B1uuXKv8DCDwQABoMNjM3NDIzMTgzODA1IgyMIvnXX0LK86frBxIq3AMGcwvMXeJoLOIvpcuk5IucZxrzKDdLw5bQ0lytYzTntPZFGAgCdfhckdUAmcW59CzTx5FAF346qYa7mvd8kPWtOG%2BeqDMkWMB5tdlmItCnV%2FCL8kCXLC5fUraMlrrWMtXpCM6FMPXG6qKI4VJ%2BRafYNmo697F%2Fcjm8bJLEWERs9S95x1Z3CYPwhRB6NIvagLnYnYWIN%2BuWpMHtp%2BIeNAu3%2B7TSyJHWnNlxgUQvp%2BwIlyrkE3g%2BHE%2B1lrbh8aSwenw7ZpP5M%2F68%2BJ3PpuZlXTONYr%2Fmv2%2FezzsKsmHSLPEvGwplV6PpP%2Fh%2FeSvsNhDTx7Y%2FdNEDhE883W%2FnvY7LPUtvH1xVyCE1eFdGyRlBBil5P997lCzat5FJ2W9hGUXjEvPPu%2Fvcm43ZPjrslv9ebsOChE0oQJKj%2BslpdTfhg0Wo8NH2dibWqVxiUb6vWzcNs6L4nKKdKjho8UgbhaBmj2jSFcuLKihHQlIrJtVDlYybKY6KMphnXNffSbSlLpMx9kioW7cpQKZLwMqVQ0xN4ekIt%2FMMqkLo%2B1tpyOs7xnkz%2BsXHOQvRBTG%2F%2BPQWW7IKedyf3BtVeEgBqNcPsOlE0aokKwUYeAiqhTK6%2Bzn2VBsXreBV05Ro3c3SZnwtxDCk%2BIXNBjqkAez%2By0wOLcXXgwa7ZvjcL8TDSWx%2B%2BrRikTKtcZUWSH5o%2FMBhEBA4w8mqOqdJm%2FJ%2BHbLHZCvaJhGkNIp5veSPH2ZMHLds3GghXXP1tktiI%2FMfVpRMECEsDokVCp%2FC292QmuoMXSNKHwjbpAvK3DGx5aVRmJPjC%2BJa1o%2Fx1Q%2BrVv1R3pGiyQAGpNY19VApuUrYEe4FYOb3YpG%2F8wD3dTFc2u145SPS&X-Amz-Signature=ce62bc8f82f740ff9dbfe0cd7bd3a46f6d69ac1ed7f101b591b6825080e63e25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S73NVMWY%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCMuTBQ4MDM13aVzLt%2ByqhBGiwUAsQQwxMYSqmr%2B4yjNgIhAKSNXw%2BRZbxfbVgYAIuKqMLZPsopXj%2FfrG0Qm1t%2B1uuXKv8DCDwQABoMNjM3NDIzMTgzODA1IgyMIvnXX0LK86frBxIq3AMGcwvMXeJoLOIvpcuk5IucZxrzKDdLw5bQ0lytYzTntPZFGAgCdfhckdUAmcW59CzTx5FAF346qYa7mvd8kPWtOG%2BeqDMkWMB5tdlmItCnV%2FCL8kCXLC5fUraMlrrWMtXpCM6FMPXG6qKI4VJ%2BRafYNmo697F%2Fcjm8bJLEWERs9S95x1Z3CYPwhRB6NIvagLnYnYWIN%2BuWpMHtp%2BIeNAu3%2B7TSyJHWnNlxgUQvp%2BwIlyrkE3g%2BHE%2B1lrbh8aSwenw7ZpP5M%2F68%2BJ3PpuZlXTONYr%2Fmv2%2FezzsKsmHSLPEvGwplV6PpP%2Fh%2FeSvsNhDTx7Y%2FdNEDhE883W%2FnvY7LPUtvH1xVyCE1eFdGyRlBBil5P997lCzat5FJ2W9hGUXjEvPPu%2Fvcm43ZPjrslv9ebsOChE0oQJKj%2BslpdTfhg0Wo8NH2dibWqVxiUb6vWzcNs6L4nKKdKjho8UgbhaBmj2jSFcuLKihHQlIrJtVDlYybKY6KMphnXNffSbSlLpMx9kioW7cpQKZLwMqVQ0xN4ekIt%2FMMqkLo%2B1tpyOs7xnkz%2BsXHOQvRBTG%2F%2BPQWW7IKedyf3BtVeEgBqNcPsOlE0aokKwUYeAiqhTK6%2Bzn2VBsXreBV05Ro3c3SZnwtxDCk%2BIXNBjqkAez%2By0wOLcXXgwa7ZvjcL8TDSWx%2B%2BrRikTKtcZUWSH5o%2FMBhEBA4w8mqOqdJm%2FJ%2BHbLHZCvaJhGkNIp5veSPH2ZMHLds3GghXXP1tktiI%2FMfVpRMECEsDokVCp%2FC292QmuoMXSNKHwjbpAvK3DGx5aVRmJPjC%2BJa1o%2Fx1Q%2BrVv1R3pGiyQAGpNY19VApuUrYEe4FYOb3YpG%2F8wD3dTFc2u145SPS&X-Amz-Signature=ed5c62145ee2ee84f8d3b5e44deb65769f4620e72e60f0dd0e1cd83506b6524a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UERX74RL%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCUGoz9byef%2FgiQZegAZad9jDX%2BYfRA7VFd8DVCh3%2F7TQIgaDrZbQafDpGIKn8kzGnTPtJcROVSISdEO%2FBQBXS0c6gq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDDpkMSYPCx0faaLbISrcAw1bNpunTg7GuNY9uAuZKVcj4ixd8VNr%2FfSmr5w%2BF8kokqXsNvUrX8%2FuaWZSWTc9SQlmxVP5z7vje847nH4MMEBzS6%2FjBSvyRjN4gkjQodt%2F1sCBH9ecHy4GMI4dcAk3Tlx%2BE44i6gq8EtQ7zkwbp3WHdB6iH9RwO%2BolQql2yfU15IoIlSWNtJD9xGuOWh6aLo5iM97YSDKV%2BOxsOiT7yzm8Yx465x66bc17Sw%2FWpBZOQ021%2FWD2tyKgh0sF5MWQaoJeF5fW3WQYzlo8BFYWX1wnzGEQsRCmNLh1hpJdw6TGBlFq67ivd1XyciQ5HTA%2BrK8hpg%2BXLUbzBMkoZEZyhAtQMFXfu1hdYjo1UmRQg9IsaaejMYrOPnSdhXgQq8NpaEw0OlVi58F6yzdrk8jPQPq1mR3NFOVe13SHoRfu%2FeWBnt2b%2BZ%2Fv7zIQz9fddayTziwiyYuvgcHV7BD7pzEktjNh9magEdEr3DtT4J9qxIWgSUy2bd2jIovVvMbwC6dWNaveanzj3USMXcRyYl1DxUvrP%2BrYbDMC5Xi3RYGlqmoV3Iq4fdLdmkScnJjVxKfxJHZZ607QB6TTyL2kPEiq7R5Wdu2pbZHcDOHQ%2FRHLwqA%2Bkq%2Biwj2rsd5eF6bBMPj4hc0GOqUBP9D8CGDq71LiIPo7v3y6du00kt9QYRd2DTScMgrKceaCo3%2BXPyUarMQXYlzmLkRO2xgW6opAjQiD%2BSfTnBpp%2BWLSxymNgsehOIbuHl3ZbFSQyl%2FzqeVpB55Torh0KwNupaPl0NWLkbyLEOqhbk9YbIWttuv44fIakth8SjDY6tn7ylwf6%2BHCUCT2%2BAuO3BZMcTWAwyrU1ow9d%2F3GwuT%2BjuWk%2F2jK&X-Amz-Signature=0bb6694d3e188c9d67719c72ce51d50ed6fd3d51310291237b7c61e4d4aa1f81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665H5UTCJV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIDrknC4QrVCXL87ZZuJOm35E5tSnUtIDWNfIQdDb%2BZjwAiEAk1TPoln1KsDNUlfD%2BabB5ErKs7a%2BRwX53btpShB%2FJ9Uq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDEr63dj1%2FAHEIWTKqyrcAwIG4aXgoEFtDnL5EPTOfCF9CMUMOTUMp7%2FjLcU9TTasAN%2FKJH3EjpWU21xw607hPOF%2BbhY76IAxY4FMgo8664EVHWQqzxslxG4RgiO2XeDAIaUYJ%2BJnugsFot0uRrsk0HkwnHysJNhcbIYIhITRdsBt%2BO1wT5c6XQQmhNm3U3ZTTUI7Ahrz%2FvSHYUue1wJZVl%2F%2FH7GXN1bT4fuFU%2B%2BvSG7TMCiOcAVntpeCB51DlIEt57QGpNc2iI5WPE5dWztGkCOR2IHEVAF0TziEHHS55TBzVWgxVZCys5gDnnRESYNV5KZn8ipoMKqUYbM8IdiLzCnhxrQVRuU6SmO6okkh4UVFYPwsOlXb3jOtiu5vQbDCMmOwa1P8E9HkezWojK%2FCwArQi6%2BYKEnzDFkq0T%2BV1VlO81R7dkToMdB9hncdq3PPNGrirYzEm6rE%2F5GGDe%2FwKtMNB5RE6zXBqoxv4%2FxUiPiNpt9HT%2FyZQ4g6FoeY0K1TbXSBVQ2oxsgVWEwcq1eJuvpAd3VKel7GxErUJu%2Ft1Ka0zQdo%2FAB2SQNtIeNkzffY%2Fmkpe55MpHvX0H4pHyvolaMGUyUUGfMezQnuow3Kp4tfCkfvZRA2x08fLHzJ01nHkw6FS5%2BNhBa6y5nlMJ%2F4hc0GOqUBcXJw6qw3ot4CeNqqcy78G73GhhSNKRqSRGkCUJQKlLVwlDzcsadH0wcFBpzIhKAfHklGATz44wJdCwX1jHS19bjKlarBcFweinKHtEWhl7DrzgHNGps0Nq0OmGXL94gzKtwOcrqNKOn9hIfNqh8umPIi%2BWlbEROdraU0nDvwH13mk6w9NAc8Wm%2FNZXhHmDdcrjeB71yB%2FMt%2Fp13zkpc%2Bcwx5tDpG&X-Amz-Signature=0f07675153033c67184ec780a0f52264047c567a5d71e525a27349ab5ad2d340&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665H5UTCJV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIDrknC4QrVCXL87ZZuJOm35E5tSnUtIDWNfIQdDb%2BZjwAiEAk1TPoln1KsDNUlfD%2BabB5ErKs7a%2BRwX53btpShB%2FJ9Uq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDEr63dj1%2FAHEIWTKqyrcAwIG4aXgoEFtDnL5EPTOfCF9CMUMOTUMp7%2FjLcU9TTasAN%2FKJH3EjpWU21xw607hPOF%2BbhY76IAxY4FMgo8664EVHWQqzxslxG4RgiO2XeDAIaUYJ%2BJnugsFot0uRrsk0HkwnHysJNhcbIYIhITRdsBt%2BO1wT5c6XQQmhNm3U3ZTTUI7Ahrz%2FvSHYUue1wJZVl%2F%2FH7GXN1bT4fuFU%2B%2BvSG7TMCiOcAVntpeCB51DlIEt57QGpNc2iI5WPE5dWztGkCOR2IHEVAF0TziEHHS55TBzVWgxVZCys5gDnnRESYNV5KZn8ipoMKqUYbM8IdiLzCnhxrQVRuU6SmO6okkh4UVFYPwsOlXb3jOtiu5vQbDCMmOwa1P8E9HkezWojK%2FCwArQi6%2BYKEnzDFkq0T%2BV1VlO81R7dkToMdB9hncdq3PPNGrirYzEm6rE%2F5GGDe%2FwKtMNB5RE6zXBqoxv4%2FxUiPiNpt9HT%2FyZQ4g6FoeY0K1TbXSBVQ2oxsgVWEwcq1eJuvpAd3VKel7GxErUJu%2Ft1Ka0zQdo%2FAB2SQNtIeNkzffY%2Fmkpe55MpHvX0H4pHyvolaMGUyUUGfMezQnuow3Kp4tfCkfvZRA2x08fLHzJ01nHkw6FS5%2BNhBa6y5nlMJ%2F4hc0GOqUBcXJw6qw3ot4CeNqqcy78G73GhhSNKRqSRGkCUJQKlLVwlDzcsadH0wcFBpzIhKAfHklGATz44wJdCwX1jHS19bjKlarBcFweinKHtEWhl7DrzgHNGps0Nq0OmGXL94gzKtwOcrqNKOn9hIfNqh8umPIi%2BWlbEROdraU0nDvwH13mk6w9NAc8Wm%2FNZXhHmDdcrjeB71yB%2FMt%2Fp13zkpc%2Bcwx5tDpG&X-Amz-Signature=0f07675153033c67184ec780a0f52264047c567a5d71e525a27349ab5ad2d340&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUA7YMXE%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T112226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIDHeTVCskA4vs5RUsjNMwWnnTUiUDzyEpjIK3Hgt7ukAAiEAw9Nu8luhBmp1o2sXOXvLwCyNaYENJ%2FEWwqC4vVzS9YMq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDDgsLlYnpm%2BkfVJGVCrcAzD5i7gaJyBYJIs5hiVMz0Fj6tBSneCeGFZpOKfYt450dLDYvL1S4oeKW41lY2DlPyLrZhThj6%2FnDiTqIpXI2KgKwYVV%2B8oDf5zP6TPHyqPh3EfYQOdYVHmlbAsDa5kECOMesi7yeDQA6OrlMpOGWXPK2j5cc3WuREl4gp2obZBvcptydpAwalLQVnkCJhqrGZti8LB96%2B3jKrzbaLatTImqYF9cL4%2BvAS4joHUROv0Rvwq1W1zEBulEVzUUHeezIStJGdHNV%2BCJPn3wOeFMReou36CziCc7YADJLIXFObhpRvdIgffFqFkOsGReFUGUo6BkEs8YtXbtRwPvq1Wy3yfRb9DrvA3lRlJ55DoeLQQdl8qXdjJddDaaj%2BzkLd%2BQaym6iO2oJ5T0fsbsOtUnzyOGR74z5UtxyLkCQMZeoGpjCyPx4oTamoJnfnHZ0dAEbYH93fBkI1vxOFn5n0brZFsohLjiLILPxmajloW8QMNHZheK5vuNLtflz44QwK6kwenKT4zXSnLkyagBW6IryOtEGxQqYfWLOhuRK%2FX2OxjaqS%2FiEezjvc4b%2BFs0wtnBdRUXPDMpvehfJu5HZXM9aQi8pklsQEA%2FwHOFMQO1NvaK6cxZ%2BvQtKg7JJhTVMI75hc0GOqUB6pOpyvFtkL%2Fm2Yxh49MEd8ZSvhb2j2TtB1hVXVJtvwUeMM5sKeFAmPBK52dpDUzeNpIJo5yLCiCJW5i9QwL3d4SlX%2FaBHXEVBxKFL9qoLyVtW68mw2kVabDNMK5YvJfGz7qqgsyflKqMXNG7vhdgpIL36MwfOCz5W7QXV5Wai6r3k%2BbbqXt8jlH3%2FEdQNjszUHKz%2F5OvqdW5HaUxovr4xl1%2B%2B1%2F1&X-Amz-Signature=2c31d835786a87a01275ef53f15e05a23d9e6276194c406bb49d1d3b3d1306a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

