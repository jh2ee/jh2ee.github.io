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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTK5RUVV%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIB%2FHGdlW5nDt1eLNL%2F2coydOj0aDQALCMMSsHfg%2BACNHAiEAitCe5fZC9CqcXht6NquDBrZLtddRklzNtoMZxxRvap8q%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDPkPMXg9tCbQcvZcvSrcA7L1cTOBAepP8ZkwOVqkIAuJ144F1B6Z%2BYyFWeLz8dWUK28xKAmOwTlWwZUzJBEazxmbutiUK6gcfb2O2THajZz3iQ6G4xe9al6jnxRIhHXfmSOGsuXXxXZOEjIaaXuI8IUYY6fvpBKOySlt8OWySNH8Vo%2BP%2BmFq0unUFK%2BUlwbXDMYO7i3H2GLGvpGSSv4SKCn0yfWXn82P2IuYvvFVRA4E8Y%2F6XCN6%2FPNJM%2BYQFnoUEMKQN4Fo7g7eYKRYk70PNn2%2B05De6j25QbY53znJhqsZo%2FeuiESUjMZ6ahZnTJ0ueNCw73jEXu8aeeI5WQBu2bmGeyrGzxglEx8M9ECeoo4%2Bc8gFdiP85nF7Ucylh6sBBsHSuRUXfwWCExyiiHSRGPK92rCIqPCQqcPDDjb3pcWX18KJLRCzX%2F6D8tXT%2FPzSBB5O9OWIhodjFSxw7cyYi0h8rxzqIlekV%2FfPLv1UVDKeTTVF155fSyvXSGypd3QnAHYtZFvE9AVlWboaHBRwTaSxU4fLkPbNfoyJcgxKX7EtffGltYpkdHFDvjG00FxIWihuNVSWnF1lAL92w4SnFj18iD9w58H%2FRA3WQNiHJB4Iaa2R8u0RYS6TJv6xziDqEMv6i6%2BgFdXOkeAVMJWSssoGOqUB4RHktnaNLuHyYK6a7HK5yMcVUXWbTnoP3TWOoES4YrHZtARuWJYX3PU1JxOcbp0oE0D0BY3CIEizKRKYV4j5em%2FWQU%2BAsN3dj1eEKW7mpxhJ3%2BrbQPxW5tdSF2cS4byG%2FdU0lU5GdXZug45mPGmpD6CkPdJ49vezVWEqgNwZh65Hs4LOX7Jnz6dJadRx6NIDYnqP6L6ycPpVKbPQMxrCVDV7swO1&X-Amz-Signature=273bdc992bde831ea000c27644fa7283f2452625d39eb3ce2e5bc86b4ce3e6ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTK5RUVV%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIB%2FHGdlW5nDt1eLNL%2F2coydOj0aDQALCMMSsHfg%2BACNHAiEAitCe5fZC9CqcXht6NquDBrZLtddRklzNtoMZxxRvap8q%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDPkPMXg9tCbQcvZcvSrcA7L1cTOBAepP8ZkwOVqkIAuJ144F1B6Z%2BYyFWeLz8dWUK28xKAmOwTlWwZUzJBEazxmbutiUK6gcfb2O2THajZz3iQ6G4xe9al6jnxRIhHXfmSOGsuXXxXZOEjIaaXuI8IUYY6fvpBKOySlt8OWySNH8Vo%2BP%2BmFq0unUFK%2BUlwbXDMYO7i3H2GLGvpGSSv4SKCn0yfWXn82P2IuYvvFVRA4E8Y%2F6XCN6%2FPNJM%2BYQFnoUEMKQN4Fo7g7eYKRYk70PNn2%2B05De6j25QbY53znJhqsZo%2FeuiESUjMZ6ahZnTJ0ueNCw73jEXu8aeeI5WQBu2bmGeyrGzxglEx8M9ECeoo4%2Bc8gFdiP85nF7Ucylh6sBBsHSuRUXfwWCExyiiHSRGPK92rCIqPCQqcPDDjb3pcWX18KJLRCzX%2F6D8tXT%2FPzSBB5O9OWIhodjFSxw7cyYi0h8rxzqIlekV%2FfPLv1UVDKeTTVF155fSyvXSGypd3QnAHYtZFvE9AVlWboaHBRwTaSxU4fLkPbNfoyJcgxKX7EtffGltYpkdHFDvjG00FxIWihuNVSWnF1lAL92w4SnFj18iD9w58H%2FRA3WQNiHJB4Iaa2R8u0RYS6TJv6xziDqEMv6i6%2BgFdXOkeAVMJWSssoGOqUB4RHktnaNLuHyYK6a7HK5yMcVUXWbTnoP3TWOoES4YrHZtARuWJYX3PU1JxOcbp0oE0D0BY3CIEizKRKYV4j5em%2FWQU%2BAsN3dj1eEKW7mpxhJ3%2BrbQPxW5tdSF2cS4byG%2FdU0lU5GdXZug45mPGmpD6CkPdJ49vezVWEqgNwZh65Hs4LOX7Jnz6dJadRx6NIDYnqP6L6ycPpVKbPQMxrCVDV7swO1&X-Amz-Signature=273bdc992bde831ea000c27644fa7283f2452625d39eb3ce2e5bc86b4ce3e6ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TIY6DLQI%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIQDWc%2Bw%2FOzYOmIf7bdjRkYTH4%2BCRYdRPdNgjrCv12TbCvwIgCjIMesvFylPdHTMz9BgDg4a5AFHxg0%2FODbjZIDS2Ii0q%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDPEFgeQpLGEp8vd2hircA2ucuZljwzZZ6xMzrSjNKFQl15uQd1J57Da2xlRhqRiIZ3YTxXxX4oSRH00LitbNg61zmVPxHq9xtA%2FCvtfaSAq2PfGdTgtABG%2FW929c960axA1els8%2BG0ASfAIndor%2Fh51aCFOAReq7eCmBsfRAEXjXPhh2o2qM63gv4QB9z9OvOJVPYS9a0jYNeDH1Cwkp6hOf6vTUUrY%2FYqW62mT4ATgw3LLCfJ%2FgCWn5ZndlH5h0l2QGANDPnSl5InJB%2F3Hai01c5OOZv0p9eSM1a1HFcZLfcvY6kAP86YqZxE7J83XBkCoHuBrBHH4uEL0vgOm3uuFtEwbJl2mB4ltpWhgI1dEaaLdDXhtKObZoxix6v2AVRFUY%2FSES5KGTsRwyONQ8GYW2CZj10rjYOxc%2B8DUKyfqA8xV0PcnyrH4OUXpqMnc30%2FpJCV5pmg%2BuVTJyJJlgxpk%2FGIQxL2BYk0Ad9hh5JLhdV6yDMt%2FTyyGs%2FTQDPPXhkxZu0jfph2ClhznARqOQWnEdQwSJROZ2edDAOWl0ELEaVBwqssNXbEbHn8O%2FLNoBvYPuKzUqCN%2F5cxIYjxrVr2kyCWaH0v8m6l0713XBAfGxrUsHnwMAOAEi2QHOf71Pj%2Btkx7jEJNT2BJ8pMPSWssoGOqUBog2PHdQHRlUetmtnZbaZnchQAXUv1fuVxRV5uNIeornH2HsmnveQH8nICeISW0b38kocu4jgLO7UpA5CF6hbBweI6Rv2TORJrIkuAcZT4Ekll%2BHFGQUkXWDGaDvEU5c9ESJgmoxfIpBEh6%2BQn6PDk74c35dPnjosQQx03z%2B54BpvBWO%2BrRGHCgoCrtmiWyxrY6JHYTCKbyeHSXdNdsxwH%2F2n87Z%2B&X-Amz-Signature=e673155995b3aa06b0e9b9a245b16e2b359ec08c77df5f7d8a825df60012f167&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDDEGAOE%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIDSZweuLk6unsTQsSboHdl9xc1Jmk8BBOpmr8nD9DaOWAiBY6XMSM9oJmtwrRy41tRz%2FDd7Yk%2Bgh%2FYqhxrsgXErIsyr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIM%2Bmm5YLKgWSs2NObGKtwDiGF0QbmFFjM%2FspUIkDaq%2FHmzXaBG8x1N2wF7jxs4lUNslrwRKEDiVTG5O1v01OERGAM2AffewBm46SMpZmF5hfys0quPNCInTDUCTOGgAe0vIZv%2BfLS4G8mZXoKiDa%2F51Hhicl1llke46uJhExJiKK1nbxzQBcmMdvEfQn416mmSlJt66MbqIX7QlusB6sUaEFji%2BD3azrowA744V3vHV%2FpvpemzLCfiTDGUoZpbalQqelPPorAbxIuJ%2FG3YPWLMOIbbc7a45yJh5%2BVx3O4mwmOb2D4166oSiPApT%2B6zSvHmYbNNl2htd0E0VlrjUTjeU1PJp6l%2FuRwodE%2FLpy%2FqAidhyl4oi7TDedola%2B5BF8pQDKXlZBMW2gwh3rrBELMULhXHK10b%2FBCw6IGowfQ1y8Mjb%2B4IQPed%2BMgUwXRuNxiVmsc0AarnCcYywIyAu1eEnaF4e5t5ph6ysk11up%2FFApfkD3r2t5YJCLwVViZXITdWCQjhINScO98%2BbtVVGjEhN22Q3ArpK1fWFys80TZxde%2FtKt8%2F%2Bk%2BMGhlf4cPJlqGQgg8m6l2%2BaA4lJfK6BM4IT7MWTh290UmRlG2u7mo10ZLY3cDCGUeEW8b5ULlBr%2BIJIedjXxFjF4iyFlQwj46yygY6pgGLpqua%2Ftvxi%2FOn747RH%2F1KeOAPS7WEdOG18xbD3O1H33TuOvSHEEldPPqMG2750k6%2Bd3VNNctKthGejbx2gdn6TTVuiwRVtA9XpE3GUFo3UeeaNZ0ZTjzhub5rWPTyOhjyHcY8j%2F%2FimA8F6ocY6VSH3SY5WjSuTWRoL7MbLQBQtDgTgas5FQ4OS3O5yffV78J5BFePgSh7%2FbHwxVuz%2Bz0qAnTpMePX&X-Amz-Signature=a682ccf28d972675947079b260769a91658757d4c9462e9847eade9ad1e5c27f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDDEGAOE%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIDSZweuLk6unsTQsSboHdl9xc1Jmk8BBOpmr8nD9DaOWAiBY6XMSM9oJmtwrRy41tRz%2FDd7Yk%2Bgh%2FYqhxrsgXErIsyr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIM%2Bmm5YLKgWSs2NObGKtwDiGF0QbmFFjM%2FspUIkDaq%2FHmzXaBG8x1N2wF7jxs4lUNslrwRKEDiVTG5O1v01OERGAM2AffewBm46SMpZmF5hfys0quPNCInTDUCTOGgAe0vIZv%2BfLS4G8mZXoKiDa%2F51Hhicl1llke46uJhExJiKK1nbxzQBcmMdvEfQn416mmSlJt66MbqIX7QlusB6sUaEFji%2BD3azrowA744V3vHV%2FpvpemzLCfiTDGUoZpbalQqelPPorAbxIuJ%2FG3YPWLMOIbbc7a45yJh5%2BVx3O4mwmOb2D4166oSiPApT%2B6zSvHmYbNNl2htd0E0VlrjUTjeU1PJp6l%2FuRwodE%2FLpy%2FqAidhyl4oi7TDedola%2B5BF8pQDKXlZBMW2gwh3rrBELMULhXHK10b%2FBCw6IGowfQ1y8Mjb%2B4IQPed%2BMgUwXRuNxiVmsc0AarnCcYywIyAu1eEnaF4e5t5ph6ysk11up%2FFApfkD3r2t5YJCLwVViZXITdWCQjhINScO98%2BbtVVGjEhN22Q3ArpK1fWFys80TZxde%2FtKt8%2F%2Bk%2BMGhlf4cPJlqGQgg8m6l2%2BaA4lJfK6BM4IT7MWTh290UmRlG2u7mo10ZLY3cDCGUeEW8b5ULlBr%2BIJIedjXxFjF4iyFlQwj46yygY6pgGLpqua%2Ftvxi%2FOn747RH%2F1KeOAPS7WEdOG18xbD3O1H33TuOvSHEEldPPqMG2750k6%2Bd3VNNctKthGejbx2gdn6TTVuiwRVtA9XpE3GUFo3UeeaNZ0ZTjzhub5rWPTyOhjyHcY8j%2F%2FimA8F6ocY6VSH3SY5WjSuTWRoL7MbLQBQtDgTgas5FQ4OS3O5yffV78J5BFePgSh7%2FbHwxVuz%2Bz0qAnTpMePX&X-Amz-Signature=3dc9f5a7e89417b1073074d4b8477ad969d74b960bac40f5bb534b8caee08441&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QJ6UUPO7%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIDjA%2Bq1NwyqsT4No7syDEIk7pW0aaseDCzHZbCQN2sCgAiEAhSejYW7hQF5EOCTl%2B%2B3qKn4fz%2Fc7L471i7L5kA2Akroq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDCFALRb42N%2Fn7nqD8CrcA7gtcylbswtSt3nKDF%2BKmVkyjsIsfAqrWny7oRyJzpWEDeWUSYN2wegDGFDbWET6Vg%2BNIHCYMjjO8gK1PQHdjkWscWNAuAUB7MaAVPCX%2Bqs283P1E8EDgdvbTIfgYqdrpof9rtxu6Xmjm5qAKvEV%2F%2B9KE20HoStMn%2BtOHJYhybHLo5yqSw%2FgDt06%2BZbS7NE62fQusz6neG0r5qCZtax08EPIRWRDOUz193sRn49dNjql%2Bofh6UG5qVZJa9Ehil9gsyHU9PGnNjTT8VaD%2FAF5zvu%2BHbVlRngX5uVWnUGoBP7mrXryMmp9p39Z4JPEM93aqZHFcLZjio3lvrsYc3ZWAGewv7rudrAu%2FvMYv%2BA3bocWIPNLmjhTLLvvAM5ypZNo8ZU6G4oqrqfD1VlXnLVLC%2BjsIkElUPTXz%2B488nDXvYlG10LyQKjT3lnwdBAiO2Cmwoq3aG7lvyr2YTzeSEKtyy6sys1BEtGvE%2BwGs1YlzvkThX5559u0qaq8NWc77H9Eo400m%2FwCY9zoWBjmeyBSZF6Bw9smjKOvmGHyy3Tp5BK71c%2BDtvXFBg52D7i8doCmuIHLG5bG5u6TxI3WzLojzNDWZlB5DIHwWL51dVxXykS4L5jJDX4%2BYdqwto%2BpMIWMssoGOqUBEplYU1vdhBHam0kzECj4KxtC6%2FNNzsnRPvTAva7vao1zzkQTMw6EuswTGcHw4uCIHdYyk0pV%2FbHaL96pPaTMSLwoUaJ5skz%2BcM3mZTcFYnF88XagMQJ2%2BmDd5IkBjr6MBUdR5xt4pn2iSR8MhdfMgk%2FSRKSQbC%2F67jd%2FsOBgjyZXVu1GlUfq%2FVQjVNlj3tk41XMJJ2kklQsvr%2FocoPjendFVsHUU&X-Amz-Signature=736157390e4e6156427f23f8addb4f93d41d5a540a3c06b525a4d724959fe3a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MUWWLBJ%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQDMSfn3LFVwmNhE8UhXcw01R%2BEoqrWc5G4xBhYGtzVDNQIhAJlyvObZqgz%2FGeGQ4OcLxjDnrbWkR7qh6dkHBRBuWXFdKv8DCDIQABoMNjM3NDIzMTgzODA1IgyOkmJygrW%2FP4g5gt8q3AOnNkDwOmouOdN7GFYNSIhAKLsVW6JeJ32lfGh8pcXlHsS0MWqf4vfzerHSAEpNuWSW8AEIDbqzIb1TBHLZOLQjB%2Bo%2FrqwgbH3FF6ydpvq9lHABHsy3BLqFV%2BDcnQv9vmqqCt88MxoAIdff8I29WXaj9SMA4qviL01O%2FMpq02yhLKlkAlCjsT9FquCH7A5rLaD6tVUc1Ebanxyoh0%2BYsfKpVeUy3Hj8jGfka339PTqgJCAcO90WACjkqx4UmKc58LRxI9%2FrMRIiPW%2Bek59HKU4%2FMXkKopfRS2gNCdqvqNQ7whIJcksjhZhNqgsT1xGLoyhay0TAE2kktcJCvc3aKL2uP%2BN%2BdQahsIPFGOHrlkn6wQhhjs4TQcTBEGjXJJDEvDbH%2Bw0arPntnWkEHLplyTyp0N7T3yrAs48cAjuWhZyN6kT58UnMEiVg5WiOXtbuV4l71i87XdoS0atbsuTtXzoxyfqn1p8%2BhdvjTDBD6x3G0%2BI2MIf78KfuVwj280YVEp0B%2BxDUd2zzee0PNlL%2Fo6ng8mlVS0WJ2UG3s6kqvstwh%2F%2FAw1uH9kUuyLmlJLeNabWicaukc%2FIFyCzZ4ahOIY3uVrfAlU9B%2BBWpyhZuJYUsWAZJ1%2BlEGVGK13sV7DD4lrLKBjqkARD8Kkyo69xuI2Si0cBaJgzYhYyKsDmszL4IbNwb93orhzfJ8GF2RbbxllYhPwoId4oszCvaLsFTUgy8my4gMT9ZW1LhO%2FnKpepFoFSe2fuDYuKJbhfLRjz3Jo7KFfuQA5%2BEK6%2B6hRzUl6G%2F0btDau0czkeLUjSCmox5ho7T6Kue3vljuu5NpAo3wNe5pEUg5kbgtQWmv6BfnUNW7hMLcH2IJ77V&X-Amz-Signature=8c3a4c3ba4a0babfdb1b87367d6c12b4b98f8db337f2e927c7b33ff4bc08f057&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQRCEN4L%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024718Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIAltuAMEq3N5mlgPBLs%2Fnh6Wp5tOYdfza7Trym1RneBVAiA7Sihsl0EbA8880Qu2WODeo8kidsJ8YXUzxtfWnLo2fir%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIM8PmvbrE9DGcsgZvWKtwD%2BPB0a1WqL%2FnXEZmKG9Lx75pOAmKXKNb6SaG2jJACu6tjzw7UvYmMhLV9dYh61ydMZEHPueckys8m1cH%2FalmXsUnffwd7U8YY6U381ZSiBdkvrP67LSyaQ6cZEzz9qKOETXNxR3KY7Gr1VzcYXepHUO70zwR3O2QlaRK12Aqf3bEsZA7NqM6cmx8SI2BIsV63SAhvR3Fi6fIETLFwo%2F5ltqqg69U2T4vf6uWj6IFjLquc6Uy9iTR1yDYjFsosmv2Btho3AogihDy8WL4ukCnfLqyjJB3f6W9V0CQgmWGbgWdl0k9iWMZ%2FwP7Z249cQCo%2FD1IXtWrF8ONVio2Sn2Z3g2S00%2Bs9q55I5K1baNUYskaacxPSmaaA3WPxKOPJcgkhO6XCrSMMPwd%2F0Oe4e8o0aE9zuUdBnfAYO0V67d4M5PENBr6f1IBIu%2B9OU264GMqitTDtijxMm4iltxclHrp%2BpPOOfM%2F8MPzC4%2B90H3cQBoodiO5lkxmwAOiqP8Mg0Y4sDZngwkReHzIjon2bHNJubDpPQAEVUDKCjyk8KMTQWrP%2Fl6Vo3XaBGzSKM8kzJOhsiYemN2pJeZ1IVp1%2FgwWAaxlh6n9d%2FBjWHsyujQlWlac0FsFhe6q0SsEDrGkww5WyygY6pgFdV3H%2FVjoAjE71N1S2yWA08aD%2FL8xa3C1QeDJLCzjp0Ckkp7020JOQayDMbI8lPbj0aDSvYRKS8d7fH29rM6wEsXK5NrgIBL5J4g3mAFyzwz8fI81lTTg%2BdOSBkvB1YEIfgrfxWrnAMY9TlPZTOYPzA0BtE1gxwcRNrKER8AjZdv5I2Tw6BFgT1uzK%2FeGyXWGAnbO5luhPJMUZEH76Y5YeDrKZivs0&X-Amz-Signature=340c3f83c7074be69c35282cc808ef8dd6863e2a669240b4e20615e64d9cefc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CH6LM4I%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024720Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCICTkO0%2FinWzS%2FhqjUBVCQuXIuJWSDI3ndMnvfJDXBpGHAiEAw%2FvMjeg8qvvT2KK2MXPWjv0Lq2jypbjD08tYX05xv9wq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDOFkkFSwhtOpe8gqeyrcAyZzkH%2B8nCUEK8i%2FGEzLPDZSj1NrB0QLCt3UB9ry7CGng041Z5jsDDCFSZSduYa6F0garh4S2YtiooXt0%2FMoYcXk6ZiCOR5jSEkUUf24gcjFn0lOMiZHoFZhoIiKdp3sqecax2q5mWGoRx6QtykgcGFebyscPZX%2FLCK1prAjemVdd%2FMBtVJKuhYEVVjPdcffd2ju4HyUP9IeSzME9ounxO2JeKF6sIyadMyiF7RhcQ8ASdkftN3jk4DyK05HUBlB1N0OP6G4FZqNXHCvpzdtmrBf5dBU3DzR9UsSgZgPNcoYEDmkeGVa0%2FYgknF6h4fgEpLetgIgpwHhHy2GWPxv2f8wda%2Fp9zzHWNw%2FGIyyt5R3v3dWed9a8teEfUJ74wzVq7vcRcSXJ9tuPt1H0RI7heh6n7J8137iJ1JfkNYE1t%2FGP5dtdeOr%2FkAR8eJt9XTPfMuJ%2Bot2Gc2%2BPvTzR%2FICNFSJONSwzakJm6%2F7PcmJqOGJLrBuD28Wds1u%2B1WXc5UFvkLDM0mSRxNAc7c72RwUw%2F1SBSZo%2BnbegjyEMolO7OAvc6AFpryzS1r9iTPgrim2nPnSc7mEfwxVyL0kmaqCvzsh6gwEiSHWB%2BVgqHqoI5cGe8HF%2FdacAnsCuobwMPiXssoGOqUBSQrAWOrh%2BOmNmxgrEYQ4Y%2F9JcXdNKTs4aSAoCIfZx5FN9p0aXkh9qKiQB2MsyM5HGVgxoTigchsztpN5hSkCmqj7cjygxnVIMLS%2BlDjSwDyrFIa96gPOB0yLCP3QOKPFoajjAfTxrGKbCpHBfNHp6b%2FG1j4s8VxRFqDjodeUPrcNRYnsEQPj2ZVpxvU84Ggxe%2FWrKOe7rmhyuthelp4LrUBTnlzI&X-Amz-Signature=f648452057a78cf0c38e6791677ee812288156c5f2ff51c24a14c4bab125a0be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CH6LM4I%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024720Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCICTkO0%2FinWzS%2FhqjUBVCQuXIuJWSDI3ndMnvfJDXBpGHAiEAw%2FvMjeg8qvvT2KK2MXPWjv0Lq2jypbjD08tYX05xv9wq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDOFkkFSwhtOpe8gqeyrcAyZzkH%2B8nCUEK8i%2FGEzLPDZSj1NrB0QLCt3UB9ry7CGng041Z5jsDDCFSZSduYa6F0garh4S2YtiooXt0%2FMoYcXk6ZiCOR5jSEkUUf24gcjFn0lOMiZHoFZhoIiKdp3sqecax2q5mWGoRx6QtykgcGFebyscPZX%2FLCK1prAjemVdd%2FMBtVJKuhYEVVjPdcffd2ju4HyUP9IeSzME9ounxO2JeKF6sIyadMyiF7RhcQ8ASdkftN3jk4DyK05HUBlB1N0OP6G4FZqNXHCvpzdtmrBf5dBU3DzR9UsSgZgPNcoYEDmkeGVa0%2FYgknF6h4fgEpLetgIgpwHhHy2GWPxv2f8wda%2Fp9zzHWNw%2FGIyyt5R3v3dWed9a8teEfUJ74wzVq7vcRcSXJ9tuPt1H0RI7heh6n7J8137iJ1JfkNYE1t%2FGP5dtdeOr%2FkAR8eJt9XTPfMuJ%2Bot2Gc2%2BPvTzR%2FICNFSJONSwzakJm6%2F7PcmJqOGJLrBuD28Wds1u%2B1WXc5UFvkLDM0mSRxNAc7c72RwUw%2F1SBSZo%2BnbegjyEMolO7OAvc6AFpryzS1r9iTPgrim2nPnSc7mEfwxVyL0kmaqCvzsh6gwEiSHWB%2BVgqHqoI5cGe8HF%2FdacAnsCuobwMPiXssoGOqUBSQrAWOrh%2BOmNmxgrEYQ4Y%2F9JcXdNKTs4aSAoCIfZx5FN9p0aXkh9qKiQB2MsyM5HGVgxoTigchsztpN5hSkCmqj7cjygxnVIMLS%2BlDjSwDyrFIa96gPOB0yLCP3QOKPFoajjAfTxrGKbCpHBfNHp6b%2FG1j4s8VxRFqDjodeUPrcNRYnsEQPj2ZVpxvU84Ggxe%2FWrKOe7rmhyuthelp4LrUBTnlzI&X-Amz-Signature=13bac969db5813c3097245b56efb5cd3ecc8806fb0ff7f4796803d38f2298f06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653KFTLO2%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQD4sLmkHEKeRmqoA4rKWuRzuqDQdNkf25EIhxtdWY%2F8vAIhAPrkjTPZhbcQ89i%2F%2B1KP%2B5NFLzkprZdDmBhtdShjcgnTKv8DCDIQABoMNjM3NDIzMTgzODA1IgyOzoIuJcjAvthAWD8q3AOyIrYWSBR8YH%2BCAMyLzsD7NS0i6sU2Y43Zsr1q7G2WxzD%2BtNMUzOFt7knD9DNXKVOzEtx1nPVLxbODPj5oKiDq4%2F7Uq3v4b6smFKq3IAp3uJjxakPtmNwOrctX9YpQ5bydrWAAPLM91aqXGwpJvqLpevUwy29MjdnDAMOID7sycMWCadtzSfzzRgy30VYDHAO5JaSURTFG6okIkX1AdbyzNzpoVILHXCAUparwAvOXeiByrP8%2BjFPj18WCok4zYe3Fsuzw3LB1c7Cu7ZBDNeYqNTW875xao%2Bj6LHI%2FHw9bgL%2FSiAMZtJxjovXxVJnblBhTPHZUMIjFMEPDhi%2BlGLYg3O5SHGh%2Fmdn0rikRNwkNzn10WJCwnRdOMBGtDlVS8bhpCW4CuPpWt73YE6NlWs3Ndw0n7vD4Kl7AOWbT%2FthsDE0Svt4dzT7NALEUcdgUcgWkzBl16g4FSz0ZOZxvWNKZscUr%2FdDOyloSrZlWgr%2BLyU7FeR2PYBr46nKjZKapYmfpIKMGvlVs%2FOgOZdMDIFEKpzuNswvCNxfFQXbEj%2Btm4M2YFYnnYD%2BbpG%2F88orZWVkCHjIoiaylh5njQ74SbCiiJfCJXQ4%2F841HysoJkJRB5RMN6SB1qWb1Z3aUczCVmrLKBjqkAS2BL1mjhiGJ%2FEbdIJYkWE7jOfs7o3HdWrX3jOb%2BprZiJDjAGh%2FZky4g0vARSDiZ13jUhnAokd0qUSzoogkVPZ2aNIRMPAxZdnEfH%2FhFiVt%2B2fjUXvigJfKB6O3U8JB3TV0KxWIiuA5iDkkoSXmeBarsuZPUFQ37Sxaflay6he9VCg3ofPxoqay48EMoc8qi%2FdFKflByS4aBn1u55uw2ak8iBUl6&X-Amz-Signature=b72a2938af6243a439f43f84c6deee0280eef2ecf560ed96da320d66fbe4aef7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCYNQAO7%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIE50oJIrY1%2FO1FJnplzkpbl7P00BQHrGpb9L5MpblJkVAiB4yhxhzs4RLpaNDNMLCsrwAG2NIDfwgvnXH9xcu8yPiSr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMAT4iYwQpiN9xYv3LKtwDI6hlkTilCVbjaMpHDfcMRAbqAa%2BryW9jl5WQuQu3zGHdqj6SuknT3q4AKb53yiNH9y0tjRVghbypwrB3OtIT93NYooLzAudfKefKrUF2wcKf59eQ9SqKxK9BXnWqWDkqNxE3kUExxbnYvrHH2xgeu7r0Ii2rJYKIDoKsDE%2Fu5K0SGOM6YQDsqt37fxPAJsS40gLGD9ZlpNBXqtLN7g7IZFDP%2FV65UaK5RMSlEo8ahOubRxox3pwnjta9qd%2FwXckv1OSexCGZqQh2EQQWtjCZS2t0cx3G9rCIbKg4w%2F3EiBvvshiyEomy5iz%2BC0sxyO%2BVc8RmPytLhvMgvBK7j7TvlRTp9TpQzqCSgwvLvyv%2B59DM1fjUFUeMZK0EC3awu4BIolMdILkfYRlx5eQsZSEh8rhFBFXQxSKC9V8HRcuIYLA7tRYTAEQZ3%2FKtEFmfOFuHiqLQSw5z06UXMcstikdelzzucXOejGtAjDyrqv%2FFggMdBypNQN5vtfBJ%2FHEry%2FtiUwnar19vLvvoS6BD7uLKTfiRjfhzEr5pwFNcGHWX1R21JeCqYi0fC4anOgw4HhdKCcX920ekLu7xmrHiAxUmvxORl4y9zH8zfsCS21tUCsI8MPLhyYAS0EvIN4UwpYqyygY6pgGeZYKOertIBDzlRRyjBk1Cj8PA0BPgTzDo2oA6E4mEfRnEQfDy3NYzdtGo5WTFNh9uvdagZX8oEP1gqrg%2BVlA92N2rT4k0wj%2B%2BJQ00kO%2FqBWeb9Q2NB0LNrMHmFtPR6Nj%2F7qNWSSejV6gJ4Bz8BGDc3rbXQl%2BCpjD%2FcQ%2FzHlKSAI1pjlX6oa1sSUk%2FTu2e3jdbmqOzOkghpVhN%2F%2BcM7ld79vCoaolR&X-Amz-Signature=148fbaa60984b316d569e21553d94e4eb2d5a1b355bd22eccea2af5b6ea5f4a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCYNQAO7%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIE50oJIrY1%2FO1FJnplzkpbl7P00BQHrGpb9L5MpblJkVAiB4yhxhzs4RLpaNDNMLCsrwAG2NIDfwgvnXH9xcu8yPiSr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMAT4iYwQpiN9xYv3LKtwDI6hlkTilCVbjaMpHDfcMRAbqAa%2BryW9jl5WQuQu3zGHdqj6SuknT3q4AKb53yiNH9y0tjRVghbypwrB3OtIT93NYooLzAudfKefKrUF2wcKf59eQ9SqKxK9BXnWqWDkqNxE3kUExxbnYvrHH2xgeu7r0Ii2rJYKIDoKsDE%2Fu5K0SGOM6YQDsqt37fxPAJsS40gLGD9ZlpNBXqtLN7g7IZFDP%2FV65UaK5RMSlEo8ahOubRxox3pwnjta9qd%2FwXckv1OSexCGZqQh2EQQWtjCZS2t0cx3G9rCIbKg4w%2F3EiBvvshiyEomy5iz%2BC0sxyO%2BVc8RmPytLhvMgvBK7j7TvlRTp9TpQzqCSgwvLvyv%2B59DM1fjUFUeMZK0EC3awu4BIolMdILkfYRlx5eQsZSEh8rhFBFXQxSKC9V8HRcuIYLA7tRYTAEQZ3%2FKtEFmfOFuHiqLQSw5z06UXMcstikdelzzucXOejGtAjDyrqv%2FFggMdBypNQN5vtfBJ%2FHEry%2FtiUwnar19vLvvoS6BD7uLKTfiRjfhzEr5pwFNcGHWX1R21JeCqYi0fC4anOgw4HhdKCcX920ekLu7xmrHiAxUmvxORl4y9zH8zfsCS21tUCsI8MPLhyYAS0EvIN4UwpYqyygY6pgGeZYKOertIBDzlRRyjBk1Cj8PA0BPgTzDo2oA6E4mEfRnEQfDy3NYzdtGo5WTFNh9uvdagZX8oEP1gqrg%2BVlA92N2rT4k0wj%2B%2BJQ00kO%2FqBWeb9Q2NB0LNrMHmFtPR6Nj%2F7qNWSSejV6gJ4Bz8BGDc3rbXQl%2BCpjD%2FcQ%2FzHlKSAI1pjlX6oa1sSUk%2FTu2e3jdbmqOzOkghpVhN%2F%2BcM7ld79vCoaolR&X-Amz-Signature=148fbaa60984b316d569e21553d94e4eb2d5a1b355bd22eccea2af5b6ea5f4a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJUSRMSR%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T024723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCICY0sfsdADVB1EDJUPuBX2IuLn2SQ71wK7YNE3%2BK2kepAiBR2A00Eff0kyDcs%2FEBanGMA4EEoiLO1ENBPoxFdjCOOir%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMkt%2FvD8YO%2Fr5pWIOqKtwDPQOcPMzkmt5KdsCPkZaOPEVioZIksNREYe8Pr0%2BR2M%2FIvGW4O6k7%2B8Q8xVpD8Lh6XgEWWJdRQuEcgPvhWAyD9bcYNdOa6rJRnAx3QIyJR%2FGVzDDiiImGKSmsJ%2FKzhWP2r4%2BTz6dLskKjyBrRzu0YdnLv4lJpGKqAfu768MNlH1n44geCWmj0wMeVrrUCfmknrl%2Fwyf%2FpKtOft%2Fzx5X5G9JBND6VzU0%2Bm6OLcau6FrsHAWBaFYMSg2LagDqo5%2BUKV4WLgSYl8Xp%2Bz6RlVFz6PlyfP3I39emWGuRS2lEsb%2FjmMyXNAQZu8rkHVYQsqnL1aL6kcD9o%2BrhLNRBz1MBLjOQdmNVM56V2HPrJQh3q7NPTWlSMeCDHJKDsjl9ck7ZTGHBnkUKbqDie4XvnhcAFrCq3MM%2Br5RJ4b8tSc45hncxgVXS9wFgfzQ4k8P5Ljoq%2FsiuTncuChoD%2BbVZclF7OMkJNMUD9M5ep6WYGTYzMHipKwXjbChBx1v7ZG8IlqvN%2Feq4CkzGRIsd1ZabMDCdemS5k%2FtOi5RhYWjbXqgh1cVMyRSKGf1tQtVhu2p3YvTXXNQtddQvGS%2Bovms5mqFSd4r0Rjgvd%2FQkibXZpw%2Bw1HQ36Lv90UjDR33U4qkaYw%2FIyyygY6pgGUGprDr1afA7Vh4qeLyzKj17NP3gTcZWauXAzIuZ0aevxi4q%2FpElAMVeVAr7FQG7xl3lW7lMGIFCiiQUMpd6ZRHMfF1D95g%2FZFqtPjQx4AIVWru3%2FpP7wJJidxafQcxiFBUSnZ2GYLTDjuR%2Bnyh2C%2BYciNg%2BE9YZY76ofcu25ubpG%2FIGHu5gAEkkZXuQDWaSHFm6Y0eme2BLsdsRE7fAsqAJeZ9Os0&X-Amz-Signature=5de16dba078add59894255a1ba0eddf26d5a08e8a9f58fc6c0383db0d98c9b98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

