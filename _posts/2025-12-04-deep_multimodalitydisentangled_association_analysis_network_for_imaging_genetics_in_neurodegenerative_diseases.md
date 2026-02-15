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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXFKRWEI%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCtbyojP15QXyD5vOHoHfxO6XjirmUbTPtmcc0glgAcTAIgN1uJKzwNcw2ZrisoXsht082iMX50RfB%2FUqKGBZ%2Btklsq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDCQ9KuUQK%2FiMw27yEyrcA6RYhIwHs6Qmw9sa1LyUWWWJAJRpz3Pz68TYM9GujWp4SD3xQF8vFGEWJl1pZaPbO30rSKzlQdH04BQm068%2BsrqJfUNoNfQ%2BMBcghNmvsSbAlDK9ALrenuMDUtcZ9cyxU3uwvu56ydzmBQ5J14vyCnAOgQfaTfEaV7ZBngJ%2F5IocclMjqsduGoC3mNNvx4mtJQrk%2BfMEu6lt%2BdDKLd4FLfM4F9gUH%2FUvoqxrMyDzadbuHGM%2BarryBl0wrTyelh4a5LtqZ5WB6yA%2B9pzGSOEzwMDXDI%2BokCA1t2ekQ6Ops49lemz7yNMkBTRONIEeLc5oV49EKjqa6NLSNrPve4oQUks%2Bggj8sI%2F0%2FqflSHARyPKgl6oCc8HP6FOxwhq%2ByGDi4W6WB6Ud48K3r4MhtXSEGq9nJMTIgiPsokfGj1q11ho86CAi1yOUXWXQXzQaoQLk3QtqvEt4FjHPCTjIvaaqwHtr9uFL5ntJp%2FQdkyuoMKxWoqAUIk%2F94%2BFpwwg%2FNTBBnlMkQmp4F1%2Fc08HPJlmoUQhSy3duK%2FB88RqBDKCPHCZcys7vA7ZJny3AZEEibOBIYIT9ExhloSid0SlAo9DFZOQ9HaKSMxfZhZ2zt30SbvP5zIqMojMcA4cb6M3%2FMPOaxswGOqUBiN85JMaEiPbl7LC6Y1PDgp3Tydw3QhN9MEqwz9Sg6dNdtvmQHy2WK2%2BBjcK9mZmi%2BigiKTHLGJCKHGE4O6%2Fao%2BB%2FiS93UilLL5lf2nIMWNsZFTNjOhjP2tNWICICioEyxqIatB00OWhlVlBrrLP0eOXYzYpIy1m7cl5q7chBCw7PYm%2FUA3D5Zg2dvMum%2BbvdQjUkxUX9Tt%2Bw9bIBC6uvaC0TzRFg&X-Amz-Signature=a9d9c9995aadc3802e8464f14de2692ae29f6651bf43b375490ec3fc15f144dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXFKRWEI%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCtbyojP15QXyD5vOHoHfxO6XjirmUbTPtmcc0glgAcTAIgN1uJKzwNcw2ZrisoXsht082iMX50RfB%2FUqKGBZ%2Btklsq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDCQ9KuUQK%2FiMw27yEyrcA6RYhIwHs6Qmw9sa1LyUWWWJAJRpz3Pz68TYM9GujWp4SD3xQF8vFGEWJl1pZaPbO30rSKzlQdH04BQm068%2BsrqJfUNoNfQ%2BMBcghNmvsSbAlDK9ALrenuMDUtcZ9cyxU3uwvu56ydzmBQ5J14vyCnAOgQfaTfEaV7ZBngJ%2F5IocclMjqsduGoC3mNNvx4mtJQrk%2BfMEu6lt%2BdDKLd4FLfM4F9gUH%2FUvoqxrMyDzadbuHGM%2BarryBl0wrTyelh4a5LtqZ5WB6yA%2B9pzGSOEzwMDXDI%2BokCA1t2ekQ6Ops49lemz7yNMkBTRONIEeLc5oV49EKjqa6NLSNrPve4oQUks%2Bggj8sI%2F0%2FqflSHARyPKgl6oCc8HP6FOxwhq%2ByGDi4W6WB6Ud48K3r4MhtXSEGq9nJMTIgiPsokfGj1q11ho86CAi1yOUXWXQXzQaoQLk3QtqvEt4FjHPCTjIvaaqwHtr9uFL5ntJp%2FQdkyuoMKxWoqAUIk%2F94%2BFpwwg%2FNTBBnlMkQmp4F1%2Fc08HPJlmoUQhSy3duK%2FB88RqBDKCPHCZcys7vA7ZJny3AZEEibOBIYIT9ExhloSid0SlAo9DFZOQ9HaKSMxfZhZ2zt30SbvP5zIqMojMcA4cb6M3%2FMPOaxswGOqUBiN85JMaEiPbl7LC6Y1PDgp3Tydw3QhN9MEqwz9Sg6dNdtvmQHy2WK2%2BBjcK9mZmi%2BigiKTHLGJCKHGE4O6%2Fao%2BB%2FiS93UilLL5lf2nIMWNsZFTNjOhjP2tNWICICioEyxqIatB00OWhlVlBrrLP0eOXYzYpIy1m7cl5q7chBCw7PYm%2FUA3D5Zg2dvMum%2BbvdQjUkxUX9Tt%2Bw9bIBC6uvaC0TzRFg&X-Amz-Signature=a9d9c9995aadc3802e8464f14de2692ae29f6651bf43b375490ec3fc15f144dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FSPVCW6%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091818Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIEboNoKE4i%2B0EFoctcRmbw1LgeHw8o5SJ9gffjrlmtDgAiEAvJ2fybwjczwK5tfusm6r6O92fCQ0%2B80ebTGhTmnNiEYq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDCCIce9lqww4IKjR6CrcA8cQ46a0SCdYUDBEt9JWMKkyswNRuaPQ8f4ws2Bb71VD7MAxJkXeYjWxNtheHuLpG9nuzP7Pe8UI8%2BtkSDv6wtl5V1aRUOvfYe%2B7hSq8VFje6OjDJHSWxih5iJEDtbPQ5meq2xfQWbVqNtimfHQtJdtcsTp4AfOWA4gdxPx9lIEGJVk7jvE9r88sO4wYQ7pgjzhJpRWWiNVzluoYLm90wWdbhE4seteb%2F0cydMGxxF2CaV0L8ViHJgxHRZnTFoz34haaVLQGbuaSQbj27qnv2CggSeg6QknVZWUi919pP6Scazgpht0wd490qVu4dsETAWdoG83%2BDRF3C3HuuwsO60FUzttviq3mYX5OKR%2FqpafGhOS45%2FBiI%2F1XIUaaHBO%2FfqPH%2FnrHRMNBU8lf%2BIa9UT1yk4nXqY6rRsoeBuZ0SSevEhS4KPnYJG8rHZhdlWgGPaNrms4vtVsZIAuq54a8h3U1Tf3k5Lsza1O6s%2BwD33r%2FQ6awtThmePuBtVb5gjXltSxEh1gvKUhzcqsWkoXAT1Kk3zQ4L7J9xmpUxiKyqQ5Tg6WGw00criyV5N2eDdF13yDZOfBaisL%2BaYswcpfMM%2FhgSq2yuBu2I6mWvffRWzGIqaq51iCG0b%2BF1AacMOmbxswGOqUBG2Hn3lobtEyujxaDLjTyS7yh%2FG9R8qJ8kwNJ%2FZHDk6Si%2BF32%2FrjFp0mPZf5Ya77yho6LQ1ec0Euc%2BEUr3sto%2F6vqBIHAlTXI9%2ByzRJkXL7cQfB%2F0vY%2B%2BZZE%2BUZg0u0cjxdBIdQrkMKxXT9LjJdw%2BS3fzI0MxDI80hN%2FgxTKB%2FQdfhRG74Rj8FqV3CL1YzDs2utRVLUG1mrg407LwVSZzKkzkjkPq&X-Amz-Signature=1d56f082d8fd402be1533fc2208fb550919611f198b36e0be17bd24bf146da14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVUMIZBT%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCA74rCChcH6zq7Ahq9DnGyC%2BrUIAdGgGkp2R070HtLeAIgBG0D2xFgUyv%2FP8tguuwi02JCO%2FkQV4lKrduBDMeuC84q%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDKtQtYqlKMpSJy4K9yrcA8EvEbEq8Ap8lICPW8NhlaDQw8EJ%2FbUGPrz8u3dAz1abJQsHD2Nw%2F64nhB7JoqdHW5MkricymNLOk1wKUC7EMCc0pUaPuakiEstWkTb2gSKPEBfl4Zuk8FVpozYBhCS9Ocly5UaItK%2BnfJLq00CNMydGww14xpZ1bNLlqAkAntpaWT9%2Bxz7nyMxwc6yTMoYZucF6F%2BwneyfgpLwOkgegyvOnEmaZN1j1357DTai7e6pmQDQjuxA1hGqcouNumPFviFCilX%2Bgpx%2BTOD7W6YhH21zzcpr5QZNfloug6FHYYTF96PydB5QzBytRFXr2aGVqz6xaAb8%2BQBPsAC53QNb5hYAK%2F7JAL8hqqr2Y661aaUKySRLv7q%2BsnPh7dGmMceKpiH1DGQ0%2BYeExJzkm6GFyhaDVzgK78JoI%2BvS8dXSi%2BaMP00PWHmKShWLYKZjKQZua%2FkP85pHhKWf1HVpBALNQiNtj1xK984morEsbaUlSFRqAj5Y1ArLuZ6A%2B9G%2FiM28A6f69JFSD9T0fdGJ%2F6D%2B8M18Q9ng61PX1a1mQkf4zdzRaV1jSoUpZxJzziRNeGPPyiRmzSoDRE9fAN32bwT8SIKxQgD5F88SIEsNFFxEH2vVwBBrVl%2Bs31P3zyEUWMOeaxswGOqUBFa8ae%2Bza38NtjLzIxUV9Y%2FdDBfVvO8KB4%2FsyyaR3Fw3ZZdDsqhH15HFsu2MKv8k2xmaJdPBh0orHO3TQ7LG0bG2EqMgeRg6XbJw3gw1joN4jXo1mVEYZrTBHQdK8ed5ChxoSbJWh9skpuMj8JE1BAlp8fV5PPGNqY7RsppC3sLEAJGdc%2BgZJwYXrNn9f1TvtKz%2Bl4wt2xR%2F80UUh4BAJ0F9oHuy8&X-Amz-Signature=a738643119fbde0ab21961a58afccff27533db0f5c3227656f9a9b5a7bb4b9b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVUMIZBT%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCA74rCChcH6zq7Ahq9DnGyC%2BrUIAdGgGkp2R070HtLeAIgBG0D2xFgUyv%2FP8tguuwi02JCO%2FkQV4lKrduBDMeuC84q%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDKtQtYqlKMpSJy4K9yrcA8EvEbEq8Ap8lICPW8NhlaDQw8EJ%2FbUGPrz8u3dAz1abJQsHD2Nw%2F64nhB7JoqdHW5MkricymNLOk1wKUC7EMCc0pUaPuakiEstWkTb2gSKPEBfl4Zuk8FVpozYBhCS9Ocly5UaItK%2BnfJLq00CNMydGww14xpZ1bNLlqAkAntpaWT9%2Bxz7nyMxwc6yTMoYZucF6F%2BwneyfgpLwOkgegyvOnEmaZN1j1357DTai7e6pmQDQjuxA1hGqcouNumPFviFCilX%2Bgpx%2BTOD7W6YhH21zzcpr5QZNfloug6FHYYTF96PydB5QzBytRFXr2aGVqz6xaAb8%2BQBPsAC53QNb5hYAK%2F7JAL8hqqr2Y661aaUKySRLv7q%2BsnPh7dGmMceKpiH1DGQ0%2BYeExJzkm6GFyhaDVzgK78JoI%2BvS8dXSi%2BaMP00PWHmKShWLYKZjKQZua%2FkP85pHhKWf1HVpBALNQiNtj1xK984morEsbaUlSFRqAj5Y1ArLuZ6A%2B9G%2FiM28A6f69JFSD9T0fdGJ%2F6D%2B8M18Q9ng61PX1a1mQkf4zdzRaV1jSoUpZxJzziRNeGPPyiRmzSoDRE9fAN32bwT8SIKxQgD5F88SIEsNFFxEH2vVwBBrVl%2Bs31P3zyEUWMOeaxswGOqUBFa8ae%2Bza38NtjLzIxUV9Y%2FdDBfVvO8KB4%2FsyyaR3Fw3ZZdDsqhH15HFsu2MKv8k2xmaJdPBh0orHO3TQ7LG0bG2EqMgeRg6XbJw3gw1joN4jXo1mVEYZrTBHQdK8ed5ChxoSbJWh9skpuMj8JE1BAlp8fV5PPGNqY7RsppC3sLEAJGdc%2BgZJwYXrNn9f1TvtKz%2Bl4wt2xR%2F80UUh4BAJ0F9oHuy8&X-Amz-Signature=beba6ed0be72585f65df336ba320a39653acf32014384580a7bbb811433f0060&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663A264PW5%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIGyVBJYviWBMl5NNZH58CUfvwxtFknctyUO7f9%2FjO0jYAiEAvgKO0ET2quQP0hopTtl1ytQpyiPlAJB7zPIBEBoNUSQq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDJOdXpDuH9w%2BB%2BmQQSrcA6mFOjst2Z%2Br3mSZG4HNR4yPFX6HuxPbfr1TsJ0sTZqAsjefslcSS21fznjJeGZvUqry3DlzT7OqCkLs1NX2L0PeHYbvWB6KbQPW5hIDitdwJzgVp2VwvrSrhaFIMk80AW80NGpdRNkX3PiNBkw6ME7nDB2t4j%2BVTZWH%2BsMHt8%2BSYtqqF3se4Fx9o%2BguhsTZbAWEQcVoAv6YY1jTj4CGrg5CQKpX6NFf6zg2CmkxyOMF0Q5l3tZPPr5kQmRPxP2kTQQjJvJ8ZoBTWAwE0RXAGruuRfbrf4o2os2%2FbbHzL8GmojhYmU26d2xsmSy5UlyfEl%2FyhGLF6KXrq3Qsc9fetaRFzLjF5N4BJBXKkT7ZH3USK%2BdO%2BCK5B7yn34tSnTSLc6sYuMROpZXaUXIbzlslyIUljiseHftmFRUHhEJxWkiMYiaCYZHwekc0d3oh1k%2BzWg8Ta9MSZEyPRXy2SEEBZ8hIN1v06OkRR%2Bad0rlLDmbQ4%2BUPGsVHCtENcdzyQuqa5FHBbHf1aBD1uqRMZkd%2FobrUKWOthJBgz4s67aITdo4nrCD281KcdMXHYhQ4pHwF3HesaIwmWSr%2B742tBgrFHJns9Vd9fntt%2B1M6seItOrG5RIrtcl9zST26NR8mMOibxswGOqUB8rul5WYdB5IXdMOpAmWHHirSHO%2BJAXBLOzF%2B1AxOw7%2F7YeoQ%2Bd1rC3BNNV2XsSx5mwgto3f3nW%2B6iqqJg8iqNov%2FSV3BHx8pm2vMmxZf80JzytmS%2Fnb9byxnpzutklA%2FFdCgI0hUWvmpMsrRmSSgwHGY489YDEXlb1VKqDkFX53zL6Mc51XnK%2FHe%2Fym5OeLYPSLNIgTItNE9FB04rnrBAQiKAdOc&X-Amz-Signature=4ba04c04911fed70b72ee800716b51e39df0309a5581a23f3d730e215a44c4b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5XUXRNC%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCICNcLxSK5rCTaO2fSzAXKLJeEL4%2BR%2BLhuTYnPYqtlb8CAiEA1sX%2FYzWU7H9L3cTbric9c1B0cuw6qzcOo95am3%2F1wIQq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDPVUbAfSEnmLjy06hSrcA8pFg44Soukr1GWdOCyWNHP6h0caIYk3XPFAY7JOglvVEOaw4248Lbk5LHIGqdtXqlUqhoYEMaNFJRL3vJvsRecQEunzLoUHRb%2BeR95Kx0ikuZ98xOFhlXAdbLfKeVfyJcke3Mwf1%2FW61K3w3qjr3hGAVVA4dvPCllrXgZo3mplOVWczFZuvRh0rVCISEZTVsi%2F8LbTDeNM%2B05tWWat1P3EVczVeulZHKCwMw4MU4pshrgL2nhF2xuVXdKOb83UIz7ue5Aa1U%2B5%2Bvnu895TNL5BPnyiXGtrHpuGWUGDI%2F2N0nxNrcVGWgduLSMi8lc4fTsBqhzzqsr6qn8KjGWhe7h0XPPWjmlLr0Ib%2F%2BNleVhPrcz19mdbTzdDd1srDNymzDyo4JZxfh%2BcX80jDsWg9Upx4%2FG7O9GufBKevcQM%2BGFR4CBWUwg8qzxH8wXIZtkyPDV1ENTGzziHa4oowp8jvmepKZ3ELIV2w%2F%2FQWubpQPrn2rASFxzrEhc392K%2FKKf4%2BM%2BLob4wJpUUPlxIQeRcO2SE4BkIUg4xQpUkaJEnthi8Ts59wHGmK48tihiRNqrigD%2F0b5AtbxkhuZAPfSCf3YK9UWNY%2FVpo06%2FQFzMuEwNbpyTGJocSYW6cMt2SuMJybxswGOqUBZmtfew5pyxiNY7mSc9xb6Myng4RzN10D5ZZdeSKhhcGcEb6UUWv79PEQAEUN8x3%2FZVHKDuJ0h1tI5VYMbqJco3H9EBXkwv8lXiVOMzjtRH8gHSIJMlk3eVZCibi%2BANh%2FrxRcPYCyVKnQkcfX47P75QZi4ffab0BegmbtVCQAl9XiJ1J3YECY9e5ZELBL5%2Bm%2B9DTcwhICAVlGj3dn01XjbFUip6EX&X-Amz-Signature=1b5104f7872966c438ea77e5aed24cb94f7e1c495f50d695bca3b74fd42bef57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNGZRMUT%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDvXoORbJRe9LDsdJU9rsGY4WU7M0s1XLnObxFSOqRTVwIhAIUgWbqfc4b3FlH1LOLfotHt9F7wPYZUHBLDF948uQjOKv8DCBoQABoMNjM3NDIzMTgzODA1IgwEoRRL89Wzww0s%2Fu4q3APOWQ105dRf8a63pBcGrntCUtPJYVR0W5kEE3GcZn8nyhg%2FFHVRhWxDXP4Y7DKJ7lkAHRe3Ob2GknEb3qzleaUiKv7pCcrO%2FiRhJTZTL1MKl1r97JDrSkmXv9rigTaqvHGDtb1ZMsKqjzBO%2BcZv49rT%2FJM3JXAzrCN6yQFT%2BuhO0el5%2FREcit%2FVBy4X6FE5ale5KMCzTh%2BRycvC3ntzdmljI9su%2BMseStqGhx4Tyyf6tf8PYm52gWr6AtVlOC90PUUxIRdrxuShxj%2F6QdHjgAr7936FqXqysc4R50qM0nUK9P1XmmmlZ%2BnqCwEKnFElmV%2BFnV8lmg%2BVZtu79JXNetijzJaoZIi0jagrFf%2BjEa1F6Seep8aDm%2Ftk3CY0mZQ%2FSjMkesYMFCfkbBYjYbFmd6FhzH1mNVEIS%2Bje%2BlbWoHF9FA0jCKnMExlmY0fBkr5ALskaG3HgWomFQYO0IwmnF3ZZvakwJOWDKWotHlFyTSiGgoHVcEeomr0vvf28BMjl6mlR%2BjX6hW5%2B1kieZuvLWfyX3wvHNTUEfoMAjFzj7m%2Blyfyad6vl6%2F7c1L9vvhHi2sUsyQAGpiERDHopW9X4gJoteJX1gP5TTo6LNd0SPL4itGkLlWBYfTZ1Rk%2F%2BLDCUm8bMBjqkAQaDuI0cAq3nKNzXZmw%2BZj52bwNAPBwL2CPk3SbjBGRXQX4x9ZrlWYFlrCLp9mnawXuV4O%2BL7kv97OGJSZpWeAsicYy9KFgFvp1edSEPwoBYgdnHr6bCiuQRlus9pDsua%2BHxEZcqF5uZZYwBuc%2FsOZxWCUwgj1TpfsKX9o%2Bm55RekpLmx2vodghMv%2Bh9pFZvmj24L2lvh5rSXOs23LQX7GL%2B%2FMmh&X-Amz-Signature=9480b2a3bf6eab95bd92473fa3d90a3ba4a627a7ce6cecf015d056c224847551&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WL7CRYW5%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIFtq%2F6XxgoBvvXGrEdD1LkCfWZWiFP6m0egbWoKNUmvYAiAMcmVkRnZvZRHn910bIukxFJgudY1kwiTrTuT%2BOGQRFir%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMi32OZPnIpgqzCW1LKtwDshX%2FahJ2m55qiS%2F8mFs%2Fxexn997spuVPW142JpieFcJA2Yb5RrK%2FIUMQYJlROOP%2BwiyRZ4YzXQpVLikLIWiyfFQJHCt1isDfGHB8QDad5CJwlMtysJqIWJSuLu5DOFbtxTGQjeFA4oB6Hu7Bv1FLhWWSw8v%2FlrdEJJfpes4qChlLo7N6hRdy3ASGYu%2BRMy3bANrLbA0okgvUpiD1AwUj0Fes3Dr3HmMWww%2BVEuBJ05LxddAxVL6G9xQKfeoU2Ei4qcmuhmrrREJJt5nFsJ4MS5DEE4SmnULDxy4J%2BT6rYbJ6kwGSV3BKcIuuo%2F8IW5MA0uQ%2FCxt1f1AVHA2dvQ51d5j8OjTi5R4jurxUNk3qQd3wvrb%2FhFg4bvmup%2FITafX5mwqgnYJ0tBXrsrKZUL8l8ExQrTysush1S21%2FpHDI5OnnJ2uYVJ8e%2FZOLedWgvzk0C591KsH7%2F9%2BNdwGi5al%2FOMzvbDxoqeXMZgM4UeiFshqC%2F91txgYnKDgh6DnxrAvFsyYrnKVUkADZuO0z6ndC4huKJvio8rT0CSRCSIl4HLPOwuqHuGZk483TneFwqjEUJFILnUQwST3xKawlVKff%2B1d5iZtNjww6aZE69sfAIEqSCsEShlnls3sQ0GgwtZvGzAY6pgGlZT%2B2G8Y1okzUr0EN%2Bpv7Mk44AYs1YtmUkfJ9KJfDhGb1D%2BFv1keAYJ7dDJPY7igPTL6eLuz3Ug54W7hj5C5SIBzp3BSILsQx1AxZBJIGggEqua7DjZeXT%2FQRdOXaWnZBp7R64MVhyHCQDOPzRvQjAw3L2DKjwDNEpcQ6mRktJAQtbqGE%2FRvG7mgu4JxlpAFlqDWo1ORUeXyT%2FjjWNFvrHHxrEM0d&X-Amz-Signature=76d12bdbf60035036f816a7b06bb5e16f882a9a08e45f43287a30d9cf1a8221a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WL7CRYW5%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIFtq%2F6XxgoBvvXGrEdD1LkCfWZWiFP6m0egbWoKNUmvYAiAMcmVkRnZvZRHn910bIukxFJgudY1kwiTrTuT%2BOGQRFir%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMi32OZPnIpgqzCW1LKtwDshX%2FahJ2m55qiS%2F8mFs%2Fxexn997spuVPW142JpieFcJA2Yb5RrK%2FIUMQYJlROOP%2BwiyRZ4YzXQpVLikLIWiyfFQJHCt1isDfGHB8QDad5CJwlMtysJqIWJSuLu5DOFbtxTGQjeFA4oB6Hu7Bv1FLhWWSw8v%2FlrdEJJfpes4qChlLo7N6hRdy3ASGYu%2BRMy3bANrLbA0okgvUpiD1AwUj0Fes3Dr3HmMWww%2BVEuBJ05LxddAxVL6G9xQKfeoU2Ei4qcmuhmrrREJJt5nFsJ4MS5DEE4SmnULDxy4J%2BT6rYbJ6kwGSV3BKcIuuo%2F8IW5MA0uQ%2FCxt1f1AVHA2dvQ51d5j8OjTi5R4jurxUNk3qQd3wvrb%2FhFg4bvmup%2FITafX5mwqgnYJ0tBXrsrKZUL8l8ExQrTysush1S21%2FpHDI5OnnJ2uYVJ8e%2FZOLedWgvzk0C591KsH7%2F9%2BNdwGi5al%2FOMzvbDxoqeXMZgM4UeiFshqC%2F91txgYnKDgh6DnxrAvFsyYrnKVUkADZuO0z6ndC4huKJvio8rT0CSRCSIl4HLPOwuqHuGZk483TneFwqjEUJFILnUQwST3xKawlVKff%2B1d5iZtNjww6aZE69sfAIEqSCsEShlnls3sQ0GgwtZvGzAY6pgGlZT%2B2G8Y1okzUr0EN%2Bpv7Mk44AYs1YtmUkfJ9KJfDhGb1D%2BFv1keAYJ7dDJPY7igPTL6eLuz3Ug54W7hj5C5SIBzp3BSILsQx1AxZBJIGggEqua7DjZeXT%2FQRdOXaWnZBp7R64MVhyHCQDOPzRvQjAw3L2DKjwDNEpcQ6mRktJAQtbqGE%2FRvG7mgu4JxlpAFlqDWo1ORUeXyT%2FjjWNFvrHHxrEM0d&X-Amz-Signature=c90228f52b59da53e7a4322a6d6a952d573ec2de41e61fc3544bdcb716151569&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMYV6OXE%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCFxuxcbcuD54yMhjxFGTEtoOG%2B%2BaBkcFyCwtOuVo1DmgIgRElCr9O1PXsh3sTKkWnVnSs2KtpldgK6%2FVbjs86%2F%2Fjkq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDBMRxwEdBOaTQi5F4ircAzmnqKEdT5fwmPdeq%2Fl8%2F4W7PyGM9uXlUBTJpEMv91p501PQhxjUv5Kt1LayB0j795o7DQo2JQi4wdP%2BMiapMgbZLvHizWJJJ6xmMyq6Um2inTXN%2B6bggv6%2Bw8Ohq09uInt3J71noHQrMgM9MuOudLaJfDxkkAh7e8ncNLx5PY07PDmfNHuF2%2FIC274VM853AOs4sKVz2E4f390MCZ3nio7k7gkyF%2BDFR4jAPOw5aMdWIeguexXVgl2Qs2gZPdLfIOsZsoRbjTEvdgfzO0IU4Ovd%2FrkMmSQbMcVATLHpa3r8RtzKYPJfxR5%2FdZVNFEHyxxQH7HxW4Lbz6C0Gtc7J7DQ1nZa%2FVN15g07NiJVrJwvsxS0NJ4bVjaM8ZHHlaq0b8S19OkbjxytyKxGCXaaTcOXQuTFy%2BeyGa%2FGm%2FuEFenH%2FDKBaxMcgZHlJVzzXc8q6fitRt8jCVRJkhEzySr%2B%2BBo2K430qwwv0jqOhyZrv4hjUBPdf0Wd%2FvjI8pMZOmbz8Rx15f71mxL6U3SPZXxeq5Ylj09uLS3kD6hgp1Oa8FIjw5RPZaBUNSJUdF1lG9deb4%2F5GQwcFt6VNdu8APj38uWydMuY5NabXraogWoCgvq9%2Bamrqb20a%2FPhyDVcpMLWbxswGOqUBT4eXC7BqBbzhjvGmf54SX84zopwpeQiitbj5wy8F3tB8X%2Fv3gzxgLykEEcZoltGf96SI1RCP8SEHwZSJzjZZRZVbypUXEEbXFdyuY4YUyG0YrjBaOiP2B7Agondec2rhV%2B2w%2FFYTRo6Pi5RwJIm4nxM4PCV32XD30nuqIuH0vyjcljVZTkdrFXVIwEpMKtjGOpv6pmpaYPUiby%2FwaWupa17Caumr&X-Amz-Signature=8928ceea273cbf9626825c77e719f63afd94bf53458a7d3b3ef980997a225ebf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJRMCCWT%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIEeLC7rJFwn8WEpxZJttetvBRnTIeM3g10gF3ixVjWIBAiBoDBU0pUkrV4Q9m4tARnQwHzIcumpzoSwuK%2Bu%2FC2hPNyr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMM8hHv7yHfjNoRSf0KtwDcW8qL9vAgKBBzIbHM6yYmzIaXtLhtuE%2Baplrfk2FRMFioifXpya7rtsMhDsYb0FuPIdKGiHtVmCALfPcInU8ypZuwCfgQ2SF%2Brufr19ycfpqANYZtRffErqOjCzl0CEM6%2BC13Ep0TM6zOkWaBu4osFZrNhTT2lGtQ%2F3yUtnHXBazxvJ6Nb1R0BEMjCOwkel19yWi%2FVYw939f54SuUYD%2FmgFzMHC4UMZXAdjT8Vgz%2BOYM1QGhszF80mQOhgDXtYyhlb535ABdonyLaPnBAShJCSXtQjHBHUh5P%2B7Up4pl8GMTl9KlHQOfKFpIfyMaU18qr30fijPYRLAve%2FcIF6CmEJrXy32Fmc42syu0Z5uog7wBe898Pcaa2gbq4m%2Bda%2FJwlUYjfwWu6lDxGzHUI%2BQEVN8mR%2BEmo7z1mDHHQo4whVQIyK52SUqIYF0xj%2BRK6IN99eNqHQuTdbEFttW0TPdjtH72w0Vn16Ob1tDoNmHY1U4s6jyvtB58HJzKNHhTmsevtsKxxoo25D9%2FkGxsosFJrftaISdPsvHAgpE6j8FO0FlsVIjXqOUrJY9nV0OPSmbvm7Xsb2E7JrR%2F7xp8lS0KAlpe4BJxKqAl7rYy2G5Ofpp1xMm0er9I7dfHNxww%2FJvGzAY6pgFXfIILyuJx4bmoQmKrP9vk0j84oyZJg8D%2FuKOZg6vPVH%2FgCqvWynr%2Bmzgrq29uESfMz8ugwe0zR0Pb5%2Br4CZPUp745Qda5jLyMP0ZVJTTVYzq1dTQ%2Fvj7CJwcC%2B0ahGluEJ%2BUKPz9Wl%2FB%2BptLIv3NxAHaf4F4zyFxR%2Fz8fDclbKJmKYHXGXVELtU9iNmoASqePKmzHGSJOQoETUd7NXJjl3i%2FoFrFJ&X-Amz-Signature=5e0170ce09f190a66003faf552cf0bf49f806c3c85e6c5d97dfe5f18e9a5b9d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJRMCCWT%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIEeLC7rJFwn8WEpxZJttetvBRnTIeM3g10gF3ixVjWIBAiBoDBU0pUkrV4Q9m4tARnQwHzIcumpzoSwuK%2Bu%2FC2hPNyr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMM8hHv7yHfjNoRSf0KtwDcW8qL9vAgKBBzIbHM6yYmzIaXtLhtuE%2Baplrfk2FRMFioifXpya7rtsMhDsYb0FuPIdKGiHtVmCALfPcInU8ypZuwCfgQ2SF%2Brufr19ycfpqANYZtRffErqOjCzl0CEM6%2BC13Ep0TM6zOkWaBu4osFZrNhTT2lGtQ%2F3yUtnHXBazxvJ6Nb1R0BEMjCOwkel19yWi%2FVYw939f54SuUYD%2FmgFzMHC4UMZXAdjT8Vgz%2BOYM1QGhszF80mQOhgDXtYyhlb535ABdonyLaPnBAShJCSXtQjHBHUh5P%2B7Up4pl8GMTl9KlHQOfKFpIfyMaU18qr30fijPYRLAve%2FcIF6CmEJrXy32Fmc42syu0Z5uog7wBe898Pcaa2gbq4m%2Bda%2FJwlUYjfwWu6lDxGzHUI%2BQEVN8mR%2BEmo7z1mDHHQo4whVQIyK52SUqIYF0xj%2BRK6IN99eNqHQuTdbEFttW0TPdjtH72w0Vn16Ob1tDoNmHY1U4s6jyvtB58HJzKNHhTmsevtsKxxoo25D9%2FkGxsosFJrftaISdPsvHAgpE6j8FO0FlsVIjXqOUrJY9nV0OPSmbvm7Xsb2E7JrR%2F7xp8lS0KAlpe4BJxKqAl7rYy2G5Ofpp1xMm0er9I7dfHNxww%2FJvGzAY6pgFXfIILyuJx4bmoQmKrP9vk0j84oyZJg8D%2FuKOZg6vPVH%2FgCqvWynr%2Bmzgrq29uESfMz8ugwe0zR0Pb5%2Br4CZPUp745Qda5jLyMP0ZVJTTVYzq1dTQ%2Fvj7CJwcC%2B0ahGluEJ%2BUKPz9Wl%2FB%2BptLIv3NxAHaf4F4zyFxR%2Fz8fDclbKJmKYHXGXVELtU9iNmoASqePKmzHGSJOQoETUd7NXJjl3i%2FoFrFJ&X-Amz-Signature=5e0170ce09f190a66003faf552cf0bf49f806c3c85e6c5d97dfe5f18e9a5b9d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HNS2DWP%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T091828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDoFvUud8cTIvTC4cUpapGCLlQuB62rPQabiYNEmzduSAIgX4HLibrM%2F0bdMub06E7Zazka8NXHCVrRnecxGKdmCm8q%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDNBSlMlEpVouivn%2FHyrcA7CZIAsVUGkGQIfPr283k5yrb5PQlc%2BLSVgZPD1ULfx1zregPxN04LsLLOsD0J%2BUuOX7HoBcC6SmBg045iITTGVf9dCa3fkR59ZxtEOrl%2FAEqOSLOjXEEIbuqvhW0HdjDwWEViWhicap4hChIuyL%2BDMpSYwo7ZOF%2BiYQGq8n0gdL7LpEloLnUx5rbWHV5QDv96ZP40F2G7pDO0Iy%2FtfUHKx6e3dJWDb6bgOzE7CfLOQifIJfDHNmlcaTZxfJVlscVRVkKaq4UFvfUubHnViDmF0MK97eIAvCowkBonpRZnuCyrpzvm%2BGM50dDKtUFViujRXxcuZ%2F99zMZmJ9KJ96AFsJQTTjknYnnmLluOYunqQXRFwJpPmKKHxt8TOmmWMOweqypXlSIIMDLwdwoN7Dgj3%2Fe8mTKkMsN74m2XiAzxOpOi7iRAniPCXgdA3ka20S9k6FU2lvIIT6jpoNfVVsqdPM8xbpPj7HCmRZDOk6XjsY6zpmtn7xV6qlvTvaYaPdYwnd7JOPtrdB7U8pjPVq29jWieVejaOw9LCQDXXJKqV0WZPWSVq2IhQOPckgoq9qgPZM9XiJTxoziTy%2FLILcM%2BYI6viiuYjzASUGheU7xiakEdPQ%2BvEXuuwV1p9PMJubxswGOqUB2Fb51UHOzbY%2FaqIS2JKn%2BK9aZCLy99t5%2FC9pQ2u%2Ffeqx1QcUOyyinq17G7SdAUnJrOUdjPYhS00SXiMASGizQ71lTu83md2fR1yMchOY4m9KSqxtV6sUB9ViOx%2F5BuZXiYY2mNDLbBxxXtcvLT94HuY3qQowIlOu07ttnePDnZJsbAdHrqRWLodabzLLFIppqctYrtt7xT8sp70%2BneW%2FXlD74k0d&X-Amz-Signature=7a07db2a01f02fd460c6eb519da55f872ce3d345a63563d8951dc7b47c5c063d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

