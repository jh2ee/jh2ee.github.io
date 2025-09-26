---
layout: post
date: 2025-08-05
title: "[논문 리뷰] Caduceus: Bi-Directional Equivariant Long-Range DNA Sequence Modeling"
tags: [Genomics, Mamba]
categories: [Paper Review]
---

<span class="notion-red">_**필자의 의견은 붉은색으로 표시됩니다**_</span>


> [Schiff, Yair, et al. "Caduceus: Bi-directional equivariant long-range dna sequence modeling." ](https://pmc.ncbi.nlm.nih.gov/articles/PMC12189541/)[_Proceedings of machine learning research_](https://pmc.ncbi.nlm.nih.gov/articles/PMC12189541/)[ 235 (2024): 43632.](https://pmc.ncbi.nlm.nih.gov/articles/PMC12189541/)



## Introduction


**Challenges**


저자들은 DNA modeling의 과제를 아래와 같이 꼽았다.

- long-range token interaction
- effects of upstream and downstream regions of the genome 
_→ sequence model이 양방향 context를 처리해야 함을 의미_
- reverse complementarity(RC)

**Contribution**

1. bi-direcrional sequence modeling 지원하는 BiMamba 제안
1. RC equivariance 지원하도록 BiMamba 확장 → MambaDNA
1. RC-equivariant DNA foundation model family 기여
1. 10x 크기의 model보다 높은 성능

> 💡 


	## **Background**


	### DNA

	- DNA는 A, T, G, C 네 가지의 nucleotide bases로 구성
	- nucleotide base 사이의 결합은 twisted ladder의 rungs(가로대) 생성
	- A는 T와 결합, C는 G와 결합

	### Reverse Complement(RC) Strands

	- 이중 나선 구조의 DNA에서 각 strand는 의미상 동등한 정보를 포함
	- RC는 forward strand에 의해 A→T, C→G 로 변환


## Methods



### BiMamba


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/2c247d59-7815-4980-99f0-8f0d21f445a7/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5P7NWKZ%2F20250926%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250926T050119Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHggGGtG1uqhJzY5bzXR2wH5%2B%2BbNDCvBUm%2B%2B%2BK9z1nk7AiAEDt8RItUIYmpgp9Iavl6AfgCsQtL7E%2F7J4gGYSzgICSqIBAiG%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfPgZRQvEnaZPPttgKtwDJFhZ4XOVAYA9IxPS884yyKpNP1%2BAHz2JAvd0RgdP64PKynmTv8oQ3o9%2BpACDRSSnnFwHVnJuNIO7V6dm6JFEzCfHC32%2Bon62vLy1zgxFEZMAsExC2EE4VksXIVS9OmVIg2AXV6O%2B4GfjZEvWYgwzAhxvLz0IxZfy7xnzZtJslSBiFADC26Y0mvEHZ4VuZ9ZSIpHDa%2FRueFUd6wts3AL2Qp7FG4DxX2%2Bq3%2B2%2BnpJDGq2KSMGcdTBjw5D3qpsHt62DhJtuIYmd68bhOYAghBMVr2nwSbJWelZv3HPQdANDnrA5Z0A8jFKpDXUhu%2FXPAPyzJ6OYc%2FfC7nbEVPM6wsLsLvPL4CidjyEX58w5BlQhgAfz6CrsalFxZswaxUZMN%2Fq2E5zo1433LK%2BhRWg77eMEZchBaJySLBKpHYgnG4PsUUYePljX0WQBtxzIiZUyLxe9VmoLUBLIw9uqbVdIbLMKsbOCL3I%2BaIx6DqD4oVnWO%2FS%2BcbY3mDQ4gwiuLvLK9y6tHD6b596B7YG%2BvSMYSy4K1UaFGsT%2B4MoiXhvptGlKKTk9a9SkIfCjXXkw9d9hp%2B2bbHFqhx6uCY%2FmX0L8%2BkZ7dRXvinElk6sT%2BhkoF6%2FAu4WUQU7aLQsDRK7Im80wrrrYxgY6pgEPmIxyOV%2FnX030E910ufZkRTb%2BJB3kYsPOYSCfDyn%2BoAckWV1V%2BdRiI8ieUfv0wscYW6kK13jw33ZgbPhZpAFc0kUS7jhYZo2kG4cNZ5eCe8ZNGDiQ4oV3InANh05V1iVRGbsVRUTZoqU5dy758xFU7BPHikBlYv7ggEi9Qnd9%2B0BRVIZoeyub%2Bl%2Be3sqz%2FSZpHyiDl9zxVaLegtLjza%2FgRMZWXB5o&X-Amz-Signature=cd47d34c9280b8894939b9db981265b8dfae82993e1e918841f6976b8135a8b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. 표준 Mamba model을 bi-directional로 변환하기 위해 Mamba module을 두 번 적용한다

	_→ original sequence와 reverse sequence에 각각 한 번씩 적용_

1. 정보 결합을 위해 reverse sequence의 output은 length dimension 기준으로 flip되어 forward sequence에 추가한다

parameter 효율성을 위해 forward와 reverse mamba 간 projection weight를 공유한다 (BiMamba 블록에서 사다리꼴 부분의 weight)



### MambaDNA

- RC equivariance inductive bias를 encoding 하기 위해 BiMamba block을 sequence와 RC sequence에 각각 적용
- 두 block의 paramter는 공유됨


#### 수식적 설명

- sequence length : _T_
- channels : _D_

라고 할 때,  channel splitting operation은 다음과 같다.


$$
split(X^{1:D}_{1:T}):=[X^{1:(D/2)}_{1:T},X^{(D/2):D}_{1:T}]
$$


<span class="notion-red">쉽게 말해 </span><span class="notion-red">_**D**_</span><span class="notion-red"> channel을 가진 길이가 </span><span class="notion-red">_**T**_</span><span class="notion-red">인 </span><span class="notion-red">_**X**_</span><span class="notion-red">를 channel 기준으로 “</span><span class="notion-red">**이등분”**</span><span class="notion-red">한다고 보면 된다.</span>


RC 연산은 다음과 같이 정의된다.


$$
RC(X^{1:D}_{1:T}):=X^{D:1}_{T:1}
$$


마지막으로 concat이 channel dimension 기준으로의 sequence 결합 _M_은 다음과 같다.


$$
M_{RCe,\theta}(X_{1:D_{1:T}}):=concat([M_{\theta}(X^{1:(D/2)}_{1:T}),RC(M_{\theta}(X^{(D/2):D}_{1:T}))])
$$


위 수식이 최종적으로 MambaDNA module의 연산 과정을 나타내며 아래와 같은 관계를 가진다


$$
RC\circ M_{RCe,\theta}(X^{1:D}_{1:T}) = M_{RCe,\theta} \circ RC(X^{1:D}_{1:T})
$$


**이는 MambaDNA block과 RC 변환의 순서와 관계없이 동일한 결과 즉, RC equivariant함을 의미한다**



### Caduceus


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/f94a60d7-8145-473b-aef9-7c68d3ec604a/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5P7NWKZ%2F20250926%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250926T050120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHggGGtG1uqhJzY5bzXR2wH5%2B%2BbNDCvBUm%2B%2B%2BK9z1nk7AiAEDt8RItUIYmpgp9Iavl6AfgCsQtL7E%2F7J4gGYSzgICSqIBAiG%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfPgZRQvEnaZPPttgKtwDJFhZ4XOVAYA9IxPS884yyKpNP1%2BAHz2JAvd0RgdP64PKynmTv8oQ3o9%2BpACDRSSnnFwHVnJuNIO7V6dm6JFEzCfHC32%2Bon62vLy1zgxFEZMAsExC2EE4VksXIVS9OmVIg2AXV6O%2B4GfjZEvWYgwzAhxvLz0IxZfy7xnzZtJslSBiFADC26Y0mvEHZ4VuZ9ZSIpHDa%2FRueFUd6wts3AL2Qp7FG4DxX2%2Bq3%2B2%2BnpJDGq2KSMGcdTBjw5D3qpsHt62DhJtuIYmd68bhOYAghBMVr2nwSbJWelZv3HPQdANDnrA5Z0A8jFKpDXUhu%2FXPAPyzJ6OYc%2FfC7nbEVPM6wsLsLvPL4CidjyEX58w5BlQhgAfz6CrsalFxZswaxUZMN%2Fq2E5zo1433LK%2BhRWg77eMEZchBaJySLBKpHYgnG4PsUUYePljX0WQBtxzIiZUyLxe9VmoLUBLIw9uqbVdIbLMKsbOCL3I%2BaIx6DqD4oVnWO%2FS%2BcbY3mDQ4gwiuLvLK9y6tHD6b596B7YG%2BvSMYSy4K1UaFGsT%2B4MoiXhvptGlKKTk9a9SkIfCjXXkw9d9hp%2B2bbHFqhx6uCY%2FmX0L8%2BkZ7dRXvinElk6sT%2BhkoF6%2FAu4WUQU7aLQsDRK7Im80wrrrYxgY6pgEPmIxyOV%2FnX030E910ufZkRTb%2BJB3kYsPOYSCfDyn%2BoAckWV1V%2BdRiI8ieUfv0wscYW6kK13jw33ZgbPhZpAFc0kUS7jhYZo2kG4cNZ5eCe8ZNGDiQ4oV3InANh05V1iVRGbsVRUTZoqU5dy758xFU7BPHikBlYv7ggEi9Qnd9%2B0BRVIZoeyub%2Bl%2Be3sqz%2FSZpHyiDl9zxVaLegtLjza%2FgRMZWXB5o&X-Amz-Signature=5b06eb6d4a78a96686bff096132b93a1f8f9e7c7f1e16e653ea5e3268d94049d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


저자들은 논문에서 두 가지 버전의 Caduceus model을 제시한다. 위 그림에서 검정색 flow가 **Caduceus-PS, **하늘색 flow가 **Caduceus-Ph model** 이다.



#### Caduceus-PS


해당 모델은 BiMamba module의 paramter sharing(PS)을 통해 구현된다

1. _**BiMamba module을 MambaDNA block으로 wrapping**_
1. embedding 단계에서_** RC equivariant token embedding module**_을 사용하며 다음과 같이 표현된다.

$$
Emb_{RCe,\theta}(X^{1:4}_{1:T}):=concat([Emb_{\theta}(X^{1:4}_{1:T}),RC \circ Emb_{\theta}(RC(X^{1:4}_{1:T}))])
$$


_figure에서 Token embedding block 두 개를 wrapping 하고 있는 큰 module이 RC equivariant token embedding module이다_


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b175e4da-71eb-4e91-8c23-a06dabe673c9/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5P7NWKZ%2F20250926%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250926T050121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHggGGtG1uqhJzY5bzXR2wH5%2B%2BbNDCvBUm%2B%2B%2BK9z1nk7AiAEDt8RItUIYmpgp9Iavl6AfgCsQtL7E%2F7J4gGYSzgICSqIBAiG%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfPgZRQvEnaZPPttgKtwDJFhZ4XOVAYA9IxPS884yyKpNP1%2BAHz2JAvd0RgdP64PKynmTv8oQ3o9%2BpACDRSSnnFwHVnJuNIO7V6dm6JFEzCfHC32%2Bon62vLy1zgxFEZMAsExC2EE4VksXIVS9OmVIg2AXV6O%2B4GfjZEvWYgwzAhxvLz0IxZfy7xnzZtJslSBiFADC26Y0mvEHZ4VuZ9ZSIpHDa%2FRueFUd6wts3AL2Qp7FG4DxX2%2Bq3%2B2%2BnpJDGq2KSMGcdTBjw5D3qpsHt62DhJtuIYmd68bhOYAghBMVr2nwSbJWelZv3HPQdANDnrA5Z0A8jFKpDXUhu%2FXPAPyzJ6OYc%2FfC7nbEVPM6wsLsLvPL4CidjyEX58w5BlQhgAfz6CrsalFxZswaxUZMN%2Fq2E5zo1433LK%2BhRWg77eMEZchBaJySLBKpHYgnG4PsUUYePljX0WQBtxzIiZUyLxe9VmoLUBLIw9uqbVdIbLMKsbOCL3I%2BaIx6DqD4oVnWO%2FS%2BcbY3mDQ4gwiuLvLK9y6tHD6b596B7YG%2BvSMYSy4K1UaFGsT%2B4MoiXhvptGlKKTk9a9SkIfCjXXkw9d9hp%2B2bbHFqhx6uCY%2FmX0L8%2BkZ7dRXvinElk6sT%2BhkoF6%2FAu4WUQU7aLQsDRK7Im80wrrrYxgY6pgEPmIxyOV%2FnX030E910ufZkRTb%2BJB3kYsPOYSCfDyn%2BoAckWV1V%2BdRiI8ieUfv0wscYW6kK13jw33ZgbPhZpAFc0kUS7jhYZo2kG4cNZ5eCe8ZNGDiQ4oV3InANh05V1iVRGbsVRUTZoqU5dy758xFU7BPHikBlYv7ggEi9Qnd9%2B0BRVIZoeyub%2Bl%2Be3sqz%2FSZpHyiDl9zxVaLegtLjza%2FgRMZWXB5o&X-Amz-Signature=6f9935bad98d953ac7a7d0a45175b5ba785be29f30426abdc25aabbb028293c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


<span class="notion-red">수식보다는 그림을 보고 이해하는 것이 직관적인 것 같다…</span>

1. MambaDNA 출력이 _**RC equivariant language model head**_에 전달되어 최종 output 생성하며 다음과 같이 표현된다.

$$
LM_{RCe,\theta}(X^{1:D}_{1:T}):= LM_{\theta}(X^{1:(D/2)}_{1:T})+flip\_chan\circ LM_{\theta}(X^{D:(D/2)}_{1:T})
$$

- 채널 flip 연산인 _**flip\_chan**_은 다음과 같이 정의한다.

	$$
	flip\_chan(X^{1:D}_{1:T}):=(X^{D:1}_{1:T})
	$$


	말 그대로 channel dimension만 뒤집어주는 연산이다



#### Caduceus-Ph


해당 모델은_** Post-hoc conjoining(Ph)**_ 방법론을 이용해 BiMamba block stack을 통해 구현된다

1. MambaDNA block을 사용하지 않고 BiMamba module을 backbone으로 학습
1. inference 단계에서 input sequence와 input의 RC sequence를 각각 model에 입력
1. 두 output을 평균해 최종 output 산출

2, 3번에 해당하는 부분이 _**Post-hoc conjoining**_ 이다.


<span class="notion-red">논문에 설명이 구체적으로 되어있지는 않다..</span>



### Train

- 두 모델 모두 pretrain 단계에서 MLM을 이용해 학습
- Caduceus-Ph의 경우 RC sequence 학습을 위한 augmentation 필요

---


<span class="notion-red">Caduceus model은 SSM의 선구자라고 할 수 있는 Tri Dao, Albert Gu 교수님이 참여한 논문이다. 최근 동향을 보니 Mamba-2를 이용해 다양한 sequence 데이터 분야에 도전하는 것으로 보인다.</span>


<span class="notion-red">해당 논문은 ICML 2025에 제출되었으나 reject된 것으로 기억하는데 genomics 분야로 accept이 되려면 domain적인 results가 중요시 되는 것 같은 느낌이다. 게시물에는 실험 결과를 생략하였으나 진행한 실험들을 보면 benchmark dataset에 국한되어 단순히 model의 accuracy 측면에서만 보여준 것 같은 경향이 있다.</span>


<span class="notion-red">그러나 model의 성능 향상과 parameter 효율성이라는 측면에 있어서는 좋은 결과를 보였기에 mamba가 long range understanding 작업에서 유용함을 증명하는 또 하나의 사례가 될 것 같다.</span>

